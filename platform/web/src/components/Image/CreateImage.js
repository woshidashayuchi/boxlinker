
import React, { PropTypes,Component } from 'react';
import HeadLine from '../../components/HeadLine';
import ReactDOM from 'react-dom';
import Toggle from '../Toggle';
import {BREADCRUMB,INPUT_TIP} from "../../constants";

class IsPublicToggle extends  Component{
  static propTypes={
    getToggle:React.PropTypes.func,
    state:React.PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      autoStart:this.props.state
    };
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
        defaultChecked={this.state.autoStart}
        onChange={this.handClick.bind(this)}
      />
    )
  }
}


class CreateImage extends React.Component{
  constructor(){
    super();
    this.state = {
      isImageName:false,
      isPublic:1
    }
  }
  static contextTypes = {
    setTitle: React.PropTypes.func,
    store: React.PropTypes.object,
    setBreadcrumb:React.PropTypes.func
  };
  static propTypes = {
    isBtnState:React.PropTypes.object,
    onCreateImage:React.PropTypes.func
  };
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.CREATE_IMAGE);

  }
  onImageNameChange(){
    let imageName = ReactDOM.findDOMNode(this.refs.repository),
      imageTip = ReactDOM.findDOMNode(this.refs.image_name_tip),
      regExp = /^[a-z]+[a-z0-9_-]*$/;
    if(!regExp.test(imageName.value) && imageName.value != ""){
      this.setState({
        isImageName:true
      });
      imageTip.innerHTML = INPUT_TIP.image.Format
    }else{
      this.setState({
        isImageName:false
      })
    }
  }
  building(){
    let imageName = ReactDOM.findDOMNode(this.refs.repository),
      imageTip = ReactDOM.findDOMNode(this.refs.image_name_tip);
    if(imageName.value == ""){
      this.setState({
        isImageName:true
      });
      imageName.focus();
      imageTip.innerHTML = INPUT_TIP.image.Null;
      return false;
    }
    if(!this.state.isImageName) {
      let repository = ReactDOM.findDOMNode(this.refs.repository).value,
        detail = ReactDOM.findDOMNode(this.refs.image_detail).value,
        short_description = ReactDOM.findDOMNode(this.refs.short_description).value,
        isPublic = String(this.state.isPublic);
      let data = {
        is_public:isPublic,
        short_description:short_description,
        detail:detail,
        repository:repository,
        is_code:"0"
      };
      this.props.onCreateImage(data)
    }
  }
  getToggleValue(value){
    let flag = !value ? 1 : 0;//1 true  0 false
    this.setState({
      isPublic:flag
    })
  }
  render(){
    this.context.setTitle('新建镜像');
    return (
      <div className="containerBgF">
        <div className="acBox">
          <h1>新建镜像</h1>
          <p>镜像是服务运行的模板, 来源于代码, 基于 Dockerfile 构建, 默认目录在根'/'下, 文件名 Dockerfile .</p>
          <div className="assItem">
            <HeadLine
              title="镜像名称"
              titleEnglish="IMAGE NAME"
              titleInfo="默认会与您下方代码源的项目名称相同"
            />
            <div className={`assBox ${this.state.isImageName?"has-error":""}`}>
              <input
                type="text"
                placeholder=""
                className="form-control"
                ref = "repository"
                onChange={this.onImageNameChange.bind(this)}
              />
              <span className="inputTip" ref = "image_name_tip">镜像名称不能为空</span>
            </div>
          </div>
          <div className="assItem">
            <HeadLine
              title="镜像简介"
              titleEnglish="IMAGE SUMMARY"
              titleInfo="简单介绍镜像的信息"
            />
            <div className="assBox">
              <textarea
                placeholder="镜像简介"
                className="form-control"
                defaultValue=""
                ref = 'image_detail'
              />
            </div>
          </div>
          <div className="assItem">
            <HeadLine
              title="详细描述"
              titleEnglish="IMAGE DETAIL"
              titleInfo="详细介绍镜像的信息"
            />
            <div className="assBox">
              <textarea
                placeholder="详细描述"
                className="form-control"
                defaultValue=""
                ref = 'short_description'
              />
            </div>
          </div>
          <div className="assItem">
            <HeadLine
              title="是否公开"
              titleEnglish="IS PUBLIC"
              titleInfo="公开后都可以访问"
            />
            <div className="assBox">
              <IsPublicToggle state = {true} getToggle = {this.getToggleValue.bind(this)} />
            </div>
          </div>
          <div className="assItem">
            <div className="acBtn">
              <button className="btn btn-primary"
                      onClick = {this.building.bind(this)}
                      disabled={!this.props.isBtnState.building}>
                      {this.props.isBtnState.building?"新建":"新建中..."}
                </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateImage;
