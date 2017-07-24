import * as Const from '../constants';
import fetch from 'isomorphic-fetch';
import {isLoadingAction} from './header';
import {receiveNotification,clearNotification} from './notification';
import {fetchVolumesListAction} from './volumes';
import cookie from 'react-cookie'

function receiveServiceDetail (data){
  return {
    type : Const.GET_SERVICE_DETAIL,
    payload : data
  }
}
function receiveServiceState(state,ltime){
  return {
    type:Const.IS_BTN_STATE.serviceState,
    payload:state,
    time:ltime
  }
}

export function clearServiceDetail(){
  return {
    type :Const.CLEAR_SERVICE_DETAIL,
    payload:{}
  }
}

export function fetchServiceDetailAction(service_uuid,state){
  let myInit = {
        method : "GET",
        headers:{token:cookie.load("_at")},
      },
      url = Const.FETCH_URL.SERVICE+'/application/services/'+service_uuid;
  return dispatch => {
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,">>>>>>servicerDetail--",state);
        if(json.status == 0){
          let data = json.result;
          if(data.env.length == 0){data.env.push({})}
          data.env.map((item,i) =>{
            item.at = new Date().getTime()+i;
          });
          data.container.map((item,i) =>{
            item.at = new Date().getTime()+i;
          });
          if(data.volume.length == 0){data.volume.push({})}
          data.volume.map((item,i) =>{
            item.at = new Date().getTime()+i;
          });
          if(data.service_status =="running" &&(state=="pending" || state == "containercreating")){
            dispatch(receiveNotification({message:"创建成功",level:"success"}));
            setTimeout(function(){
              dispatch(clearNotification())
            },3000);
          }
          dispatch(receiveServiceState(data.service_status,data.ltime));
          dispatch(receiveServiceDetail(data));
        }else{
          dispatch(receiveNotification({message:Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }
        dispatch(isLoadingAction(false));
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('service Detail error:',e)
      })
  }
}

export function addPortAction(port) {
  return {
    type:Const.ADD_PORT,
    payload:port
  }
}
export function delPortAction(port){
  return{
    type:Const.DEL_PORT,
    payload:port
  }
}
export function addSaveAction() {
  return {
    type:Const.ADD_SAVE
  }
}
export function delSaveAction(item){
  return{
    type:Const.DEL_SAVE,
    payload:item
  }
}
export function delEnvAction(item){
  return {
    type: Const.DEL_ENV,
    payload: item
  }
}

export function addEnvAction() {
  return {
    type:Const.ADD_ENV
  }
}
export function savePortAction(flag) {
  return {
    type:Const.IS_BTN_STATE.port,
    payload:flag
  }
}
export function saveStorageAction(flag) {
  return {
    type:Const.IS_BTN_STATE.storage,
    payload:flag
  }
}
export function saveEnvAction(flag) {
  return {
    type:Const.IS_BTN_STATE.env,
    payload:flag
  }
}
export function saveCommandAction(flag) {
  return {
    type:Const.IS_BTN_STATE.command,
    payload:flag
  }
}
export function describeCommandAction(flag) {
  return {
    type:Const.IS_BTN_STATE.describe,
    payload:flag
  }
}
export function savePodsAction(flag) {
  return {
    type:Const.IS_BTN_STATE.pods,
    payload:flag
  }
}
export function saveContainer(flag) {
  return {
    type:Const.IS_BTN_STATE.container,
    payload:flag
  }
}


export function fetchSavePortAction(data){
  let json = JSON.stringify({container:data.container});
  console.log(json);
  let myInit = {
    method : "PUT",
    headers:{token:cookie.load("_at")},
    body :json
  };
  let url = Const.FETCH_URL.SERVICE+"/application/services/"+data.serviceUuid+"?rtype=container";
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(savePortAction(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,">>>>>>更新端口");
        if(json.status == 0){
          dispatch(receiveNotification({message:"更新成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          dispatch(fetchServiceDetailAction(data.serviceUuid));
        }else{
          dispatch(receiveNotification({message:"更新失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
          console.error(json);
        }
        dispatch(isLoadingAction(false));
        dispatch(savePortAction(true));
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('save service port error:',e)
      })
  }
}

export function fetchSaveVolumeAction(data){
  let json = JSON.stringify({volume:data.volume});
  console.log(json);
  let myInit = {
    method : "PUT",
    headers:{token:cookie.load("_at")},
    body :json
  };
  let url = Const.FETCH_URL.SERVICE+"/application/services/"+data.serviceUuid+"?rtype=volume";
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(saveStorageAction(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,">>>>>>更新数据卷");
        if(json.status == 0){
          dispatch(receiveNotification({message:"更新成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          dispatch(fetchServiceDetailAction(data.serviceUuid));
          dispatch(fetchVolumesListAction({page_size:1000,page_num:1}));
        }else{
          dispatch(receiveNotification({message:"更新失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
          console.error(json);
        }
        dispatch(isLoadingAction(false));
        dispatch(saveStorageAction(true));
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('save service volume error:',e)
      })
  }
}

export function fetchSaveEnvironmentAction(data){
  if(data.env[0].env_key==""){
    data.env = "";
  }
  let json = JSON.stringify({env:data.env});
  console.log(json);
  let myInit = {
    method : "PUT",
    headers:{token:cookie.load("_at")},
    body :json
  };
  let url = Const.FETCH_URL.SERVICE+"/application/services/"+data.serviceUuid+"?rtype=env";
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(saveEnvAction(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json, " >>>>>>>更新环境变量")
        if(json.status == 0){
          dispatch(receiveNotification({message:"更新成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          dispatch(fetchServiceDetailAction(data.serviceUuid));
        }else{
          dispatch(receiveNotification({message:"更新失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
          console.error(json);
        }
        dispatch(isLoadingAction(false));
        dispatch(saveEnvAction(true));
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('save service env error:',e)
      })
  }
}

export function fetchSaveContainerDeployAction(data,my){
  console.log(data);
  let json = JSON.stringify({
    container_cpu:data.container_cpu,
    container_memory:data.container_memory,
    cm_format:data.cm_format
  });
  console.log(json);
  let myInit = {
    method : "PUT",
    headers:{token:cookie.load("_at")},
    body :json
  };
  let url = Const.FETCH_URL.SERVICE+"/application/services/"+data.serviceUuid+"?rtype=cm";
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(saveContainer(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json, " >>>>>>>更新容器配置")
        dispatch(isLoadingAction(false));
        dispatch(saveContainer(true));
        if(json.status == 0){
          my.setState({
            show:false
          });
          dispatch(receiveNotification({message:"更新成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          dispatch(fetchServiceDetailAction(data.serviceUuid));
        }else{
          dispatch(receiveNotification({message:"更新失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
          console.error(json);
        }
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(saveContainer(true));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('save service cpm memory error:',e)
      })
  }
}

export function onSavePodsAction(data) {
  let json = JSON.stringify({pods_num:data.pods_num});
  let myInit = {
    method : "PUT",
    headers:{token:cookie.load("_at")},
    body :json
  };
  let url = Const.FETCH_URL.SERVICE+"/application/services/"+data.serviceUuid+"?rtype=telescopic";
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(savePodsAction(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,">>>>>>更新容器个数");
        if(json.status == 0){
          dispatch(receiveNotification({message:"更新成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          dispatch(fetchServiceDetailAction(data.serviceUuid));
        }else{
          dispatch(receiveNotification({message:"更新失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
          console.error(json);
        }
        dispatch(isLoadingAction(false));
        dispatch(savePodsAction(true));
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(savePodsAction(true));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('save service pods_number error:',e)
      })
  }
}

export function receivePodList(data){
  return {
    type:Const.GET_POD_LIST,
    payload:data
  }
}

export function fetchOnPodListLoadAction(serviceUuid) {
  let myInit = {
      method : "GET",
      headers:{token:cookie.load("_at")},
    },
    url = Const.FETCH_URL.SERVICE+"/application/services/"+serviceUuid+"?pod=pod";
  return dispatch => {
    dispatch(isLoadingAction(true));
    return fetch(url, myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json, ">>>>>>pod");
        if (json.status == 0) {
          dispatch(receivePodList(json.result))
        }
        dispatch(isLoadingAction(false));
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('service pod error:',e)
      })
  }
}

export function isAutoStateUp(flag) {
  return{
    type:Const.IS_BTN_STATE.autoStateUp,
    payload:flag
  }

}

export function fetchAutoStateUp(data) {
  let obj = {auto_startup:data.auto_startup};
  let myInit = {
      method : "PUT",
      headers:{token:cookie.load("_at")},
      body:JSON.stringify(obj)
    },
    url = Const.FETCH_URL.SERVICE+"/application/services/"+data.serviceUuid+"?rtype=auto_startup";
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(isAutoStateUp(false));
    return fetch(url, myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json, ">>>>>>autostartup");
        dispatch(isLoadingAction(false));
        dispatch(isAutoStateUp(true));
        if (json.status == 0) {
          dispatch(receiveNotification({message:"更新成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          dispatch(fetchServiceDetailAction(data.serviceUuid));
        }else {
          dispatch(receiveNotification({message: "更新失败:" + Const.returnMsg(json.status), level: "danger"}));
          setTimeout(function () {
            dispatch(clearNotification())
          }, 5000);
        }
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(isAutoStateUp(true));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('service autostartup error:',e)
      })
  }
}

function isChange(flag){
  return {
    type:Const.IS_BTN_STATE.deploy,
    payload:flag
  }
}

export function fetchChangePolicyAction(data){
  let obj = JSON.stringify({
    image_id:data.image_id,
    policy:data.policy,
  });
  console.log(obj,"policy 参数");
  let myInit = {
    method : "PUT",
    headers:{token:cookie.load("_at")},
    body:obj
  };
  let url = Const.FETCH_URL.SERVICE+"/application/services/"+data.serviceUuid+"?rtype=policy";
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(isChange(false));
    return fetch(url,myInit)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          dispatch(isLoadingAction(false));
          dispatch(isChange(true));
          if(json.status == 0){
            dispatch(fetchServiceDetailAction(data.serviceUuid));
            dispatch(receiveNotification({message:"更新成功",level:"success"}));
            setTimeout(function(){
              dispatch(clearNotification())
            },3000);
          }else{
            dispatch(receiveNotification({message: "更新失败:" + Const.returnMsg(json.status), level: "danger"}));
            setTimeout(function () {
              dispatch(clearNotification())
            }, 5000);
          }
        })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(isChange(true));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('service publish error:',e)
      })
  }
}
export function fetchSaveCommand(data){
  let obj = JSON.stringify({
    command:data.command
  });
  let myInit = {
    method : "PUT",
    headers:{token:cookie.load("_at")},
    body:obj
  };
  let url = Const.FETCH_URL.SERVICE+"/application/services/"+data.serviceUuid+"?rtype=command";
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(saveCommandAction(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch(isLoadingAction(false));
        dispatch(saveCommandAction(true));
        if(json.status == 0){
          dispatch(fetchServiceDetailAction(data.serviceUuid));
          dispatch(receiveNotification({message:"更新成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }else{
          dispatch(receiveNotification({message: "更新失败:" + Const.returnMsg(json.status), level: "danger"}));
          setTimeout(function () {
            dispatch(clearNotification())
          }, 5000);
        }
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(saveCommandAction(true));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('service command error:',e)
      })
  }
}

export function fetchModifyVolumeAction(data){
  let obj = JSON.stringify({
    description:data.description
  });
  let myInit = {
    method : "PUT",
    headers:{token:cookie.load("_at")},
    body:obj
  };
  let url = Const.FETCH_URL.SERVICE+"/application/services/"+data.serviceUuid+"?rtype=description";
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(describeCommandAction(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch(isLoadingAction(false));
        dispatch(describeCommandAction(true));
        if(json.status == 0){
          dispatch(fetchServiceDetailAction(data.serviceUuid));
          dispatch(receiveNotification({message:"更新成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }else{
          dispatch(receiveNotification({message: "更新失败:" + Const.returnMsg(json.status), level: "danger"}));
          setTimeout(function () {
            dispatch(clearNotification())
          }, 5000);
        }
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(describeCommandAction(true));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('service command error:',e)
      })
  }
}

export function fetchSaveDomain(data) {
  let obj = JSON.stringify({
    cname:data.cname,
    domain:data.domain
  });
  let myInit = {
    method : "PUT",
    headers:{token:cookie.load("_at")},
    body:obj
  };
  let url = Const.FETCH_URL.SERVICE+"/application/services/"+data.serviceUuid+"?rtype=domain";
  return dispatch => {
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        dispatch(isLoadingAction(false));
        if(json.status == 0){
          dispatch(fetchServiceDetailAction(data.serviceUuid));
          dispatch(receiveNotification({message:"更新成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }else{
          dispatch(receiveNotification({message: "更新失败:" + Const.returnMsg(json.status), level: "danger"}));
          setTimeout(function () {
            dispatch(clearNotification())
          }, 5000);
        }
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('service domain error:',e)
      })
  }
}

function receiveDomainName(flag){
  return{
    type:Const.REPEAT_NAME.DOMAIN,
    payload:flag
  }
}
export function fetchRepeatDomainName(name){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")}
  };
  let url = Const.FETCH_URL.SERVICE+"/application/services/service_name/"+name+"?rtype=domain";
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"domain名称是否重复");
        if(json.status == 0){
          dispatch(receiveDomainName(json.result==1));//等于1已重复 ,0可用
        }else{
          dispatch(receiveDomainName(false));
        }
      })
      .catch(e => {
        dispatch(receiveDomainName(false));
      })
  })
}
