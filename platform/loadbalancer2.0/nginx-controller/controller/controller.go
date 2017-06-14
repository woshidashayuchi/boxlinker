/*
Copyright 2015 The Kubernetes Authors All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package controller

import (
	"errors"
	"fmt"
	"reflect"
	"strings"
	"time"

	"github.com/golang/glog"

	"os"

	"github.com/cabernety/boxlinker-loadbalancer/nginx-controller/nginx"
	"k8s.io/kubernetes/pkg/api"
	podutil "k8s.io/kubernetes/pkg/api/pod"
	"k8s.io/kubernetes/pkg/apis/extensions"
	"k8s.io/kubernetes/pkg/client/cache"
	client "k8s.io/kubernetes/pkg/client/unversioned"
	"k8s.io/kubernetes/pkg/controller/framework"
	"k8s.io/kubernetes/pkg/labels"
	"k8s.io/kubernetes/pkg/runtime"
	"k8s.io/kubernetes/pkg/util/intstr"
	"k8s.io/kubernetes/pkg/watch"
)

const (
	ingressClassKey      = "kubernetes.io/ingress.class"
	loadbanlanceClassKey = "loadbalancer/lb.name"
	nginxIngressClass    = "nginx"
)

// LoadBalancerController watches Kubernetes API and
// reconfigures NGINX via NginxController when needed
type LoadBalancerController struct {
	client               *client.Client
	ingController        *framework.Controller
	svcController        *framework.Controller
	endpController       *framework.Controller
	cfgmController       *framework.Controller
	ingLister            StoreToIngressLister
	svcLister            cache.StoreToServiceLister
	endpLister           cache.StoreToEndpointsLister
	cfgmLister           StoreToConfigMapLister
	ingQueue             *taskQueue
	endpQueue            *taskQueue
	cfgmQueue            *taskQueue
	stopCh               chan struct{}
	cnf                  *nginx.Configurator
	watchNginxConfigMaps bool
}

var keyFunc = framework.DeletionHandlingMetaNamespaceKeyFunc
var IngressForWho string

// NewLoadBalancerController creates a controller
func NewLoadBalancerController(kubeClient *client.Client, resyncPeriod time.Duration, namespace string, cnf *nginx.Configurator, nginxConfigMaps string) (*LoadBalancerController, error) {
	IngressForWho = os.Getenv("owner")
	lbc := LoadBalancerController{
		client: kubeClient,
		stopCh: make(chan struct{}),
		cnf:    cnf,
	}

	lbc.ingQueue = NewTaskQueue(lbc.syncIng)
	lbc.endpQueue = NewTaskQueue(lbc.syncEndp)

	ingHandlers := framework.ResourceEventHandlerFuncs{
		AddFunc: func(obj interface{}) {
			addIng := obj.(*extensions.Ingress)
			if !isNginxIngress(addIng) {
				glog.Infof("Ignoring Ingress %v based on Annotation %v", addIng.Name, ingressClassKey)
				return
			}
			glog.Infof("Adding Ingress: %v", addIng.Name)
			lbc.ingQueue.enqueue(obj)
		},
		DeleteFunc: func(obj interface{}) {
			remIng, isIng := obj.(*extensions.Ingress)
			if !isIng {
				deletedState, ok := obj.(cache.DeletedFinalStateUnknown)
				if !ok {
					glog.Infof("Error received unexpected object: %v", obj)
					return
				}
				remIng, ok = deletedState.Obj.(*extensions.Ingress)
				if !ok {
					glog.Infof("Error DeletedFinalStateUnknown contained non-Ingress object: %v", deletedState.Obj)
					return
				}
			}
			if !isNginxIngress(remIng) {
				return
			}
			glog.Infof("Removing Ingress: %v", remIng.Name)
			lbc.ingQueue.enqueue(obj)
		},
		UpdateFunc: func(old, cur interface{}) {
			curIng := cur.(*extensions.Ingress)
			if !isNginxIngress(curIng) {
				return
			}
			if !reflect.DeepEqual(old, cur) {
				glog.Infof("Ingress %v changed, syncing", curIng.Name)
				lbc.ingQueue.enqueue(cur)
			}
		},
	}
	lbc.ingLister.Store, lbc.ingController = framework.NewInformer(
		&cache.ListWatch{
			ListFunc:  ingressListFunc(kubeClient, namespace),
			WatchFunc: ingressWatchFunc(kubeClient, namespace),
		},
		&extensions.Ingress{}, resyncPeriod, ingHandlers)

	svcHandlers := framework.ResourceEventHandlerFuncs{
		AddFunc: func(obj interface{}) {
			addSvc := obj.(*api.Service)
			glog.V(3).Infof("Adding service: %v", addSvc.Name)
			lbc.enqueueIngressForService(addSvc)
		},
		DeleteFunc: func(obj interface{}) {
			remSvc, isSvc := obj.(*api.Service)
			if !isSvc {
				deletedState, ok := obj.(cache.DeletedFinalStateUnknown)
				if !ok {
					glog.Infof("Error received unexpected object: %v", obj)
					return
				}
				remSvc, ok = deletedState.Obj.(*api.Service)
				if !ok {
					glog.Infof("Error DeletedFinalStateUnknown contained non-Service object: %v", deletedState.Obj)
					return
				}
			}
			glog.Infof("Removing service: %v", remSvc.Name)
			lbc.enqueueIngressForService(remSvc)
		},
		UpdateFunc: func(old, cur interface{}) {
			if !reflect.DeepEqual(old, cur) {
				glog.Infof("Service %v changed, syncing",
					cur.(*api.Service).Name)
				lbc.enqueueIngressForService(cur.(*api.Service))
			}
		},
	}
	lbc.svcLister.Store, lbc.svcController = framework.NewInformer(
		&cache.ListWatch{
			ListFunc:  serviceListFunc(kubeClient, namespace),
			WatchFunc: serviceWatchFunc(kubeClient, namespace),
		},
		&api.Service{}, resyncPeriod, svcHandlers)

	endpHandlers := framework.ResourceEventHandlerFuncs{
		AddFunc: func(obj interface{}) {
			addEndp := obj.(*api.Endpoints)
			glog.V(3).Infof("Adding endpoints: %v", addEndp.Name)
			lbc.endpQueue.enqueue(obj)
		},
		DeleteFunc: func(obj interface{}) {
			remEndp, isEndp := obj.(*api.Endpoints)
			if !isEndp {
				deletedState, ok := obj.(cache.DeletedFinalStateUnknown)
				if !ok {
					glog.Infof("Error received unexpected object: %v", obj)
					return
				}
				remEndp, ok = deletedState.Obj.(*api.Endpoints)
				if !ok {
					glog.Infof("Error DeletedFinalStateUnknown contained non-Endpoints object: %v", deletedState.Obj)
					return
				}
			}
			glog.Infof("Removing endpoints: %v", remEndp.Name)
			lbc.endpQueue.enqueue(obj)
		},
		UpdateFunc: func(old, cur interface{}) {
			if !reflect.DeepEqual(old, cur) {
				//glog.Infof("Endpoints %v changed, syncing",
				//cur.(*api.Endpoints).Name)
				lbc.endpQueue.enqueue(cur)
			}
		},
	}
	lbc.endpLister.Store, lbc.endpController = framework.NewInformer(
		&cache.ListWatch{
			ListFunc:  endpointsListFunc(kubeClient, namespace),
			WatchFunc: endpointsWatchFunc(kubeClient, namespace),
		},
		&api.Endpoints{}, resyncPeriod, endpHandlers)

	lbc.watchNginxConfigMaps = true
	lbc.cfgmQueue = NewTaskQueue(lbc.syncCfgm)

	cfgmHandlers := framework.ResourceEventHandlerFuncs{
		AddFunc: func(obj interface{}) {
			cfgm := obj.(*api.ConfigMap)
			if !isNginxConfigMap(cfgm) {
				glog.Infof("Ignoring Configmap %v based on Annotation %v", cfgm.Name, loadbanlanceClassKey)
				return
			}
			glog.Infof("Adding ConfigMap: %v", cfgm.Name)
			lbc.cfgmQueue.enqueue(obj)
		},
		DeleteFunc: func(obj interface{}) {
			cfgm, isCfgm := obj.(*api.ConfigMap)
			if !isCfgm {
				deletedState, ok := obj.(cache.DeletedFinalStateUnknown)
				if !ok {
					glog.Infof("Error received unexpected object: %v", obj)
					return
				}
				cfgm, ok = deletedState.Obj.(*api.ConfigMap)
				if !ok {
					glog.Infof("Error DeletedFinalStateUnknown contained non-CogfigMap object: %v", deletedState.Obj)
					return
				}
			}
			if !isNginxConfigMap(cfgm) {
				return
			}
			lbc.cfgmQueue.enqueue(obj)
			glog.Infoln("Removing configmap ", cfgm.Name)
		},
		UpdateFunc: func(old, cur interface{}) {
			if !reflect.DeepEqual(old, cur) {
				cfgm := cur.(*api.ConfigMap)
				if !isNginxConfigMap(cfgm) {
					return
				}
				glog.Infof("ConfigMap %v changed, syncing", cfgm.Name)
				lbc.cfgmQueue.enqueue(cur)
			}
		},
	}
	lbc.cfgmLister.Store, lbc.cfgmController = framework.NewInformer(
		&cache.ListWatch{
			ListFunc:  configMapsListFunc(kubeClient, namespace),
			WatchFunc: configMapsWatchFunc(kubeClient, namespace),
		},
		&api.ConfigMap{}, resyncPeriod, cfgmHandlers)

	return &lbc, nil
}

// Run starts the loadbalancer controller
func (lbc *LoadBalancerController) Run() {
	go lbc.ingController.Run(lbc.stopCh)
	go lbc.svcController.Run(lbc.stopCh)
	go lbc.endpController.Run(lbc.stopCh)
	go lbc.ingQueue.run(time.Second, lbc.stopCh)
	go lbc.endpQueue.run(time.Second, lbc.stopCh)
	if lbc.watchNginxConfigMaps {
		go lbc.cfgmController.Run(lbc.stopCh)
		go lbc.cfgmQueue.run(time.Second, lbc.stopCh)
	}

	<-lbc.stopCh
}

func ingressListFunc(c *client.Client, ns string) func(api.ListOptions) (runtime.Object, error) {
	return func(opts api.ListOptions) (runtime.Object, error) {
		return c.Extensions().Ingress(ns).List(opts)
	}
}

func ingressWatchFunc(c *client.Client, ns string) func(options api.ListOptions) (watch.Interface, error) {
	return func(options api.ListOptions) (watch.Interface, error) {
		return c.Extensions().Ingress(ns).Watch(options)
	}
}

func serviceListFunc(c *client.Client, ns string) func(api.ListOptions) (runtime.Object, error) {
	return func(opts api.ListOptions) (runtime.Object, error) {
		return c.Services(ns).List(opts)
	}
}

func serviceWatchFunc(c *client.Client, ns string) func(options api.ListOptions) (watch.Interface, error) {
	return func(options api.ListOptions) (watch.Interface, error) {
		return c.Services(ns).Watch(options)
	}
}

func endpointsListFunc(c *client.Client, ns string) func(api.ListOptions) (runtime.Object, error) {
	return func(opts api.ListOptions) (runtime.Object, error) {
		return c.Endpoints(ns).List(opts)
	}
}

func endpointsWatchFunc(c *client.Client, ns string) func(options api.ListOptions) (watch.Interface, error) {
	return func(options api.ListOptions) (watch.Interface, error) {
		return c.Endpoints(ns).Watch(options)
	}
}

func configMapsListFunc(c *client.Client, ns string) func(api.ListOptions) (runtime.Object, error) {
	return func(opts api.ListOptions) (runtime.Object, error) {
		return c.ConfigMaps(ns).List(opts)
	}
}

func configMapsWatchFunc(c *client.Client, ns string) func(options api.ListOptions) (watch.Interface, error) {
	return func(options api.ListOptions) (watch.Interface, error) {
		return c.ConfigMaps(ns).Watch(options)
	}
}

func (lbc *LoadBalancerController) syncEndp(key string) {
	//glog.Infof("Syncing endpoints %v", key)

	obj, endpExists, err := lbc.endpLister.Store.GetByKey(key)
	if err != nil {
		lbc.endpQueue.requeue(key, err)
		return
	}

	if endpExists {
		ings := lbc.getIngressForEndpoints(obj)
		for _, ing := range ings {
			if !isNginxIngress(&ing) {
				continue
			}
			ingEx, err := lbc.createIngress(&ing)
			if err != nil {
				glog.Warningf("Error updating endpoints for %v/%v: %v, skipping", ing.Namespace, ing.Name, err)
				continue
			}
			glog.Infof("Updating Endpoints for %v/%v", ing.Name, ing.Namespace)
			name := ing.Namespace + "-" + ing.Name
			lbc.cnf.UpdateEndpoints(name, ingEx)
		}
	}

}

func (lbc *LoadBalancerController) syncCfgm(key string) {

	obj, cfgmExists, err := lbc.cfgmLister.Store.GetByKey(key)
	if err != nil {
		lbc.cfgmQueue.requeue(key, err)
		return
	}

	// defaut/some-ingress -> default-some-ingress
	name := strings.Replace(key, "/", "-", -1)
	if !cfgmExists {
		glog.Infof("Deleting ConfigMap: %v\n", key)
		lbc.cnf.DeleteConfigmap(name)
	} else {
		cfgm := obj.(*api.ConfigMap)
		cfgex, err := lbc.createConfigmap(cfgm)
		if err != nil {
			lbc.cfgmQueue.requeueAfter(key, err, 30*time.Second)
			return
		}
		lbc.cnf.AddOrUpdateConfigmap(name, cfgex)
	}

	ings, _ := lbc.ingLister.List()
	for _, ing := range ings.Items {
		if !isNginxIngress(&ing) {
			continue
		}
		lbc.ingQueue.enqueue(&ing)
	}
}

func (lbc *LoadBalancerController) syncIng(key string) {
	obj, ingExists, err := lbc.ingLister.Store.GetByKey(key)
	if err != nil {
		lbc.ingQueue.requeue(key, err)
		return
	}

	// defaut/some-ingress -> default-some-ingress
	name := strings.Replace(key, "/", "-", -1)

	if !ingExists {
		glog.Infof("Deleting Ingress: %v\n", key)
		lbc.cnf.DeleteIngress(name)
	} else {
		glog.V(2).Infof("Adding or Updating Ingress: %v\n", key)

		ing := obj.(*extensions.Ingress)
		ingEx, err := lbc.createIngress(ing)
		if err != nil {
			lbc.ingQueue.requeueAfter(key, err, 30*time.Second)
			return
		}
		lbc.cnf.AddOrUpdateIngress(name, ingEx)
	}
}

func (lbc *LoadBalancerController) enqueueIngressForService(svc *api.Service) {
	ings := lbc.getIngressesForService(svc)
	for _, ing := range ings {
		if !isNginxIngress(&ing) {
			continue
		}
		lbc.ingQueue.enqueue(&ing)
	}
}

func (lbc *LoadBalancerController) getIngressesForService(svc *api.Service) []extensions.Ingress {
	ings, err := lbc.ingLister.GetServiceIngress(svc)
	if err != nil {
		return nil
	}
	return ings
}

func (lbc *LoadBalancerController) getIngressForEndpoints(obj interface{}) []extensions.Ingress {
	var ings []extensions.Ingress
	endp := obj.(*api.Endpoints)
	svcKey := endp.GetNamespace() + "/" + endp.GetName()
	svcObj, svcExists, err := lbc.svcLister.Store.GetByKey(svcKey)
	if err != nil {
		glog.Infof("error getting service %v from the cache: %v\n", svcKey, err)
	} else {
		if svcExists {
			//glog.Infoln(svcKey)
			//glog.Infoln(svcExists)
			ings = append(ings, lbc.getIngressesForService(svcObj.(*api.Service))...)
		}
	}
	return ings
}

func (lbc *LoadBalancerController) createIngress(ing *extensions.Ingress) (*nginx.IngressEx, error) {
	ingEx := &nginx.IngressEx{
		Ingress: ing,
	}
	ingEx.Secrets = make(map[string]*api.Secret)
	for _, tls := range ing.Spec.TLS {
		secretName := tls.SecretName
		secret, err := lbc.client.Secrets(ing.Namespace).Get(secretName)
		if err != nil {
			glog.Infoln(err)
			return nil, fmt.Errorf("Error retrieving secret %v for Ingress %v: %v", secretName, ing.Name, err)
		}
		ingEx.Secrets[secretName] = secret
	}

	ingEx.Endpoints = make(map[string][]string)
	if ing.Spec.Backend != nil {
		endps, err := lbc.getEndpointsForIngressBackend(ing.Spec.Backend, ing.Namespace)
		if err != nil {
			glog.Warningf("Error retrieving endpoints for the service %v: %v", ing.Spec.Backend.ServiceName, err)
		} else {
			ingEx.Endpoints[ing.Spec.Backend.ServiceName+ing.Spec.Backend.ServicePort.String()] = endps
		}
	}

	for _, rule := range ing.Spec.Rules {
		if rule.IngressRuleValue.HTTP == nil {
			continue
		}

		for _, path := range rule.HTTP.Paths {
			endps, err := lbc.getEndpointsForIngressBackend(&path.Backend, ing.Namespace)
			if err != nil {
				glog.Warningf("Error retrieving endpoints for the service %v: %v", path.Backend.ServiceName, err)
			} else {
				ingEx.Endpoints[path.Backend.ServiceName+path.Backend.ServicePort.String()] = endps
			}
		}
	}

	return ingEx, nil
}

func (lbc *LoadBalancerController) getEndpointsForIngressBackend(backend *extensions.IngressBackend, namespace string) ([]string, error) {
	svc, err := lbc.getServiceForIngressBackend(backend, namespace)
	if err != nil {
		return nil, err
	}

	endps, err := lbc.endpLister.GetServiceEndpoints(svc)
	if err != nil {
		glog.Infof("Error getting endpoints for service %s from the cache: %v", svc.Name, err)
		return nil, err
	}

	result, err := lbc.getEndpointsForPort(endps, backend.ServicePort, svc)

	if err != nil {
		glog.Infof("Error getting endpoints for service %s port %v: %v", svc.Name, backend.ServicePort, err)
		return nil, err
	}
	return result, nil
}

func (lbc *LoadBalancerController) getEndpointsForConfigmapBackend(backend map[string]string, namespace string) ([]string, error) {
	svc, err := lbc.getServiceForConfigmapBackend(backend, namespace)
	if err != nil {
		return nil, err
	}
	endps, err := lbc.endpLister.GetServiceEndpoints(svc)
	if err != nil {
		return nil, err
	}
	result, err := lbc.getEndpointsForPort(endps, intstr.FromInt(0), svc)
	//glog.Infoln(result)
	if err != nil {
		glog.Infof("Error getting endpoints for service %s : %v", svc.Name, err)
		return nil, err
	}
	return result, nil
}

func (lbc *LoadBalancerController) getEndpointsForPort(endps api.Endpoints, ingSvcPort intstr.IntOrString, svc *api.Service) ([]string, error) {
	var targetPort int
	var err error
	found := false
	for _, port := range svc.Spec.Ports {
		if (ingSvcPort.Type == intstr.Int && ingSvcPort.IntValue() == 0 || ingSvcPort.Type == intstr.Int && port.Port == ingSvcPort.IntValue()) || (ingSvcPort.Type == intstr.String && port.Name == ingSvcPort.String()) {
			targetPort, err = lbc.getTargetPort(&port, svc)
			if err != nil {
				return nil, fmt.Errorf("Error determining target port for port %v in Ingress: %v", ingSvcPort, err)
			}
			found = true
			break
		}
	}

	if !found {
		return nil, fmt.Errorf("No port %v in service %s", ingSvcPort, svc.Name)
	}

	for _, subset := range endps.Subsets {
		for _, port := range subset.Ports {
			if port.Port == targetPort {
				var endpoints []string
				for _, address := range subset.Addresses {
					endpoint := fmt.Sprintf("%v:%v", address.IP, port.Port)
					endpoints = append(endpoints, endpoint)
				}
				return endpoints, nil
			}
		}
	}

	return nil, fmt.Errorf("No endpoints for target port %v in service %s", targetPort, svc.Name)
}

func (lbc *LoadBalancerController) getTargetPort(svcPort *api.ServicePort, svc *api.Service) (int, error) {
	if (svcPort.TargetPort == intstr.IntOrString{}) {
		return svcPort.Port, nil
	}

	if svcPort.TargetPort.Type == intstr.Int {
		return svcPort.TargetPort.IntValue(), nil
	}

	pods, err := lbc.client.Pods(svc.Namespace).List(api.ListOptions{LabelSelector: labels.Set(svc.Spec.Selector).AsSelector()})
	if err != nil {
		return 0, fmt.Errorf("Error getting pod information: %v", err)
	}

	if len(pods.Items) == 0 {
		return 0, fmt.Errorf("No pods of service %s", svc.Name)
	}

	pod := &pods.Items[0]

	portNum, err := podutil.FindPort(pod, svcPort)
	if err != nil {
		return 0, fmt.Errorf("Error finding named port %v in pod %s: %v", svcPort, pod.Name, err)
	}

	return portNum, nil
}

func (lbc *LoadBalancerController) getServiceForIngressBackend(backend *extensions.IngressBackend, namespace string) (*api.Service, error) {
	svcKey := namespace + "/" + backend.ServiceName
	svcObj, svcExists, err := lbc.svcLister.Store.GetByKey(svcKey)
	if err != nil {
		return nil, err
	}

	if svcExists {
		return svcObj.(*api.Service), nil
	}

	return nil, fmt.Errorf("service %s doesn't exists", svcKey)
}

func (lbc LoadBalancerController) getServiceForConfigmapBackend(backend map[string]string, namespace string) (*api.Service, error) {
	svcKey := namespace + "/" + backend["servicename"]
	svcObj, svcExists, err := lbc.svcLister.Store.GetByKey(svcKey)
	if err != nil {
		glog.Errorln(err)
		return nil, err
	}

	if svcExists {
		return svcObj.(*api.Service), nil
	}

	return nil, fmt.Errorf("service %s doesn't exists", svcKey)
}

func parseNginxConfigMaps(nginxConfigMaps string) (string, string, error) {
	res := strings.Split(nginxConfigMaps, "/")
	if len(res) != 2 {
		return "", "", fmt.Errorf("NGINX configmaps name must follow the format <namespace>/<name>, got: %v", nginxConfigMaps)
	}
	return res[0], res[1], nil
}

func isNginxIngress(ing *extensions.Ingress) bool {
	if loadbalance, exists := ing.Annotations[loadbanlanceClassKey]; exists {
		if loadbalance != IngressForWho {
			return false
		}
	} else {
		return false
	}

	if class, exists := ing.Annotations[ingressClassKey]; exists {
		return class == nginxIngressClass || class == ""
	}

	return true
}

func isNginxConfigMap(cfg *api.ConfigMap) bool {
	if loadbalance, exists := cfg.Annotations[loadbanlanceClassKey]; exists {
		if loadbalance != IngressForWho {
			return false
		}
	} else {
		return false
	}
	return true
}

func (lbc *LoadBalancerController) createConfigmap(cfg *api.ConfigMap) (*nginx.ConfigmapEx, error) {
	cfgEx := &nginx.ConfigmapEx{
		Config: cfg,
	}

	cfgEx.Endpoints = make(map[string][]string)
	if _, exists := cfg.Data["host"]; !exists {
		return nil, errors.New("Host Not Found")
	}
	if _, exists := cfg.Data["servicename"]; !exists {
		return nil, errors.New("Service Name Not Found")
	}
	if _, exists := cfg.Data["hostport"]; !exists {
		return nil, errors.New("Host Port Not Found")
	}

	endps, err := lbc.getEndpointsForConfigmapBackend(cfg.Data, cfg.Namespace)
	if err != nil {
		glog.Warningf("Error retrieving endpoints for the service %v: err: %v", cfg.Data["servicename"], err)
		return nil, err
	}

	cfgEx.Endpoints[cfg.Data["servicename"]+cfg.Data["hostport"]] = endps
	return cfgEx, nil
}
