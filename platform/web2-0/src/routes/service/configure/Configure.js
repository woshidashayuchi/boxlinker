
import React, { PropTypes,Component } from 'react';
import ServiceStep from '../../../components/ServiceStep';
import HeadLine from '../../../components/HeadLine';
import ContainerBox from '../../../components/ContainerBox';
import InputRange from 'react-input-range';
import Toggle from '../../../components/Toggle';
import {DropdownButton,MenuItem} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {INPUT_TIP} from '../../../constants/index';
import Link from '../../../components/Link';
import Loading from "../../../components/Loading";
import {BREADCRUMB} from "../../../constants";
import {navigate} from '../../../actions/route';
import {receiveNotification,clearNotification} from '../../../actions/notification';
import s from "./Configure.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import * as Const from '../../../constants';
import cx from "classnames";


class InputRangesBox extends Component {//input滑块
  static propTypes={
    number: React.PropTypes.number,
    getCosts:React.PropTypes.func,
    getX:React.PropTypes.func

  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.number
    };
  }
  handleValueChange(component,value) {
    this.setState({
      value: value,
    });
    let x = this.props.getX();
    let data = {
      resource_type:"app",
      resource_conf:value*x+"x",
      resource_status:"on",
      hours:1
    };
    this.props.getCosts(data);
  }
  getValue(){
    return this.state.value;
  }

  render() {
    return (
      <div className={s.range}>
        <InputRange
          className="formField"
          maxValue={10}
          minValue={1}
          labelSuffix="个"
          value={this.state.value}
          onChange={this.handleValueChange.bind(this)}
        />
      </div>
    );
  }
}

class Configure extends Component{
  static contextTypes = {
    store:PropTypes.object
  };
  static propTypes = {
    deployData:React.PropTypes.object,
    deployContainer:React.PropTypes.func,
    setBreadcrumb:React.PropTypes.func,
    onGoToService:React.PropTypes.func,
    isSidebarOpen:React.PropTypes.bool,
    imageDetail:React.PropTypes.object,
    getImageDetail:React.PropTypes.func,
    costs:React.PropTypes.number,
    getCosts:React.PropTypes.func,
    repeatName:React.PropTypes.object,
    onRepeatServiceName:React.PropTypes.func
  };
  constructor(props){
    super(props);
    this.state = {
      containerDeploy:0,
      policy:1,//1 是   0   否
      isServiceName:false,
      isDescribe:false,
      imageId:null,
      tag:""
    };
  }
  componentWillReceiveProps(props){
    if(props.repeatName.serviceName){
      this.setState({
        isServiceName:true
      });
      this.refs.serviceNameTip.innerHTML = Const.INPUT_TIP.service.Repeat;
    }
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.CREATE_SERVICE,BREADCRUMB.CONFIG_CONTAINER);
    let my = this;
    let data = {
      resource_type:"app",
      resource_conf:"1x",
      resource_status:"on",
      hours:1
    };
    this.props.getCosts(data);
    if(!my.props.deployData.image_uuid){
      my.context.store.dispatch(receiveNotification({message:"请先选择要部署的镜像",level:"danger"}));
      my.context.store.dispatch(navigate("/chooseImage"));
      setTimeout(function(){
        my.context.store.dispatch(clearNotification())
      },3000);
    }else{
      this.props.getImageDetail(this.props.deployData.image_uuid);//image_uuid 是为了获取镜像详情,image_id 实际上是tagid
    }
  }

  onServiceNameChange(){
    let serviceName = ReactDOM.findDOMNode(this.refs.serviceName),
      serviceTip = ReactDOM.findDOMNode(this.refs.serviceNameTip),
      regExp = Const.REGEXP_NAME;
    if(!regExp.test(serviceName.value) && serviceName.value != ""){
      this.setState({
        isServiceName:true
      });
      serviceTip.innerHTML = INPUT_TIP.service.Format
    }else{
      serviceTip.innerHTML = "";
      this.setState({
        isServiceName:false
      })
    }
  }
  onRepeatServiceName(e){
    let value = e.target.value.trim();
    if(value.length>=5){
      this.props.onRepeatServiceName(value);
    }
  }
  onServiceDescribeChange(e){
    let serviceName = ReactDOM.findDOMNode(this.refs.describeCon),
      serviceTip = ReactDOM.findDOMNode(this.refs.describeChangeTip);
    let value = e.target.value.trim();
    if (value.length >= 50){
      this.setState({
        isDescribe:true
      });
      serviceTip.innerHTML = INPUT_TIP.describe.Format
    }else {
      serviceTip.innerHTML = '';
      this.setState({
        isDescribe:false
      })
    }
  }
  onNextStep(){
    let serviceName = this.refs.serviceName,
        serviceTip = this.refs.serviceNameTip,
        describeCon = this.refs.describeCon;
    if(serviceName.value.trim() == ""){
      this.setState({
        isServiceName:true
      });
      serviceName.focus();
      serviceTip.innerHTML = INPUT_TIP.service.Null;
      return false;
    }
    if(!this.state.isServiceName&&!this.state.isDescribe) {
      let image_id = this.state.imageId?this.state.imageId:this.props.imageDetail.tags[0].tagid;
      let n = this.refs.configure.getValue();//代表的是容器配置选的是第几个
      let data = {
        image_id:image_id,//image_id 实际上是tagid
        service_name:serviceName.value.trim(),
        container_cpu : Const.CPU[n].cpu,
        container_memory : Const.CPU[n].m,
        cm_format : Const.CPU[n].x,
        pods_num:this.refs.pod_num.getValue(),
        policy:this.state.policy,
        description:describeCon.value.trim()
      };
      console.log(data)
      this.props.deployContainer(data);
      this.props.onGoToService();
    }
  }

  changeVersion(key){
    this.defaultTag = this.tags.map((item,i)=>{
      if(item.tagid == key){
        return item.tag
      }
    });
    this.setState({
      imageId:key,
      tag:this.defaultTag
    })
  }
  onChangePolicy(policy){
    let flag = !policy
    this.setState({
      policy:flag?1:0
    })
  }
  getPodNum(){
    return this.refs.pod_num.getValue();
  }
  getX(){
    return this.refs.configure.getX();
  }
  render(){
    let data = this.props.deployData;
    if(!this.props.imageDetail){ return (<div style = {{textAlign:"center"}}><Loading /></div>)}
    let tags = this.props.imageDetail.tags||[];
    let tagsFirst = tags[0]||{};
    this.defaultTag = this.state.tag?this.state.tag:tagsFirst.tag||"";
    this.tags = tags;
    let option = [];
    if(!tags||!tags.length){

    }else {
      tags.map((item,i) => {
        option.push(<MenuItem eventKey={item.tagid} key = {i}>{item.tag}</MenuItem>)
      });
    }
    return(
      <div className="containerBgF">
        <div className = {s.box}>
          <ServiceStep dataActive = "second"/>
          <div className = {s.hd}>
            <div className={s.item}>
              <HeadLine
                title="服务名称"
                titleEnglish="SERVICE NAME"
                titleInfo="小写字母数字下划线组合,开头必须为字母"
              />
              <div className={`${s.bd} ${this.state.isServiceName?"has-error":""}`}>
                <input
                  className = "form-control"
                  ref="serviceName"
                  type="text"
                  placeholder=""
                  defaultValue = {data.service_name}
                  onInput = {this.onServiceNameChange.bind(this)}
                  onBlur={this.onRepeatServiceName.bind(this)}
                />
                <span className = {s.tip} ref = "serviceNameTip" > </span>
              </div>
            </div>
            <div className={s.item}>
              <HeadLine
                title="服务描述"
                titleEnglish="SERVICE DESCRIBE"
                titleInfo="写下对你自己创建服务的描述"
              />
              <div className={`${s.bd} ${this.state.isDescribe?"has-error":""}`}>
                <textarea
                  className = "form-control"
                  ref="describeCon"
                  type="text"
                  placeholder="请输入50字以内"
                  onInput = {this.onServiceDescribeChange.bind(this)}
                />
                <span className = {s.tip} ref = "describeChangeTip" > </span>
              </div>
            </div>
            <div className = {s.item}>
              <HeadLine
                title = "镜像名称"
                titleEnglish = "IMAGE NAME"
                titleInfo = "服务是基于镜像生成的"
              />
              <div className = {s.bd}>
                <p>{data.image_name}</p>
              </div>
            </div>
            <div className = {s.item}>
              <HeadLine
                title = "镜像版本"
                titleEnglish = "MIRROR VERSION"
                titleInfo = "可以选择镜像的不同版本"
              />
              <div className={s.bd}>
                <DropdownButton title = {this.defaultTag} id = "image_version"
                  onSelect = {this.changeVersion.bind(this)}
                                ref = "version"
                >
                  {option}
                </DropdownButton>
                {/*<select className="form-control" ref="imageVersion" defaultValue={data.image_version}>*/}
                  {/*{option}*/}
                {/*</select>*/}
              </div>
            </div>
            <div className={s.item}>
              <HeadLine
                title="容器配置"
                titleEnglish="CONTAINER CONFIGURATION"
                titleInfo="收费用户可选择更多的配置"
              />
              <div className={s.bd}>
                <ContainerBox ref = "configure"
                              number = {data.containerDeploy}
                              getCosts = {(data) =>{this.props.getCosts(data)}}
                              getPodNum = {this.getPodNum.bind(this)}
                />
              </div>
            </div>
            <div className={s.item}>
              <HeadLine
                title="容器个数"
                titleEnglish="CONTAINER NUMBER"
                titleInfo="指定负载的个数"
              />
              <div className={s.bd}>
                <InputRangesBox ref = "pod_num"
                                number = {data.pods_num}
                                getCosts={(data)=>{this.props.getCosts(data)}}
                                getX = {this.getX.bind(this)}
                />
              </div>
            </div>
            <div className={s.item}>
              <HeadLine
                title="自动更新设置"
                titleEnglish="AUTO UPDATE SETTINGS"
                titleInfo="当镜像有更新时容器是否自动更新"
              />
              <div className={s.bd}>
                <Toggle
                  defaultChecked = {data.policy ==1}
                  onChange = {this.onChangePolicy.bind(this,this.state.policy)}
                />
              </div>

            </div>
            <div className={s.fixed}>
              <div style = {{"marginLeft":this.props.isSidebarOpen?"209px":"79px"}}>
                <Link className="btn btn-primary" to={`/chooseImage`}>上一步</Link>
                <button className="btn btn-primary" onClick={this.onNextStep.bind(this)}>下一步</button>
                <p className="costs">费用:<span>¥{this.props.costs.toFixed(4)}</span>/1小时</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default widthstyle(s)(Configure);
