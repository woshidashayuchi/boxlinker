/**
 * Created by zhangsai on 16/9/2.
 */
import React, { PropTypes,Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import cx from 'classnames';
import s from './ServiceDetail.css';
import HeadLine from '../HeadLine';
import ContainerBox from '../ContainerBox';
import ContainerItem from '../ContainerItem';
import Toggle from '../Toggle';
import {Button,Modal} from 'react-bootstrap/lib';
import ReactDOM from 'react-dom';
import {CPU,INPUT_TIP} from '../../constants';

class AutoStartUpToggle extends  Component{
  static propTypes={
    getToggle:React.PropTypes.func,
    isState:React.PropTypes.bool,
    disabled:React.PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      autoStart:true
    };
  }
  componentWillMount(){
    this.setState({
      autoStart:this.props.isState
    })
  }
  handClick(component, value){
    this.setState({
      autoStart: !this.state.autoStart,
    });
    this.props.getToggle(this.state.autoStart);
  }
  render(){
    return(
      <Toggle
        disabled = {this.props.disabled}
        defaultChecked={this.state.autoStart}
        onChange={this.handClick.bind(this)}
      />
    )
  }
}

class ChooseContainerBtn extends Component{//选择容器 按钮
  static propTypes = {
    onSaveContainerDeploy:React.PropTypes.func,
    serviceName:React.PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      containerDeploy:0,
    };
  }
  showModal() {
    this.setState({show: true});
  }
  hideModal() {
    this.setState({show: false});
  }
  getContainer(index){
    this.setState({
      containerDeploy:index
    });
  }
  saveContainerDeploy(){
    let data = {
      containerDeploy:this.state.containerDeploy,
      serviceName:this.props.serviceName
    };
    this.props.onSaveContainerDeploy(data);
    this.hideModal();
  }
  render(){
    return(<div className={cx(s.chooseContainer,"icon-operation")} onClick={this.showModal.bind(this)}>
        <span>更改</span>
        <Modal {...this.props} show={this.state.show} onHide={this.hideModal.bind(this)} bsSize="sm" aria-labelledby="contained-modal-title-sm">
          <div className="modal-header">
            <button type="button" onClick={this.hideModal.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="contained-modal-title-sm">容器配置</h4>
          </div>
          <div className="modal-body">
            <div className={s.modalItem}>
              <ContainerBox
                getContainer = {this.getContainer.bind(this)}
              />
            </div>
            <div className={s.modalBtn}>
              <Button bsStyle="primary" onClick = {this.saveContainerDeploy.bind(this)}>保存</Button>
              <Button bsStyle="default" onClick={this.hideModal.bind(this)}>取消</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

class GetDisposedTabs extends Component{
  static propTypes = {
    serviceDetail : React.PropTypes.object,
    onServiceDetailLoad : React.PropTypes.func,
    onSavePort: React.PropTypes.func,
    onSaveVolume: React.PropTypes.func,
    onSaveEnvironment:React.PropTypes.func,
    getServiceFun : React.PropTypes.func,
    volumeList: React.PropTypes.array,
    onSaveContainerDeploy:React.PropTypes.func,
    onAddPort:React.PropTypes.func,
    onDelPort:React.PropTypes.func,
    onAddSave:React.PropTypes.func,
    onDelSave:React.PropTypes.func,
    onAddEnv:React.PropTypes.func,
    onDelEnv: React.PropTypes.func,
    onAutoStateUp:React.PropTypes.func,
    isBtnState:React.PropTypes.object
  };
  constructor(props){
    super(props);
    this.state = {
      isStateUp:1
    }
  }
  delVal (index){
    let containerTr = ReactDOM.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr");
    let input = containerTr[index].getElementsByTagName("input")[0];
    input.focus();
    input.value="";
  }
  focusVal(index){
    let containerTr = ReactDOM.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr");
    let input = containerTr[index].getElementsByTagName("input")[0];
    input.focus();
  }

  isPortRepeat(index,e){
    let container = [];
    let containerTr = ReactDOM.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr");
    let value = e.target.value;
    for(var i=0;i<containerTr.length;i++){
      let containerObj = {};
      containerObj.container_port = containerTr[i].getElementsByTagName("input")[0].value;
      container.push(containerObj);
    }
    if(value<=10 && value.length != 0){
      alert(INPUT_TIP.port.Format);
    }
    container.splice(index,1);
    container.map((item,i) => {
      if(item.container_port == value && value !=""){
        alert(INPUT_TIP.port.Repeat);
        e.target.focus();
      }
    });
  }
  isEnvKeyRepeat(index,e){
    let env = [];
    let envTr = ReactDOM.findDOMNode(this.refs.tab_env_box).children;
    let key = e.target.value;
    for(let i = 0;i<envTr.length;i++){
      let envObj = {};
      envObj.env_key = envTr[i].getElementsByTagName("input")[0].value;
      env.push(envObj);
    }
    env.splice(index,1);
    env.map((item) => {
      if(item.env_key == key && key !=""){
        alert(INPUT_TIP.env.Repeat);
        e.target.focus();
      }
    })

  }

  getPortTableBody(){//端口
    let data = [],sd = this.props.serviceDetail;
    if(sd&&sd.container&&sd.container.length)
      data = this.props.serviceDetail.container;
    let tr = data.map((item , i) => {
      return(
        <tr key = {item.at}>
          <td>
            <div className={s.astTdBox}>
              <div className={"iaBox"}>
                <input type="number" ref="container_port"  onBlur={this.isPortRepeat.bind(this,i)} className="form-control form-control-sm" defaultValue={item.container_port}/>
                <span className={cx("iaOk","icon-right")} onClick = {this.focusVal.bind(this,i)}> </span>
                <span className={cx("iaDel","icon-delete")} onClick = {this.delVal.bind(this,i)}> </span>
              </div>
            </div>
          </td>
          <td>
            <div className={s.astTdBox}>
              <select className="form-control" ref = "protocol" defaultValue = {item.protocol}>
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
              </select>
            </div>
          </td>
          <td>
            <div className={s.astTdBox}>
              <select className="form-control" ref = "access_mode" defaultValue = {item.access_mode}>
                <option value="HTTP">HTTP</option>
                <option value="TCP">TCP</option>
                <option value="no">不可访问</option>
              </select>
            </div>
          </td>
          <td>
            <div className={s.astTdBox}>
              <select className="form-control" ref = "access_scope" defaultValue = {item.access_scope}>
                <option value="outsisde">外部范围</option>
                <option value="inside">内部范围</option>
              </select>
            </div>
          </td>
          <td>
            <a href="javascript:;" className="delBtn" onClick = {this.delPortTr.bind(this,item.at)}> </a>
          </td>
        </tr>
      )
    });
    return (
      tr
    )
  }
  getPortTable(){
    return (
      <table className="table table-bordered">
        <thead>
        <tr>
          <th width = "20%">容器端口</th>
          <th width = "20%">协议</th>
          <th width = "20%">访问方式</th>
          <th width = "20%">访问范围</th>
          <th width = "20%">操作</th>
        </tr>
        </thead>
        <tbody ref = "tab_container_body">
        {this.getPortTableBody()}
        </tbody>
      </table>
    )
  }
  addPortTr(){
    this.props.onAddPort();
  }
  delPortTr(item){
    this.props.onDelPort(item);
  }
  savePort(){
    let container = [];
    let containerTr = ReactDOM.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr");
    for(var i=0;i<containerTr.length;i++){
      let containerObj = {};
      containerObj.container_port = containerTr[i].getElementsByTagName("input")[0].value;
      containerObj.protocol = containerTr[i].getElementsByTagName("select")[0].value;
      containerObj.access_mode = containerTr[i].getElementsByTagName("select")[1].value;
      containerObj.access_scope = containerTr[i].getElementsByTagName("select")[2].value;
      container.push(containerObj);
    }
    let data = {
      serviceName:this.props.serviceDetail.fservice_name,
      container:container
    };
    console.log(data,"+++++++")
    this.props.onSavePort(data);
  }

  getSaveTableBody(){//存储
    let data = [],sd = this.props.serviceDetail;
    let my = this;
    if(sd&&sd.volume&&sd.volume.length)
      data = this.props.serviceDetail.volume;
    let tr = data.map((item) => {
      let options = my.props.volumeList.map((obj,i) => {
        if(item.disk_name == obj.disk_name || obj.disk_status == "unused"  ) {
          return (
            <option key={i} value={obj.disk_name}>{obj.disk_name} </option>
          )
        }else{
          return false
        }
      });
      return (
        <tr key = {item.at}>
          <td>
            <div className={s.astTdBox}>
              <select className="form-control" ref = "volumnName" defaultValue={item.disk_name}>
                <option key = "-1">请选择数据卷</option>
                {options}
              </select>
            </div>
          </td>
          <td>
            <div className={s.astTdBox}>
              <input type = "text" className = "form-control" ref = "container_path" defaultValue={item.disk_path}/>
            </div>
          </td>
          <td>
            <div className={s.astTdBox}>
              <label>
                <input type="checkbox" defaultChecked={item.readonly == "True"} /> 是否只读
              </label>
            </div>
          </td>
          <td>
            <a href="javascript:;" className="delBtn" onClick = {this.delSaveTr.bind(this,item.at)}> </a>
          </td>
        </tr>
      )
    });

    return (
      tr
    )
  }
  getSaveTable(){
    return (
      <table className="table table-bordered">
        <thead>
        <tr>
          <th width = "25%">数据卷名称</th>
          <th width = "25%">容器路径</th>
          <th width = "25%">是否只读</th>
          <th width = "25%">操作</th>
        </tr>
        </thead>
        <tbody ref = "tab_storage_body">
        {this.getSaveTableBody()}
        </tbody>
      </table>
    )
  }
  addSaveTr(){
    this.props.onAddSave();
  }
  delSaveTr(item){
    this.props.onDelSave(item)
  }
  saveStorage(){
    let save = [];
    let saveTr = ReactDOM.findDOMNode(this.refs.tab_storage_body).children;
    for(let i = 0;i<saveTr.length;i++){
      let saveObj = {};
      saveObj.disk_name = saveTr[i].getElementsByTagName("select")[0].value;
      saveObj.disk_path = saveTr[i].getElementsByTagName("input")[0].value;
      saveObj.readonly = saveTr[i].getElementsByTagName("input")[1].checked?"True":"False";
      save.push(saveObj);
    }
    console.log(save);
    let data = {
      serviceName:this.props.serviceDetail.fservice_name,
      volume :save,
    };
    this.props.onSaveVolume(data);

  }

  getEnvironment(){
    let data = [],sd = this.props.serviceDetail;
    if(sd&&sd.env&&sd.env.length)
      data = this.props.serviceDetail.env;
    let keyBox = data.map((item,i) => {
      return (
        <div key = {item.at} className = {s.astKeyItem}>
          <div className={s.astInp}>
            <input type = "text" className = "form-control" onBlur={this.isEnvKeyRepeat.bind(this,i)} placeholder = "键" defaultValue={item.env_key} />
          </div>
          <div className={s.astLine}></div>
          <div className={s.astInp}>
            <input type = "text" className = "form-control" placeholder = "值" defaultValue={item.env_value} />
          </div>
          <div className = {s.astDel}>
            <a href="javascript:;" className="delBtn" onClick = {this.delEnvironmentData.bind(this,item.at)}> </a>
          </div>
        </div>
      )
    });
    return (
      keyBox
    )
  }
  addEnvironmentData(){
    this.props.onAddEnv();
  }
  delEnvironmentData(item){
    this.props.onDelEnv(item);
  }
  saveEnvironment(){
    let env = [];
    let envTr = ReactDOM.findDOMNode(this.refs.tab_env_box).children;
    for(let i = 0;i<envTr.length;i++){
      let envObj = {};
      envObj.env_key = envTr[i].getElementsByTagName("input")[0].value;
      envObj.env_value = envTr[i].getElementsByTagName("input")[1].value;
      env.push(envObj);
    }
    let data = {
      serviceName:this.props.serviceDetail.fservice_name,
      env :env,
    };
    this.props.onSaveEnvironment(data);
  }

  getContainerBox(n){
    if(!n){
      n=0;
    }
    let styleArr = [
        "containerBoxStyle_0 containerBoxStyle",
        "containerBoxStyle_1 containerBoxStyle",
        "containerBoxStyle_2 containerBoxStyle",
        "containerBoxStyle_3 containerBoxStyle",
        "containerBoxStyle_4 containerBoxStyle",
      ],
      newData = [],
      style = styleArr[n];
    newData.push(CPU[n]);
    let children = newData.map(function(item,i){
      return (
        <div className = {style} key = {i} >
          <ContainerItem key={i} classNumber = {i}>
            <span>{item.x}</span>
            <span>x</span>
            <span>{item.m}</span>
          </ContainerItem>
        </div>
      );
    });
    return (
      children
    )
  }

  getIsStartUp(value){
    this.setState({
      isStateUp:!value?1:0
    });
    let data = {
      serviceName:this.props.serviceDetail.fservice_name,
      auto_startup:!value?1:0
    };
    console.log(data);
    this.props.onAutoStateUp(data);
  }

  render(){
    let data = this.props.serviceDetail;
    let n = 0;
    this.props.volumeList.map((item) => {
      if(item.disk_status == "unused"){
        n++
      }
    });
    let volumeLength = n == 0 ?
                        "暂时没有数据卷":
                        `目前有${n}个数据卷`;
    return(
      <div className={s.asTabThird}>
        <div className={cx(s.assItem)}>
          <HeadLine
            title="端口"
            titleEnglish="PORT"
            titleInfo="容器端口会映射到主机端口上"
          />
          <div className={s.astBox}>
            {this.getPortTable()}
          </div>
          <div className={s.assBtnBox}>
            <Button bsStyle="primary" onClick = {this.addPortTr.bind(this)}>添加</Button>
            <Button bsStyle="default" onClick = {this.savePort.bind(this)}>保存</Button>
          </div>
        </div>
        <div className={cx(s.assItem)}>
          <HeadLine
            title="存储设置"
            titleEnglish="SAVE SETTING"
            titleInfo={volumeLength}
          />
          <div className={s.astBox}>
            {this.getSaveTable()}
          </div>
          <div className={s.assBtnBox}>
            <Button bsStyle="primary" onClick = {this.addSaveTr.bind(this)}>添加</Button>
            <Button bsStyle="default" onClick = {this.saveStorage.bind(this)}>保存</Button>
          </div>
        </div>
        <div className={cx(s.assItem)}>
          <HeadLine
            title="环境变量"
            titleEnglish="ENVIRONMENT VARIABLE"
            titleInfo=""
          />
          <div className={s.astBox} ref = "tab_env_box">
            {this.getEnvironment()}
          </div>
          <div className={s.assBtnBox}>
            <Button bsStyle="primary" onClick = {this.addEnvironmentData.bind(this)}>添加</Button>
            <Button bsStyle="default" onClick = {this.saveEnvironment.bind(this)}>保存</Button>
          </div>
        </div>
        <div className={cx(s.assItem)}>
          <HeadLine
            title="容器配置"
            titleEnglish="CONTAINER CONFIGURATION"
            titleInfo="容器配置说明"
          />
          <div className={s.assBox}>
            {this.getContainerBox(data.containerDeploy)}
            <ChooseContainerBtn
              serviceName = {this.props.serviceDetail.fservice_name}
              onSaveContainerDeploy={(data) => {this.props.onSaveContainerDeploy(data)}}
            />
          </div>
        </div>
        <div className={cx(s.assItem)}>
          <HeadLine
            title="启动命令"
            titleEnglish="JRE"
            titleInfo="启动命令解释说明 "
          />
          <div className={s.assBox}>
            <input className = "form-control"
                   type="text"
                   placeholder=""
            />
          </div>
          <div className={s.assBtnBox}>
            <Button bsStyle="default" >保存</Button>
          </div>
        </div>
        <div className={cx(s.assItem, s.assItemNoborder)}>
          <HeadLine
            title="自动启动"
            titleEnglish="AUTO UPDATE SETTING"
            titleInfo="自动启动设置"
          />
          <div className={s.assBox}>
            <AutoStartUpToggle disabled ={!this.props.isBtnState.autoStateUp} isState = {data.auto_startup==1} getToggle = {this.getIsStartUp.bind(this)}  />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(GetDisposedTabs);

