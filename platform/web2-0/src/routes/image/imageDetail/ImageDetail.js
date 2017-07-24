
import React, { PropTypes,Component } from 'react';
import {BREADCRUMB} from "../../../constants";
import {timeRange} from '../../../core/utils';
import {Tabs,Tab,Button,Modal,FormControl,SplitButton,MenuItem} from 'react-bootstrap';
import Toggle from '../../../components/Toggle';
import Confirm from '../../../components/Confirm';
import Loading from '../../../components/Loading';
import HeadLine from '../../../components/HeadLine';
import {navigate} from '../../../actions/route';
import ReactMarkdown from 'react-markdown';
import {receiveImageDelete} from '../../../actions/imageList';
import Upload from "../../../components/Upload";
import s from "./ImageDetail.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class ImageDetail extends Component{
  static contextTypes = {
    store:PropTypes.object,
  };

  static propTypes = {
    setBreadcrumb:React.PropTypes.func,
    imageDetail:React.PropTypes.object,
    getImageDetail:React.PropTypes.func,
    onDeleteImage:React.PropTypes.func,
    goToConfigContainer:React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    setImageDetail:React.PropTypes.func,
    clearImageDetail:React.PropTypes.func,
    modalState:React.PropTypes.object,
    token:React.PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isPublic:1,
      delData:{
        id:null
      },
      tag:""
    };
  }
  showModal(item) {
    let repository = this.props.imageDetail.repository;
    this.setState({
      tag:`docker pull index.boxlinker.com/${repository}${item.tag}`
    });
    this.setState({show: true});
  }
  hideModal() {
    this.setState({show: false});
  }

  componentDidMount(){
    let uuid = this.props.uuid;
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.IMAGE_DETAIL);
    this.props.getImageDetail(uuid);
    this.uploadData = {
      type:"ImageAvatars",
      id:uuid
    };
  }
  componentWillUnmount(){
    this.props.clearImageDetail();
  }
  deployImage(ImageName){
    let obj = {
      image_name :`index.boxlinker.com/${ImageName}`,
      image_uuid:this.props.uuid
    };
    this.props.goToConfigContainer(obj);
  }
  selectImage(name,uuid,key){
    switch (key){
      case "1":
        this.context.store.dispatch(navigate(`/reviseImage/${this.props.uuid}`));
      break;
      case "2":
        this.setState({
          delData:{
            name:name,
            keyList:"myList"
          }
        });
        this.refs.confirmModal.open();
      break;
    }
  }
  deleteImage(){
    this.setState({
      delData:{
        id:this.props.uuid,
        key:"detail"
      }
    });
    this.context.store.dispatch(receiveImageDelete(true));
  }
  deleteImageHide(){
    this.context.store.dispatch(receiveImageDelete(false));
  }
  getLines(){
    let data = this.props.imageDetail;
    let tags = data.tags ||[];
    if(!tags.length) return <tr><td colSpan = "3">暂无数据~</td></tr>;
    return tags.map((item,i) => {
      return (
        <tr key = {i}>
          <td>{data.repository}</td>
          <td>{item.tag}</td>
          <td>
            <SplitButton
              onClick = {this.deployImage.bind(this,data.repository)}
              bsStyle="primary" title="部署" id={`building-table-line-${i}`}>
              <MenuItem eventKey="1" onClick = {this.showModal.bind(this,item)}>拉取</MenuItem>
            </SplitButton>
          </td>
        </tr>
      )
    });
  }
  getVersion(){
    return (
      <div className="tableBox tableBox-center">
        <div className={s.table}>
          <table className="table table-hover table-bordered">
            <thead>
            <tr>
              <th width = "33%">镜像名称</th>
              <th width = "33%">版本</th>
              <th width = "34%">操作</th>
            </tr>
            </thead>
            <tbody>
            {this.getLines()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  copyCode(){
    this.refs.copyInput.select();
    document.execCommand("Copy");
  }
  changePublic(obj){
    console.log(obj);
    let flag = !obj.is_public ? 1 : 0;
    this.setState({
      isPublic:flag
    });
    let isPublic = String(flag);
    let data = {
      id:this.props.uuid,
      type:'is_public',
      detail:isPublic,
    };
    console.log(data);
    this.props.setImageDetail(data);
  }
  updateImage(){
    let uuid = this.props.uuid;
    this.props.getImageDetail(uuid);
  }
  render(){
    let data = this.props.imageDetail;
    if(!data.repository) return <div className="text-center"><Loading /></div>;
    let team_uuid = this.props.token.team_uuid;
    let isMy = team_uuid == data.team_uuid;
    console.log(isMy,"isMy")
    return (
      <div className="containerBgF" key = {data.is_public}>
        <div className={s.head}>
          <div className={s.image}>
            <img src = {data.logo} />
          </div>
          <div className={s.right}>
            <div className={s.hd}>
              <div className={s.hdItem}>
                <span>镜像名称 :</span><span className="clLink">{data.repository}</span>
              </div>
              <div className={s.hdItem}>
                <span>最近部署时间 :</span><span className="cl9">{timeRange(new Date(data.update_time))}</span>
              </div>
              <div className={s.hdItem}>
                <button className="btn btn-primary"
                        onClick = {this.deployImage.bind(this,data.repository,data.uuid)}
                        id={`building-table-line`}>
                  部署最新版本
                </button>
              </div>
            </div>
            <div className={s.bd}>
              <div className={s.bdItem}>
                <span className={s.bdLeft}>镜像地址:</span>
                <span className="cl6">{`http://index.boxlinker.com/${data.repository}`}</span>
              </div>
              <div className={s.bdItem}>
                <span className={s.bdLeft}>拉取命令:</span>
                <span className="cl6">{`docker pull index.boxlinker.com/${data.repository}`}</span>
              </div>
              {
                isMy?
                  <div className={s.bdItem}>
                    <span className={s.bdLeft}>是否公开:</span>
                    <span>
                        <Toggle
                          disabled={!this.props.isBtnState.building}
                          defaultChecked = {data.is_public == 1}
                          onChange = {this.changePublic.bind(this,data)}
                        />
                    </span>
                  </div>
                :null
              }
            </div>
          </div>
        </div>
        <div className={s.main}>
          <Tabs defaultActiveKey={1} id="imageDetail" className = "tabIcon">
            <Tab eventKey={1} title="概览">
              <div className="idTableBox">
                {isMy?<div className = {s.mainItem}>
                  <Upload
                    url = {data.logo}
                    data = {this.uploadData}
                    txt = {["镜像LOGO","IMAGE LOGO"]}
                    isChange={true}
                    callback = {this.updateImage.bind(this)}
                  />
                </div>:null}
                <ReviseShortDescription
                  title = "镜像简介"
                  titleEnglish = "IMAGE SUMMARY"
                  titleInfo = "简单介绍镜像的信息"
                  txt = {data.short_description}
                  func={(data,fn) => {this.props.setImageDetail(data,fn)}}
                  data = {{id:this.props.uuid,type:"short_description"}}
                  auth = {isMy}
                />
                <ReviseDetail
                  title = "镜像详情"
                  titleEnglish = "IMAGE DETAIL"
                  titleInfo = "镜像的详细作用描述"
                  txt = {data.detail||""}
                  func={(data,fn) => {this.props.setImageDetail(data,fn)}}
                  data = {{id:this.props.uuid,type:"detail"}}
                  auth = {isMy}
                />
              </div>
            </Tab>
            <Tab eventKey={2} title="版本">
              <div className="idTableBox">
                {this.getVersion()}
                <Modal {...this.props} show={this.state.show} onHide={this.hideModal.bind(this)}  bsSize="sm" aria-labelledby="contained-modal-title-sm">
                  <div className="modal-header">
                    <button type="button" className="close" aria-label="Close" onClick={this.hideModal.bind(this)}><span aria-hidden="true">×</span></button>
                    <h4 className="modal-title" id="contained-modal-title-sm">拉取版本: latest扩容</h4>
                  </div>
                  <div className="modal-body">
                    <div className={s.modal}>
                      <p className={s.modalP1}>拉取命令:</p>
                      <input className="form-control"
                        ref = "copyInput"
                        defaultValue={this.state.tag}
                      />
                      <p className={s.modalP2}>拉取镜像前请先登录: docker login boxlinker.com</p>
                      <div className={cx(s.midalBtn,"text-center")}>
                        <button className="btn btn-primary" onClick={this.copyCode.bind(this)}>复制</button>
                        <button className="btn btn-default" onClick={this.hideModal.bind(this)}>取消</button>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </Tab>
            { isMy ? <Tab eventKey={3} title="操作">
              <div className={s.delBox}>
                <button className="btn btn-danger" onClick={this.deleteImage.bind(this)}>删除镜像</button>
                <p>*删除镜像将清除该镜像的所有数据，且该操作不能被恢复，请慎重选择！ </p>
              </div>
            </Tab>:null
            }
          </Tabs>
        </div>
        <Confirm
          key = {this.state.delData.id}
          isShow={this.props.modalState.imageDelete}
          onHide={() =>{this.deleteImageHide()}}
          title = "警告"
          text = "确定要删除此镜像吗?"
          func = {() =>{this.props.onDeleteImage(this.state.delData)}}
          ref = "confirmModal"
        />
      </div>
    )
  }
}
class ReviseShortDescription extends Component{
  static propTypes = {
    title:React.PropTypes.string,
    titleEnglish:React.PropTypes.string,
    titleInfo:React.PropTypes.string,
    txt:React.PropTypes.string,
    func:React.PropTypes.func,
    auth:React.PropTypes.bool,
    data:React.PropTypes.object
  };
  constructor(){
    super();
    this.state = {
      show:false
    }
  }
  show(){
    this.setState({
      show:!this.state.show
    });
  }
  hide(){
    this.setState({
      show:false
    })
  }
  isOk(){
    let data = this.props.data;
    data.detail = this.refs.detail.value;
    console.log(data);
    let my = this;
    this.props.func(data,my);
  }
  componentDidMount(){
    this.editor = null;
  }
  render(){
    return (
      <div className={cx(s.mainItem,s.mainItemL)}>
        <div className={s.mainItemHd}>
          <HeadLine
            title={this.props.title}
            titleEnglish={this.props.titleEnglish}
            titleInfo={this.props.titleInfo}
          />
          {
            this.props.auth?
              <div className={s.bj}><button className="btn btn-link ion-compose" onClick={this.show.bind(this)} title = "编辑"> </button></div>
              :
              null
          }
        </div>
        <div className={s.mainItemBd}>
          <div className={s.pad25}>
            {
              this.state.show?
                <div className={s.textareaBox}>
                  <div ref = "editor" className="littleEditor">
                    <textarea className="form-control" ref="detail" defaultValue={this.props.txt}/>
                    <div className={s.btnBox} id = "btnBox">
                      <button className="btn btn-primary" onClick={this.isOk.bind(this)}>确定</button>
                      <button className="btn btn-default" onClick={this.hide.bind(this)}>取消</button>
                    </div>
                  </div>
                </div>
                :
                <div>
                  <div className="reviseTxt">
                    {this.props.txt}
                  </div>
                </div>
            }
          </div>
        </div>
      </div>

    )
  }
}
class ReviseDetail extends Component{
  static propTypes = {
    title:React.PropTypes.string,
    titleEnglish:React.PropTypes.string,
    titleInfo:React.PropTypes.string,
    txt:React.PropTypes.string,
    func:React.PropTypes.func,
    auth:React.PropTypes.bool,
    data:React.PropTypes.object
  };
  constructor(){
    super();
    this.state = {
      show:false
    }
  }
  show(){
    let my = this;
    this.setState({
      show:!this.state.show
    });
      setTimeout(function(){
        if(my.state.show) {
          my.editor = new SimpleMDE({
            element: my.refs.detail,
            spellChecker: false,
          });
        }else{
          my.editor.toTextArea();
          my.editor = null;
        }
      },10);
  }
  hide(){
    this.editor = null;
    this.setState({
      show:false
    });
  }
  isOk(){
    let data = this.props.data;
    data.detail = this.editor.value();
    console.log(data);
    let my = this;
    this.props.func(data,my);
  }
  componentDidMount(){
    this.editor = null;
  }
  render(){
    return (
    <div className={s.mainItem}>
      <div className={s.mainItemHd}>
        <HeadLine
          title={this.props.title}
          titleEnglish={this.props.titleEnglish}
          titleInfo={this.props.titleInfo}
        />
        {
          this.props.auth?
            <div className={s.bj}>
              <button className="btn btn-link ion-compose" onClick={this.show.bind(this)} title = "编辑"> </button>
            </div>
            :
            null
        }
      </div>
      <div className={s.pad25}>
        {
          this.state.show?
            <div className={s.textareaBox}>
              <div ref = "editor">
                <div className="detailBox">
                  <textarea className="form-control" ref="detail" id = "textarea" defaultValue={this.props.txt}/>
                </div>
                <div className={s.btnBox} id = "btnBox">
                  <button className="btn btn-primary" onClick={this.isOk.bind(this)}>确定</button>
                  <button className="btn btn-default" onClick={this.hide.bind(this)}>取消</button>
                </div>
              </div>
            </div>
            :
            <article className="markdown-body entry-content" >
              <ReactMarkdown source={this.props.txt}/>
            </article>
        }
      </div>
    </div>

    )
  }
}



export default widthstyle(s)(ImageDetail);


