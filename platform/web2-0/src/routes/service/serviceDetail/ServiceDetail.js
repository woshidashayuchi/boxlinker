
import React, { PropTypes,Component } from 'react';
import cookie from "react-cookie";
import fetch from "isomorphic-fetch";
import {Tabs,Tab,DropdownButton,MenuItem} from 'react-bootstrap';
import InputRange from 'react-input-range';
import GetDisposedTabs from './GetDisposedTabs.js';
import GetMonitorTabs from './GetMonitorTabs.js';
import GetReleaseTabs from './GetReleaseTabs.js';
import GetRealmNameTabs from './GetRealmNameTabs.js';
import GetContainerTabs from './GetContainerTabs.js';
import GetOptTabs from './GetOptTabs.js';
import Logs from '../../../components/Logs/Logs'
import {BREADCRUMB} from "../../../constants";
import Link from "../../../components/Link";
import Loading from "../../../components/Loading";
import * as Const from "../../../constants";
import s from "./ServiceDetail.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class ServiceDetail extends Component{
  static contextTypes = {
    store: React.PropTypes.object,
  };
  static propTypes = {
    serviceUuid: React.PropTypes.string,
    tabs:React.PropTypes.string,
    volumeList: React.PropTypes.object,
    certificateCon: React.PropTypes.object,
    serviceDetail : React.PropTypes.object,
    onSavePort: React.PropTypes.func,
    onSaveVolume:React.PropTypes.func,
    onSaveEnvironment:React.PropTypes.func,
    onServiceDetailLoad : React.PropTypes.func,
    onVolumeListLoad : React.PropTypes.func,
    getCertificate : React.PropTypes.func,
    onSaveContainerDeploy:React.PropTypes.func,
    onAddPort:React.PropTypes.func,
    onDelPort:React.PropTypes.func,
    onAddSave:React.PropTypes.func,
    onDelSave:React.PropTypes.func,
    onAddEnv:React.PropTypes.func,
    onDelEnv: React.PropTypes.func,
    notifications:React.PropTypes.object,
    serviceState :React.PropTypes.string,
    setBreadcrumb:React.PropTypes.func,
    loadEndpoints: React.PropTypes.func,
    onClearServiceDetail:React.PropTypes.func,
    onPodListLoad:React.PropTypes.func,
    podList :React.PropTypes.array,
    onChangeState:React.PropTypes.func,
    onAutoStateUp:React.PropTypes.func,
    onSaveCommand:React.PropTypes.func,
    onModifyDescribe:React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    imageDetail:React.PropTypes.object,
    getImageDetail:React.PropTypes.func,
    onChangePolicy:React.PropTypes.func,
    onDeleteService: React.PropTypes.func,
    onSavePods:React.PropTypes.func,
    modalState:React.PropTypes.object,
    onSaveDomain:React.PropTypes.func,
    onClearDeployDetail:React.PropTypes.func,
    serviceForImage:React.PropTypes.object,
    getServiceForImage:React.PropTypes.func,
    repeatName:React.PropTypes.object,
    onRepeatDomainName:React.PropTypes.func,
    consoleUrl:React.PropTypes.array,
    getConsoleUrl:React.PropTypes.func,
  };
  constructor(props){
    super(props);
    this.state = {
      containerNum:1,
      tabSelect:this.props.tabs
    }
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.SERVICE_LIST,BREADCRUMB.SERVICE_DETAIL);
    this.props.onServiceDetailLoad(this.props.serviceUuid);
    this.volumePage = {
      page_size:1000,
      page_num:1
    };
    this.props.onVolumeListLoad(this.volumePage);
    this.props.getCertificate();
    this.props.onPodListLoad(this.props.serviceUuid);
  }
  componentWillUnmount(){
    this.props.onClearServiceDetail();
    this.props.onClearDeployDetail();
  }
  tabSelect(key){
    if(key != 3){
      this.refs.log.onAbortLog();//当!=3的时候清除xhr
    }
    switch (Number(key)){
      case 1:
        this.setState({
          tabSelect:1
        });
        break;
      case 2:
        // this.props.onPodListLoad(this.props.serviceUuid);
        this.setState({
          tabSelect:2
        });
        break;
      case 3:
        this.setState({
          tabSelect:3
        });
        this.refs.log.onGetLogs();//等于3的时候执行xhr
        break;
      case 4:
        this.setState({
          tabSelect:4
        });
        this.props.getImageDetail(this.props.serviceForImage.image_uuid);
        break;
      case 5:
        this.setState({
          tabSelect:5
        });
        break;
      case 6:
        // this.props.onPodListLoad(this.props.serviceUuid);
        this.setState({
          tabSelect:6
        });
        break;
      case 7:
        this.setState({
          tabSelect:7
        });
        break;
      default:
            break;
    }
  }
  render(){
    let username = this.context.store.getState().user_info.user_name;
    let data = this.props.serviceDetail;
    let cName = false;
    if (data&&!data.service_uuid){
      return (
        <div style={{"textAlign":"center"}}><Loading /></div>
      )
    }
    let domain = [];
    data.container.map((item) =>{
      let obj = {};
      obj.type = item.access_mode;
      if(obj.type == "HTTP" || obj.type == "HTTPS"){
        cName = true;
        obj.url = item.identify == 1?item.domain:item.http_domain;
      }else{
        obj.url = item.tcp_domain;
        obj.port = item.container_port;
      }
      domain.push(obj);
    });
    return(
      <div className="containerBgF containerPadding">
        <div className={s.hd}>
          <div className={s.logo}>
            <img src = {data.image_dir} />
            {/*<a href="javascript:;">置于首页</a>*/}
          </div>
          <div className={s.info}>
            <GetStateHead
              serviceDetail={data}
              onChangeState = {(data) =>{this.props.onChangeState(data)}}
              isBtnState = {this.props.isBtnState}
              getServiceDetail = {(serviceName,flag) =>{this.props.onServiceDetailLoad(serviceName,flag)}}
              serviceUuid = {this.props.serviceUuid}
              consoleUrl = {this.props.consoleUrl}
              getConsoleUrl = {() =>{this.props.getConsoleUrl()}}
              podList={this.props.podList}
            />
            <div className={s.address}>
              <div className={cx(s.addItem)}>
                <span className={s.addName}>域名:</span>
                {domain.map((item,i) =>{
                  if(item.type == "HTTP" || item.type == 'HTTPS'){
                    return <a key = {i} href={`${item.type}://${item.url}`} target="_blank" className="clLink">{item.url}</a>
                  }else{
                    if(item.url) {
                      return <span key={i} className="">{item.url} ({item.port}/{item.type})</span>
                    }
                  }
                })}
              </div>
              <div className={s.addItem}>
                <span className={s.addName}>内网地址:</span>
                <span >{`${data.service_name}.${username}.svc`}</span>
              </div>
              <div className={s.addItem}>
                <span className={s.addName}>所属镜像:</span>
                <GetServiceForImage
                  serviceForImage={this.props.serviceForImage}
                  tagid = {data.image_id}
                  getServiceForImage={(id)=>{this.props.getServiceForImage(id)}}
                />
              </div>
              <div className={s.addItem}>
                <span className={s.addName}>服务描述:</span>
                <span >{`${data.description}`}</span>
              </div>
              <GetContainerNumber
                serviceData={data}
                onSavePods={(data) =>{this.props.onSavePods(data)}}
                isBtnState={this.props.isBtnState}
                serviceUuid = {this.props.serviceUuid}
              />
            </div>
          </div>
        </div>
        <div className={s.main}>
          <Tabs defaultActiveKey={Number(this.props.tabs)} onSelect={this.tabSelect.bind(this)} className = {cx(s.tabs,"tabIcon")} id="serviceDetail">
            <Tab eventKey={1} title="配置">
              <GetDisposedTabs
                volumeList={this.props.volumeList}
                certificateCon={this.props.certificateCon}
                serviceName = {this.props.serviceName}
                serviceUuid={this.props.serviceUuid}
                serviceDetail={this.props.serviceDetail}
                onServiceDetailLoad = {(name) => {this.props.onServiceDetailLoad(name)}}
                onSavePort={data => this.props.onSavePort(data)}
                onSaveVolume={data => this.props.onSaveVolume(data)}
                onModifyDescribe={data => this.props.onModifyDescribe(data)}
                onSaveEnvironment={data => this.props.onSaveEnvironment(data)}
                onSaveContainerDeploy={(data,my) => this.props.onSaveContainerDeploy(data,my)}
                onAddPort={(port) => this.props.onAddPort(port)}
                onDelPort={(port) =>this.props.onDelPort(port)}
                onAddSave={() => this.props.onAddSave()}
                onDelSave={(item) =>this.props.onDelSave(item)}
                onAddEnv={()=> this.props.onAddEnv()}
                onDelEnv={(item) => this.props.onDelEnv(item)}
                onSaveCommand = {(txt) => this.props.onSaveCommand(txt)}
                onAutoStateUp = {(data) => this.props.onAutoStateUp(data)}
                isBtnState = {this.props.isBtnState}
              />
            </Tab>
            <Tab eventKey={2} title="监控">
              <GetMonitorTabs
                ref = "monitor"
                serviceDetail = {this.props.serviceDetail}
                podList = {this.props.podList}
              />
            </Tab>
            <Tab eventKey={3} title="日志">
              <div className={cx(s.item,"log")} style={{paddingBottom:"100px"}}>
                <Logs logLabel={data.labels_name} service_uuid = {this.props.serviceUuid} tabs = {this.props.tabs} ref = "log" />
              </div>
            </Tab>
            <Tab eventKey={4} title="发布">
              <GetReleaseTabs
                serviceUuid = {this.props.serviceUuid}
                serviceDetail = {this.props.serviceDetail}
                serviceForImage = {this.props.serviceForImage}
                imageDetail = {this.props.imageDetail}
                getImageDetail = {(id) => this.props.getImageDetail(id)}
                isBtnState = {this.props.isBtnState}
                onChangePolicy = {(data) => this.props.onChangePolicy(data)}
              />
            </Tab>
            <Tab eventKey={5} title="域名">
              <GetRealmNameTabs
                serviceUuid = {this.props.serviceUuid}
                serviceDetail = {this.props.serviceDetail}
                onSaveDomain = {(data) =>{this.props.onSaveDomain(data)}}
                isBtnState = {this.props.isBtnState}
                repeatName={this.props.repeatName}
                onRepeatDomainName = {(name)=>{this.props.onRepeatDomainName(name)}}
              />
            </Tab>
            <Tab eventKey={6} title="容器实例">
              <GetContainerTabs
                podList = {this.props.podList}
              />
            </Tab>
            <Tab eventKey={7} title="操作">
              <GetOptTabs
                serviceUuid = {this.props.serviceUuid}
                onDeleteService = {(serviceUuid) =>{this.props.onDeleteService(serviceUuid)}}
                modalState = {this.props.modalState}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

class GetStateHead extends Component{
  static propTypes = {
    serviceDetail:React.PropTypes.object,
    onChangeState:React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    getServiceDetail:React.PropTypes.func,
    serviceUuid :React.PropTypes.string,
    podList:React.PropTypes.array
  };
  constructor(){
    super();
    this.state = {
      abc:1
    }
  }
  componentDidMount(){
    let serviceState = this.props.isBtnState.serviceState.state.toLowerCase();
    if(serviceState == "pending" || serviceState == "containercreating"){
      let my = this;
      this.myTime = setInterval(function(){
        my.props.getServiceDetail(my.props.serviceUuid,serviceState)
      },5000)
    }else{
      clearTimeout(this.myTime);
    }
  }
  componentDidUpdate(){
    let serviceState = this.props.isBtnState.serviceState.state.toLowerCase();
    if(serviceState == "pending" || serviceState == "containercreating"){
      let my = this;
      clearInterval(my.myTime);
      this.myTime = setTimeout(function(){
        my.props.getServiceDetail(my.props.serviceUuid,serviceState)
      },5000)
    }else{
      clearInterval(this.myTime);
    }
  }
  componentWillUnmount(){
    clearTimeout(this.myTime);
  }
  changeState(uuid,state){
    let data = {serviceUuid:uuid,state:state?"stop":"start"};
    this.props.onChangeState(data)
  }
  getConsoleBtn(){
    if(this.props.podList.length == 0 ||this.props.podList[0] ==1) return;
    let podList = this.props.podList;
    if(podList.length ==1){
      return <ConsoleBtn podName = {podList[0].pod_name} type = {true} />
    }
    let menu = podList.map((item,i)=>{
      return <ConsoleBtn key = {i} podName = {item.pod_name} type = {false} />
    });
    return <DropdownButton bsStyle="primary" title = "进入控制台" id = "dropdownConsole" pullRight>
      {menu}
    </DropdownButton>;
  }
  render(){
    let data = this.props.serviceDetail;
    let serviceState = this.props.isBtnState.serviceState.state.toLowerCase();
    let time = this.props.isBtnState.serviceState.time;
    let serviceStateTxt = null;
    switch (serviceState) {
      case Const.SERVICE_STATE.Running : serviceStateTxt = <span className="text-success">运行</span>;
        break;
      case Const.SERVICE_STATE.Pending : serviceStateTxt = <span className="text-warning">创建中</span>;
        break;
      case Const.SERVICE_STATE.Stopping : serviceStateTxt = <span className="text-danger">关闭</span>;
        break;
      case 'containercreating':serviceStateTxt = <span className="text-warning btn-loading">创建中</span>;
        break;
      default : serviceStateTxt = <span className="text-danger">运行失败</span>;
        break;
    }
    return(
      <div className={s.title}>
        <div className={s.titleItem}>
          <span>服务名称:</span><span className = "clLink">{data.service_name}</span>
        </div>
        <div className={s.titleItem}>
          <span>部署时间:</span><span className="cl9">{time}</span>
        </div>
        <div className={s.titleItem}>
          <span>状态:</span>{serviceStateTxt}
        </div>
        <div className={s.titleItem}>
          {this.getConsoleBtn()}
          <button
            onClick = {this.changeState.bind(this,data.service_uuid,serviceState == Const.SERVICE_STATE.Running)}
            className={serviceState == Const.SERVICE_STATE.Running ?"btn btn-default":"btn btn-primary"} ref = "startUpBtn"
            disabled = {serviceState == Const.SERVICE_STATE.Pending ||serviceState == "containercreating"}
          >
            {serviceState == Const.SERVICE_STATE.Running ?"关闭":"启动"}</button>
        </div>
      </div>
    )
  }
}
class GetServiceForImage extends Component{
  static propTypes = {
    serviceForImage:React.PropTypes.object,
    getServiceForImage:React.PropTypes.func,
    tagid:React.PropTypes.string
  };
  componentDidMount(){
    this.props.getServiceForImage(this.props.tagid);
  }
  render(){
    let data = this.props.serviceForImage;
    if(!data.image_uuid) return null;
    return (
      <span><Link to = {'/imageDetail/'+data.image_uuid} className = "clLink">{`index.boxlinker.com/${data.image_name}`}</Link></span>
    )
  }
}
class GetContainerNumber extends Component{
  static propTypes ={
    serviceData:React.PropTypes.object,
    isBtnState:React.PropTypes.object,
    onSavePods:React.PropTypes.func,
    serviceUuid:React.PropTypes.string
  };
  constructor(props){
    super(props);
    this.state = {
      pods_num:props.serviceData.pods_num
    }
  }
  onSavePods(){
    let data = {
      serviceUuid : this.props.serviceUuid,
      pods_num : this.state.pods_num
    };
    this.props.onSavePods(data);
  }
  handleValueChange(component,value){
    this.setState({
      pods_num:value
    })
  }
  render(){
    return (
      <div className={s.addItem}>
        <span className={s.addName}>容器个数:</span>
        <div className={s.addRange}>
          <InputRange
            className="formField"
            maxValue={10}
            minValue={1}
            labelSuffix="个"
            value={this.state.pods_num}
            onChange={this.handleValueChange.bind(this)}
          />
        </div>
        {/*disabled={!this.props.isBtnState.pods}*/}
        {/*disabled = {data.pods_num == this.state.pods_num}*/}
        <button className={`btn btn-primary ${!this.props.isBtnState.pods?"btn-loading disabled":""}`}
                disabled={!this.props.isBtnState.pods}
                onClick = {this.onSavePods.bind(this)}>保存</button>
      </div>
    )
  }
}

class ConsoleBtn extends Component{
  static PropTypes = {
    podName:React.PropTypes.string,
    type :React.PropTypes.bool
  };
  constructor(){
    super();
    this.state = {
      url:"javascript:;"
    }
  }
  componentDidMount(){
    this.getConsoleUrl();
  }
  getConsoleUrl(){
    let myInit = {
      method:"GET",
      headers:{token:cookie.load("_at")}
    };
    let url = Const.FETCH_URL.GET_CONSOLE+"/"+this.props.podName;
    let my = this;
    console.log(url,"url");
    fetch(url,myInit)
        .then(response =>response.json())
        .then(json =>{
          console.log(json,"获取控制台url");
          if(json.status == 0){
            my.setState({
              url:json.result[0].url
            })
          }else{

          }
        })
  }
  render() {
    let html = this.props.type ? <a href={this.state.url} target="_blank" className="btn btn-primary">进入控制台</a>
      :
      <li><a href={this.state.url}>进入{this.props.podName}控制台</a></li>;

    return html
  }
}


export default widthstyle(s)(ServiceDetail);
