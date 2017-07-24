/**
 * Created by zhangsai on 16/9/2.
 */
import React, { PropTypes,Component } from 'react';
import HeadLine from '../../../components/HeadLine';
import ContainerBox from '../../../components/ContainerBox';
import ContainerItem from '../../../components/ContainerItem';
import Toggle from '../../../components/Toggle';
import {Button,Modal} from 'react-bootstrap/lib';
import ReactDOM from 'react-dom';
import {CPU,INPUT_TIP} from '../../../constants';
import {clearDeployData} from '../../../actions/deployService';
import s from "./ServiceDetail.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class ChooseContainerBtn extends Component{//选择容器 按钮
  static propTypes = {
    onSaveContainerDeploy:React.PropTypes.func,
    serviceUuid:React.PropTypes.string,
    number:React.PropTypes.number,
    isBtnState:React.PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };
  }
  showModal() {
    this.setState({show: true});
  }
  hideModal() {
    this.setState({show: false});
  }
  saveContainerDeploy(){
    let index = this.refs.container.getValue();
    let data = {
      container_cpu:CPU[index].cpu,
      container_memory:CPU[index].m,
      cm_format:CPU[index].x,
      serviceUuid:this.props.serviceUuid
    };
    this.props.onSaveContainerDeploy(data,this);
  }
  render(){
    return(<div className={cx(s.choose,"icon-operation")} onClick={this.showModal.bind(this)}>
        <span>更改</span>
        <Modal {...this.props} show={this.state.show} onHide={this.hideModal.bind(this)} bsSize="sm"
               aria-labelledby="contained-modal-title-sm">
          <div className="modal-header">
            <button type="button" onClick={this.hideModal.bind(this)} className="close" aria-label="Close">
              <span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="contained-modal-title-sm">容器配置</h4>
          </div>
          <div className="modal-body">
            <div className="modalItem">
              <ContainerBox
                ref = "container"
                modal = {true}
                number = {this.props.number}
              />
            </div>
            <div className="modalBtn">
              <Button bsStyle="primary"
                      disabled = {!this.props.isBtnState.container}
                      onClick = {this.saveContainerDeploy.bind(this)}>保存</Button>
              <Button bsStyle="default" onClick={this.hideModal.bind(this)}>取消</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

class GetDisposedTabs extends Component{
  static contextTypes = {
    store:PropTypes.object
  };
  static propTypes = {
    serviceName:React.PropTypes.string,
    serviceUuid:React.PropTypes.string,
    serviceDetail : React.PropTypes.object,
    onServiceDetailLoad : React.PropTypes.func,
    onSavePort: React.PropTypes.func,
    onSaveVolume: React.PropTypes.func,
    onSaveEnvironment:React.PropTypes.func,
    getServiceFun : React.PropTypes.func,
    volumeList: React.PropTypes.object,
    certificateCon: React.PropTypes.object,
    onSaveContainerDeploy:React.PropTypes.func,
    onAddPort:React.PropTypes.func,
    onDelPort:React.PropTypes.func,
    onAddSave:React.PropTypes.func,
    onDelSave:React.PropTypes.func,
    onAddEnv:React.PropTypes.func,
    onDelEnv: React.PropTypes.func,
    onSaveCommand:React.PropTypes.func,
    onModifyDescribe:React.PropTypes.func,
    onAutoStateUp:React.PropTypes.func,
    isBtnState:React.PropTypes.object
  };
  constructor(props){
    super(props);
    this.state = {
      isStateUp:1,
      port:false,
      volume:false,
      env:false,
      isCon:false
    }
  }
  delVal(index){
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
    this.setState({
      port:false
    });
    e.target.className = "form-control form-control-sm";
    if(value.length == 0){
      this.setState({
        port:true
      });
      e.target.className = "form-control form-control-sm inputError";
      this.refs.portTip.innerHTML = INPUT_TIP.port.Null;
      return false;
    }
    if(!/^[0-9]{2,6}$/.test(value)){
      this.setState({
        port:true
      });
      e.target.className = "form-control form-control-sm inputError";
      this.refs.portTip.innerHTML = INPUT_TIP.port.Format;
      return false;
    }
    container.splice(index,1);
    container.map((item,i) => {
      if(item.container_port == value && value !=""){
        this.setState({
          port:true
        });
        e.target.className = "form-control form-control-sm inputError";
        this.refs.portTip.innerHTML = INPUT_TIP.port.Repeat;
        e.target.focus();
        return false;
      }
    });
  }
  isSaveRepeat(index,e){
    let save = [];
    let saveTr = ReactDOM.findDOMNode(this.refs.tab_storage_body).children;
    let key = e.target.value;
    this.setState({
      volume:false
    });
    for(let i = 0;i<saveTr.length;i++){
      let saveObj = {};
      saveObj.value = saveTr[i].getElementsByTagName("select")[0].value;
      save.push(saveObj);
    }
    save.splice(index,1);
    save.map((item) => {
      if(item.value == key && key !=""){
        this.setState({
          volume:true
        });
        this.refs.volumeTip.innerHTML = INPUT_TIP.volumes.Repeat;
        e.target.value = "-1";
        e.target.focus();
        return false;
      }
    })

  }
  isEnvKeyRepeat(index,e){
    let env = [];
    let regExp = /^[a-zA-Z]+[a-zA-Z0-9_]*$/;
    let envTr = ReactDOM.findDOMNode(this.refs.tab_env_box).children;
    let key = e.target.value;
    if(key.length == "") {
      this.setState({
        env: false
      });
      e.target.className = "form-control";
      return false;
    }
    if(!regExp.test(key)){
      this.setState({
        env:true
      });
      this.refs.envTip.innerHTML = INPUT_TIP.env.Format;
      e.target.className = "form-control inputError";
      e.target.focus();
      return false;
    }else{
      this.setState({
        env: false
      });
      e.target.className = "form-control";
      return false;
    }
    for(let i = 0;i<envTr.length;i++){
      let envObj = {};
      envObj.env_key = envTr[i].getElementsByTagName("input")[0].value;
      env.push(envObj);
    }
    env.splice(index,1);
    env.map((item) => {
      if(item.env_key == key && key !=""){
        this.setState({
          env:true
        });
        this.refs.envTip.innerHTML = INPUT_TIP.volumes.Repeat;
        e.target.className = "form-control inputError";
        e.target.focus();
      }
    })
  }
  isEnvValue(e){
    this.setState({
      env:false
    });
    e.target.className = "form-control";
  }
  isPathValidata(index,e){
    let regExp = /^\/[a-zA-Z0-9]+[a-zA-Z0-9_\/]*$/;
    let value = e.target.value;
    let save = [];
    let saveTr = ReactDOM.findDOMNode(this.refs.tab_storage_body).children;
    for(let i = 0;i<saveTr.length;i++){
      save.push(saveTr[i].getElementsByTagName("input")[0].value);
    }
    save.splice(index,1);
    if(!regExp.test(value)&&value.length != 0){
      this.setState({
        volume:true
      });
      e.target.className = "form-control inputError";
      this.refs.volumeTip.innerHTML = INPUT_TIP.volumes.Format;
      return false;
    }else if(save.indexOf(value) !=-1){
      this.setState({
        volume:true
      });
      e.target.className = "form-control inputError";
      this.refs.volumeTip.innerHTML = INPUT_TIP.volumes.Path;
    }else{
      this.setState({
        volume:false
      });
      e.target.className = "form-control";
    }
  }
  changeProtocol(i,item,e){
    console.log(i,item,e.target.value);
    let tr = this.refs.tab_container_body.getElementsByTagName("tr");
    let access_mode = tr[i].getElementsByTagName("select")[1];
    let option = null;
    switch (e.target.value){
      case "TCP":
        option =  '<option value="HTTP">HTTP</option>'+
            '<option value="HTTPS">HTTPS</option>'+
            '<option value="TCP">TCP</option>'+
            '<option value="no" selected>不可访问</option>';
        access_mode.innerHTML = option;
        break;
      case "UDP":
        option = '<option value="UDP">UDP</option><option value="no" selected>不可访问</option>';
        access_mode.innerHTML = option;
        break;
      default:

    }
    tr = this.refs.tab_container_body.getElementsByTagName("tr");
    for(var m =0;m<tr.length;m++){
      let accessMode = tr[m].getElementsByTagName("select")[1];
      let accessProt = tr[m].getElementsByTagName("select")[0];
      if(accessMode.value == "HTTP" || accessMode.value == "HTTPS"){
        document.querySelectorAll('.accessMode').forEach(function(item){
          item.innerHTML = '<option value="no">不可访问</option>';
        });
        option =  '<option value="HTTP">HTTP</option>'+
            '<option value="HTTPS">HTTPS</option>'+
            '<option value="TCP">TCP</option>'+
            '<option value="no" selected>不可访问</option>';
        accessMode.innerHTML = option;
        return false
      }
      if(accessProt.value == "UDP"){
        accessMode.innerHTML = '<option value="UDP">UDP</option>'+'<option value="no" selected>不可访问</option>';
      }
      if(accessProt.value == "TCP"){
        option =  '<option value="HTTP">HTTP</option>'+
            '<option value="HTTPS">HTTPS</option>'+
            '<option value="TCP">TCP</option>'+
            '<option value="no" selected>不可访问</option>';
        accessMode.innerHTML = option;
      }
    }
  }
  changeAccessMode(i,e){
    let tr = this.refs.tab_container_body.getElementsByTagName("tr");
    let selected = [];
    for(var n=0;n<tr.length;n++){
      selected.push(tr[n].getElementsByTagName("select")[1].value);
    }
    console.log(selected);
    console.log(e.target.value)
    switch(e.target.value){
      case "HTTP":
        for(let j = 0;j<tr.length;j++){
          let m = selected[j];
          let no = m == "no"?'<option value = "no" selected="selected" >不可访问</option>':'<option value = "no">不可访问</option>';
          let accessMode = tr[j].getElementsByTagName("select")[1];
          let accessScope = tr[j].getElementsByTagName("select")[2];
          if(j!=i){
            accessMode.innerHTML = no;
          }
          let option = '<option value="outsisde">外部范围</option>'+
                        '<option value="inside">内部范围</option>';
          accessScope.innerHTML = option;
        }
        break;
      case "HTTPS":
        for(let j = 0;j<tr.length;j++){
          let m = selected[j];
          let no = m == "no"?'<option value = "no" selected="selected" >不可访问</option>':'<option value = "no">不可访问</option>';
          let accessMode = tr[j].getElementsByTagName("select")[1];
          let accessScope = tr[j].getElementsByTagName("select")[2];
          if(j!=i){
            accessMode.innerHTML = no;
          }
          let option = '<option value="outsisde">外部范围</option>';
          accessScope.innerHTML = option;
        }
        break;
      case "TCP":
        for(let j = 0;j<tr.length;j++){
          let m = selected[j];
          let http = m == "HTTP"?'<option value = "HTTP" selected="selected" >HTTP</option>':'<option value = "HTTP">HTTP</option>';
          let https = m == "HTTPS"?'<option value = "HTTPS" selected="selected" >HTTPS</option>':'<option value = "HTTPS">HTTPS</option>';
          let tcp = m == "TCP"?'<option value = "TCP" selected="selected" >TCP</option>':'<option value = "TCP">TCP</option>';
          let no = m == "no"?'<option value = "no" selected="selected" >不可访问</option>':'<option value = "no">不可访问</option>';
          let accessMode = tr[j].getElementsByTagName("select")[1];
          let accessScope = tr[j].getElementsByTagName("select")[2];
          let proptcol = tr[j].getElementsByTagName("select")[0];
          if(j!=i){
            accessMode.innerHTML = http+https+tcp+no;
            if(proptcol.value == "UDP"){
              accessMode.innerHTML = '<option value="UDP">UDP</option><option value="no" selected>不可访问</option>';
            }
          }
          let option = '<option value="outsisde">外部范围</option>'+
            '<option value="inside">内部范围</option>';
          accessScope.innerHTML = option;
        }
        break;
      default:
        for(let j = 0;j<tr.length;j++){
          let m = selected[j];
          let http = m == "HTTP"?'<option value = "HTTP" selected="selected" >HTTP</option>':'<option value = "HTTP">HTTP</option>';
          let https = m == "HTTPS"?'<option value = "HTTPS" selected="selected" >HTTPS</option>':'<option value = "HTTPS">HTTPS</option>';
          let tcp = m == "TCP"?'<option value = "TCP" selected="selected" >TCP</option>':'<option value = "TCP">TCP</option>';
          let no = m == "no"?'<option value = "no" selected="selected" >不可访问</option>':'<option value = "no">不可访问</option>';
          let accessMode = tr[j].getElementsByTagName("select")[1];
          let accessScope = tr[j].getElementsByTagName("select")[2];
          let proptcol = tr[j].getElementsByTagName("select")[0];
          if(j!=i){
            accessMode.innerHTML = http+https+tcp+no;
            if(proptcol.value == "UDP"){
              accessMode.innerHTML = '<option value="UDP">UDP</option><option value="no" selected>不可访问</option>';
            }
          }
          let option = '<option value="outsisde">外部范围</option>'+
            '<option value="inside">内部范围</option>';
          accessScope.innerHTML = option;
        }
        break;
    }

    let accessMode = tr[0].getElementsByTagName("select")[1];
    let certificate = this.props.certificateCon.certify_uuid;
    if (accessMode.value == "HTTPS"){
      if (certificate){
        console.log(11111111)
      }else {
        this.setState({
          port:true
        });
        this.refs.portTip.innerHTML = INPUT_TIP.port.Https;
      }
    }else {
      this.setState({
        port:false
      });
    }

  }
  getPortTableBody(){//端口
    let data = [],sd = this.props.serviceDetail;
    if(sd&&sd.container&&sd.container.length)
      data = this.props.serviceDetail.container;
    let tr = data.map((item , i) => {
      return(
        <tr key = {item.at+i}>
          <td>
            <div className={s.add}>
              <input type="text" ref="container_port"  onBlur={this.isPortRepeat.bind(this,i)} className="form-control form-control-sm" defaultValue={item.container_port}/>
              <input type="hidden" value={item.at} />
              <span className={cx(s.ok,"icon-right")} onClick = {this.focusVal.bind(this,i)}> </span>
              <span className={cx(s.del,"icon-delete")} onClick = {this.delVal.bind(this,i)}> </span>
            </div>
          </td>
          <td>
            <div className="astTdBox">
              <select className="form-control" ref = "protocol" defaultValue = {item.protocol}
                      onChange={this.changeProtocol.bind(this,i,item)}
              >
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
              </select>
            </div>
          </td>
          <td>
            <div className="astTdBox">
              {item.protocol == "UDP"?
                item.flag?
                  <select className="form-control" ref = "access_mode" defaultValue = {item.access_mode}
                          onChange = {this.changeAccessMode.bind(this,i)}
                  >
                    <option value="no">不可访问</option>
                  </select>
                  :
                  <select className="form-control" ref = "access_mode"  defaultValue = {item.access_mode}
                          onChange = {this.changeAccessMode.bind(this,i)}
                  >
                    <option value="UDP">UDP</option>
                    <option value="no">不可访问</option>
                  </select>
                :
                item.flag?
                  <select className="form-control" ref = "access_mode" defaultValue = {item.access_mode}
                          onChange = {this.changeAccessMode.bind(this,i)}
                  >
                    <option value="no">不可访问</option>
                  </select>
                  :
                  <select className="form-control" ref = "access_mode"  defaultValue = {item.access_mode}
                          onChange = {this.changeAccessMode.bind(this,i)}
                  >
                    <option value="HTTP">HTTP</option>
                    <option value="HTTPS">HTTPS</option>
                    <option value="TCP">TCP</option>
                    <option value="no" >不可访问</option>
                  </select>
              }
            </div>
          </td>
          <td>
            <div className="astTdBox">
              <select className="form-control" ref = "access_scope" defaultValue = {item.access_scope}>
                <option value="outsisde">外部范围</option>
                <option value="inside">内部范围</option>
              </select>
            </div>
          </td>
          <td>
            <a href="javascript:;" className={s.delBtn} onClick = {this.delPortTr.bind(this,i)}> </a>
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
    let ports = this.props.serviceDetail.container;
    let flag = false;//判断是否有http;
    let tr = this.refs.tab_container_body.getElementsByTagName("tr");
    for(var i=0;i<tr.length;i++){
      let container_port = tr[i].getElementsByTagName("input")[0].value;
      let protocol = tr[i].getElementsByTagName("select")[0].value;
      let access_mode = tr[i].getElementsByTagName("select")[1].value;
      let at = tr[i].getElementsByTagName("input")[1].value;
      let access_scope = tr[i].getElementsByTagName("select")[2].value;
      ports[i].container_port = container_port;
      ports[i].protocol = protocol;
      ports[i].access_mode = access_mode;
      ports[i].access_scope = access_scope;
      ports[i].at = at;
      if(ports[i].access_mode == "HTTP" || ports[i].access_mode == "HTTPS"){
        flag = true;
      }
    }
    if(flag){
      let obj = {
        at:new Date().getTime(),
        flag:true,
        protocol :"TCP",
        access_mode:"no",
      };
      ports.push(obj)
    }else{
      for(var n=0; n<ports.length;n++){
        ports[n].flag = false;
      }
      let obj = {
        at:new Date().getTime(),
        flag:false,
        protocol :"TCP",
        access_mode:"no",
      };
      ports.push(obj)
    }
    this.props.onAddPort(ports)
  }
  delPortTr(number){
    let ports = this.props.serviceDetail.container;
    let tr = this.refs.tab_container_body.getElementsByTagName("tr");
    let haveHTTP = false;//判断删除后 数组里还有没有http;
    let thisIsHTTP = false;//判断要删除的这个port是不是http;
    for(var i=0;i<tr.length;i++){
      let container_port = tr[i].getElementsByTagName("input")[0].value;
      let protocol = tr[i].getElementsByTagName("select")[0].value;
      let access_mode = tr[i].getElementsByTagName("select")[1].value;
      let at = tr[i].getElementsByTagName("input")[1].value;
      let access_scope = tr[i].getElementsByTagName("select")[2].value;
      ports[i].container_port = container_port;
      ports[i].protocol = protocol;
      ports[i].access_mode = access_mode;
      ports[i].access_scope = access_scope;
      ports[i].at = at;
      if(ports[i].access_mode == "HTTP" || ports[i].access_mode == "HTTPS" && i==number){
        thisIsHTTP = true;
      }
      if(ports[i].access_mode == "HTTP" || ports[i].access_mode == "HTTPS" && i!=number){
        haveHTTP =true;
      }

    }
    if(thisIsHTTP == true){
      if(ports.length !=1){//是不是最后一个port,最后一个不可删除;
        ports.splice(number,1);
        for(var j=0;j<ports.length;j++){//删除这个http后 把其他的制成可选择的;
          ports[j].flag = false;
        }
      }
    }else{
      if(haveHTTP){
        for(var m=0;m<ports.length;m++){
          if(ports[m].access_mode == "HTTP" || ports[m].access_mode == "HTTPS"){//把是http的制成可选择的
            ports[m].flag = false;
          }else {
            ports[m].flag = true;//把其他不是http的制成不可选择的
          }
        }
      }else{//如果剩下的port没有http把剩下的制成可选择的;
        for(var v=0;v<ports.length;v++){
            ports[v].flag = false;
        }
      }
      if(ports.length !=1){
        ports.splice(number,1);
      }
    }
    this.props.onDelPort(ports);
  }
  savePort(){
    let oldContainer = this.props.serviceDetail.container;
    let container = [];
    let containerTr = ReactDOM.findDOMNode(this.refs.tab_container_body).getElementsByTagName("tr");
    for(var i=0;i<containerTr.length;i++){
      let containerObj = {};
      let container_port = containerTr[i].getElementsByTagName("input")[0];
      if(container_port.value == ""){
        this.setState({
          port:true
        });
        container_port.className = "form-control form-control-sm inputError";
        container_port.focus();
        this.refs.portTip.innerHTML = INPUT_TIP.port.Null;
        return false;
      }
      containerObj.container_port = Number(container_port.value);
      containerObj.protocol = containerTr[i].getElementsByTagName("select")[0].value;
      containerObj.access_mode = containerTr[i].getElementsByTagName("select")[1].value == "no"?"":containerTr[i].getElementsByTagName("select")[1].value;
      containerObj.access_scope = containerTr[i].getElementsByTagName("select")[2].value;
      containerObj.domain = oldContainer[i].domain;
      containerObj.identify = oldContainer[i].identify;
      container.push(containerObj);
    }
    let data = {
      serviceUuid:this.props.serviceUuid,
      container:container
    };
    console.log(data,"+++++++")
    if(!this.state.port) {
      this.props.onSavePort(data);
    }
  }
  getSaveTableBody(){//存储
    let sd = this.props.serviceDetail;
    let volumeList = this.props.volumeList.volume_list||[];
    let volumeLength = volumeList.length;
    if(sd&&sd.volume&&sd.volume.length);
    let data = this.props.serviceDetail.volume;
    let tr = data.map((item,i) => {
      let options = volumeList.map((obj,i) => {
        if(item.volume_uuid == obj.volume_uuid || obj.volume_status == "unused"  ) {
          return (
            <option key={i} value={obj.volume_uuid}>{obj.volume_name} </option>
          )
        }else{
          return false
        }
      });
      return (
        <tr key = {item.at+i}>
          <td>
            <div className="astTdBox">
              <select className="form-control" ref = "volumnName" defaultValue={item.volume_uuid}
                onChange={this.isSaveRepeat.bind(this,i)}
                      key = {"volume"+volumeLength+i}
              >
                <option value = "-1">请选择数据卷</option>
                {options}
              </select>
            </div>
          </td>
          <td>
            <div className="astTdBox">
              <input type = "text" className = "form-control" ref = "container_path" defaultValue={item.disk_path}
                onBlur={this.isPathValidata.bind(this,i)}
              />
            </div>
          </td>
          <td>
            <label>
              <input type="checkbox" defaultChecked={item.readonly == "True"} /> 是否只读
            </label>
          </td>
          <td>
            <a href="javascript:;" className={s.delBtn} onClick = {this.delSaveTr.bind(this,item.at)}> </a>
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
    this.setState({
      volume:false
    });
    this.props.onDelSave(item)
  }
  saveStorage(){
    let save = [];
    let saveTr = ReactDOM.findDOMNode(this.refs.tab_storage_body).children;
    for(let i = 0;i<saveTr.length;i++){
      let saveObj = {};
      let disk_name = saveTr[i].getElementsByTagName("select")[0];
      let disk_path = saveTr[i].getElementsByTagName("input")[0];
      let readonly = saveTr[i].getElementsByTagName("input")[1].checked ? "True" : "False";
      if(disk_name.value!=-1 && disk_path.value == ""){
        this.setState({
          volume:true
        });
        disk_path.className = "form-control inputError";
        this.refs.volumeTip.innerHTML = INPUT_TIP.volumes.Null;
        disk_path.focus();
        return false;
      }
      if(disk_name.value ==-1){

      }else {
        saveObj.volume_uuid = disk_name.value;
        saveObj.disk_path = disk_path.value;
        saveObj.readonly = readonly;
        save.push(saveObj);
      }
    }
    let data = {
      serviceUuid:this.props.serviceUuid,
      volume :save,
    };
    console.log(data);
    if(!this.state.volume) {
      this.props.onSaveVolume(data);
    }
  }
  getEnvironment(){
    let data = [],sd = this.props.serviceDetail;
    if(sd&&sd.env&&sd.env.length)
      data = this.props.serviceDetail.env;
    let keyBox = data.map((item,i) => {
      return (
        <div key = {item.at} className = {s.env}>
          <div className={s.envKey}>
            <input type = "text" className = "form-control" onBlur={this.isEnvKeyRepeat.bind(this,i)} placeholder = "键" defaultValue={item.env_key} />
          </div>
          <div className={s.envLine}></div>
          <div className={s.envValue}>
            <input type = "text" className = "form-control" onBlur={this.isEnvValue.bind(this)} placeholder = "值" defaultValue={item.env_value} />
          </div>
          <div className = {s.delBox}>
            <a href="javascript:;" className={s.delBtn} onClick = {this.delEnvironmentData.bind(this,item.at)}> </a>
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
      let env_key = envTr[i].getElementsByTagName("input")[0];
      let env_value = envTr[i].getElementsByTagName("input")[1];
      if(env_key.value && env_value.value==""){
        this.setState({
          env:true
        });
        this.refs.envTip.innerHTML = INPUT_TIP.env.Null;
        env_value.className = "form-control inputError";
        env_value.focus();
        return false;
      }
      envObj.env_key = env_key.value;
      envObj.env_value = env_value.value;
      env.push(envObj);
    }
    let data = {
      serviceUuid:this.props.serviceUuid,
      env :env,
    };
    this.props.onSaveEnvironment(data);
  }
  saveCommand(){
    let txt = this.refs.command.value;
    console.log(txt);
    let data = {
      command:txt,
      serviceUuid:this.props.serviceUuid,
    };
    this.props.onSaveCommand(data);
  }
  modifyDescribe(){
    let txt = this.refs.certificateT.value;
    console.log(txt);
    let data = {
      description:txt,
      serviceUuid:this.props.serviceUuid,
    };
    if (!this.state.isCon){
      this.props.onModifyDescribe(data);
    }
  }
  onChangeAutoStartUp(){
    console.log(!this.state.isStateUp?1:0);
    this.setState({
      isStateUp:!this.state.isStateUp?1:0
    });
    let data = {
      serviceUuid:this.props.serviceUuid,
      auto_startup:!this.state.isStateUp?1:0
    };
    this.props.onAutoStateUp(data);
  }
  onServiceDescribeChange(e){
    let serviceName = ReactDOM.findDOMNode(this.refs.describeCon),
      serviceTip = ReactDOM.findDOMNode(this.refs.describeChangeTip);
    let value = e.target.value.trim();
    if (value.length >= 50){
      serviceTip.innerHTML = INPUT_TIP.describe.Format
      this.setState({
        isCon:true
      })
    }else {
      serviceTip.innerHTML = '';
      this.setState({
        isCon:false
      })
    }
  }
  componentWillUnmount(){
    this.context.store.dispatch(clearDeployData());
  }
  componentDidMount(){}

  render(){
    let data = this.props.serviceDetail;
    let volumeList = this.props.volumeList.volume_list||[];
    let cpuNumber = 0;
    CPU.map((item,i) =>{
      if(item.x == data.cm_format){
        cpuNumber = i
      }
    });
    let n = 0;
    volumeList.map((item) => {
      if(item.volume_status == "unused"){
        n++
      }
    });
    let volumeLength = n == 0 ?
                        "暂时没有数据卷":
                        `目前有${n}个数据卷`;
    return(
      <div className={s.box}>
        <div className={s.item}>
          <HeadLine
            title="端口"
            titleEnglish="PORT"
            titleInfo="容器端口会映射到主机端口上"
          />
          <div className={cx(s.bd,"tableBox")}>
            {this.getPortTable()}
          </div>
          <div className={s.ft}>
            {/*<button className="btn btn-default"
             onClick = {this.addPortTr.bind(this)}
             >添加</button>*/}
            <button className={`btn btn-primary ${!this.props.isBtnState.port?"btn-loading":""}`}
            disabled={!this.props.isBtnState.port}
            onClick = {this.savePort.bind(this)}>保存</button>
            <span className={this.state.port?cx(s.tip,s.show):s.tip} ref = "portTip">

            </span>
          </div>
        </div>
        <div className={s.item}>
          <HeadLine
            title="存储设置"
            titleEnglish="SAVE SETTING"
            titleInfo={volumeLength}
          />
          <div className={cx(s.bd,"tableBox")} ref = "tab_save_box">
            {this.getSaveTable()}
          </div>
          <div className={s.ft}>
            <button className="btn btn-default" onClick = {this.addSaveTr.bind(this)}>添加</button>
            <button className={`btn btn-primary ${!this.props.isBtnState.storage?"btn-loading":""}`}
                    disabled={!this.props.isBtnState.storage}
                    onClick = {this.saveStorage.bind(this)}
            >保存</button>
            <span className={this.state.volume?cx(s.tip,s.show):s.tip} ref = "volumeTip">

            </span>
          </div>
        </div>
        <div className={s.item}>
          <HeadLine
            title="环境变量"
            titleEnglish="ENVIRONMENT VARIABLE"
            titleInfo=""
          />
          <div className={s.bd}  ref = "tab_env_box">
            {this.getEnvironment()}
          </div>
          <div className={s.ft}>
            <button className="btn btn-default" onClick = {this.addEnvironmentData.bind(this)}>添加</button>
            <button className={`btn btn-primary ${!this.props.isBtnState.env?"btn-loading":""}`}
                    disabled={!this.props.isBtnState.env}
                    onClick = {this.saveEnvironment.bind(this)}
            >保存</button>
            <span className={this.state.env?cx(s.tip,s.show):s.tip} ref = "envTip">

            </span>
          </div>
        </div>
        <div className={s.item}>
          <HeadLine
            title="容器配置"
            titleEnglish="CONTAINER CONFIGURATION"
            titleInfo="容器配置说明"
          />
          <div className={cx(s.bd,s.bdP)}>
            <ContainerBox
              number = {cpuNumber}
              detail = {true}
              key = {new Date().getTime()}
            />
            <ChooseContainerBtn
              number={cpuNumber}
              serviceUuid = {this.props.serviceUuid}
              onSaveContainerDeploy={(data,my) => {this.props.onSaveContainerDeploy(data,my)}}
              isBtnState={this.props.isBtnState}
            />
          </div>
        </div>
        <div className={s.item}>
          <HeadLine
            title="启动命令"
            titleEnglish="COMMAND"
            titleInfo="启动命令解释说明 "
          />
          <div className={cx(s.bd,s.bdP)}>
            <input className = "form-control"
                   type="text"
                   placeholder=""
                   ref = "command"
                   defaultValue={data.command}
            />
          </div>
          <div className={s.ft}>
            <button className={`btn btn-default ${!this.props.isBtnState.command?"btn-loading":""}`}
                    disabled={!this.props.isBtnState.command}
                    onClick = {this.saveCommand.bind(this)}
            >保存</button>
          </div>
        </div>
        <div className={s.item}>
          <HeadLine
            title="服务描述"
            titleEnglish="CERTIFICATE"
            titleInfo="对服务的描述 "
          />
          <div className={cx(s.bd,s.bdP)}>
            <textarea className = "form-control"
                   type="text"
                   placeholder=""
                   ref = "certificateT"
                   defaultValue={data.description}
                   onInput = {this.onServiceDescribeChange.bind(this)}
            />
            <span className={s.cerTip} ref="describeChangeTip"> </span>
          </div>
          <div className={s.ft}>
            <button className={`btn btn-default ${!this.props.isBtnState.describe?"btn-loading":""}`}
                    disabled={!this.props.isBtnState.describe}
                    onClick = {this.modifyDescribe.bind(this)}
            >保存</button>
          </div>
        </div>
        {/*<div className={s.item}>*/}
          {/*<HeadLine*/}
            {/*title="自动启动"*/}
            {/*titleEnglish="AUTO START UP"*/}
            {/*titleInfo="自动启动设置"*/}
          {/*/>*/}
          {/*<div className={cx(s.bd,s.bdP)}>*/}
            {/*<Toggle*/}
              {/*defaultChecked = {this.state.isStateUp==1}*/}
              {/*onChange = {this.onChangeAutoStartUp.bind(this)}*/}
            {/*/>*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default widthstyle(s)(GetDisposedTabs);

