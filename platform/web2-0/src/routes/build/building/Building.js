
import React,{Component} from 'react';
import {Tabs,Tab,Nav,NavItem,Modal
} from 'react-bootstrap';
import Loading from '../../../components/Loading';
import Confirm from "../../../components/Confirm";
import {BREADCRUMB} from "../../../constants";
import GetBuildItem from "./GetBuildItem";
import {receiveProjectDelete} from  "../../../actions/building";
import s from "./Building.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";
import {navigate} from "../../../actions/route";

class Building extends Component {
  static contextTypes = {
    store:React.PropTypes.object
  };
  constructor(){
    super();
    this.state = {
      githubModalShow: false,
      delData:{
        id:null
      },
      goDetail:true,
      projectId:null
    }
  }
  static propTypes = {
    buildingImageList:React.PropTypes.array,
    onImageList:React.PropTypes.func,
    onFastBuilding:React.PropTypes.func,
    setBreadcrumb:React.PropTypes.func,
    onClearImageList:React.PropTypes.func,
    onDeleteBuild:React.PropTypes.func,
    repos: React.PropTypes.array,
    onReposLoad: React.PropTypes.func,
    authUrl: React.PropTypes.object,
    getAuthUrl: React.PropTypes.func,
    buildProjects:React.PropTypes.func,
    setCreateBuildData:React.PropTypes.func,
    getBuildBranch:React.PropTypes.func,
    modalState:React.PropTypes.object,
    oauth:React.PropTypes.object
  };
  componentWillMount(){
    this.buildData = {
      current_page:1,
      page_num:20
    };
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.BUILD_IMAGE);
    this.props.onImageList(this.buildData);
    let data = {
        src_type:"github",
    };
    let oauth = this.props.oauth;
    !oauth.github?this.props.getAuthURL({src_type:"github",redirect_url:window.location.href}):this.props.onReposLoad(data);
    // let user_info = this.context.store.getState().user_info;
    // let data = {
    //   src_type:"github",
    //   user_uuid:user_info.user_uuid
    // };
    // !user_info.oauth.github?this.props.getAuthURL({src_type:"github",redirect_url:window.location.href}):
    //   this.props.onReposLoad(data);
    // !user_info.oauth.coding?this.props.getAuthURL({src_type:"coding",redirect_url:window.location.href}):null;
  }
  componentWillUnmount(){
    clearInterval(this.myTime);
  }
  getLines(){
    let user_name = this.context.store.getState().user_info.user_name;
    let data = this.props.buildingImageList;
    if(!data||!data.length){
      clearInterval(this.myTime);
      return <tr><td colSpan="7" style={{"textAlign":"center"}}>暂无数据~</td></tr>
    }
    if(data.length == 1&&data[0] == 1) return <tr><td colSpan="7" style={{"textAlign":"center"}}><Loading /></td></tr>;
    if(data.length == 1&&data[0] == 0) return <tr><td colSpan="7" style={{"textAlign":"center"}}><Loading /></td></tr>
    let body = [];
    data.map((item,i)=>{
      body.push(
        <GetBuildItem
          key = {i}
          data = {item}
          user_name = {user_name}
          getBuildBranch = {(id) =>{this.props.getBuildBranch(id)}}
          fastBuilding = {(repository,source,value) =>{this.fastBuilding(repository,source,value)}}
          deleteLine = {(id) =>{this.deleteLine(id)}}
        />
      )
    });
    return body;
  }
  fastBuilding(repository,source,value){
    let branch = value;
    let data = {
      repository:repository,
      branch:branch,
      source:source
    };
    console.log(data);
    this.props.onFastBuilding(data,this.buildData)
  }
  refresh(){
    this.props.onClearImageList();
    this.props.onImageList(this.buildData);
  }
  deleteLine(id){
    this.setState({
      delData:{
        id:id,
        page:this.buildData
      },
      projectId:id
    });
    this.context.store.dispatch(receiveProjectDelete(true));
  }
  projectDeleteHide(){
    this.context.store.dispatch(receiveProjectDelete(false));
  }
  render(){
    let user_info = this.context.store.getState().user_info;
    return (
      <div className="containerBgF building-list">
        <div className="projectHead clearfix">
          <div className="projectHeadL left">
            <div className="projectHeadBtn clearfix"   onClick = {() => {this.refs.addProjectModel.open()}}>
              <div className="projectHeadPlus left" ></div>
              <div className="projectHeadName left">
                <p className="projectHeadP1">添加项目</p>
                <p className="projectHeadP2">Add Project</p>
              </div>
            </div>
          </div>
          <div className="right projectHeadR">
            <button className="btn btn-default icon-refresh" onClick = {this.refresh.bind(this)} title="刷新"> </button>
          </div>
        </div>
        <div className="tableBox">
          <div className={s.table}>
            <table className="table table-hover table-bordered">
            <thead>
            <tr>
              <th>镜像名称</th>
              <th>代码源</th>
              <th>构建状态</th>
              <th><span className={s.w105}>上次构建用时</span></th>
              <th>最近构建</th>
              <th>分支</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            {this.getLines()}
            </tbody>
          </table>
          </div>
        </div>
        <Confirm
          key = {this.state.delData.id}
          onHide={() =>{this.projectDeleteHide()}}
          isShow = {this.props.modalState.projectDelete}
          title = "警告"
          text = "确定要删除此镜像吗?"
          func = {() =>{this.props.onDeleteBuild(this.state.delData)}}
          ref = "confirmModal"
        />
        <AddProjectModal ref = "addProjectModel"
                         onAddProject = {(key) =>{this.addProject(key)}}
                         user_info={user_info}
                         repos={this.props.repos}
                         onReposLoad={(data,flag)=>{this.props.onReposLoad(data,flag)}}
                         authUrl={this.props.authUrl}
                         isBtnState = {this.props.isBtnState}
                         buildData = {this.buildData}
                         buildProjects = {(data,page,my)=>this.props.buildProjects(data,page,my)}
                         setCreateBuildData = {(data) => {this.props.setCreateBuildData(data)}}
                         oauth = {this.props.oauth}
        />
      </div>
    )
  }
}

class AddProjectModal extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    onAddProject:React.PropTypes.func,
    user_info:React.PropTypes.object,
    repos: React.PropTypes.array,
    onReposLoad: React.PropTypes.func,
    authUrl: React.PropTypes.object,
    isBtnState:React.PropTypes.object,
    buildData:React.PropTypes.object,
    buildProjects:React.PropTypes.func,
    isShow:React.PropTypes.bool,
    oauth:React.PropTypes.object
  };
  constructor(props){
    super(props);
    this.state = {
      show:props.isShow,
      codeStoreKey: "github",
      repoKey: null,
      html_url:null,
      checkRepoKey:false,
      git_name:null
    }
  }
  open(){
    this.setState({
      show:true
    })
  }
  hide(){
    this.setState({
      show:false
    })
  }
  addProject(){
    if(!this.state.repoKey){
      this.setState({
        checkRepoKey:true
      });
      return false;
    }
    let data = {
      source:this.state.codeStoreKey,
      repository:this.state.git_name+"/"+this.state.repoKey,
      branch:"master",
      repo_url:this.state.html_url
    };
    console.log(data,">>>>>")
    this.props.setCreateBuildData(data);
    // this.context.store.dispatch(navigate("/building/create"));
    let my = this;
    this.props.buildProjects(data,this.props.buildData,my);
  }
  selectCodeStore(refresh,key){
    this.setState({
      codeStoreKey:key
    });
    let data = {
      src_type:key
    };
    this.props.onReposLoad(data, key);
  }
  selectRepo(key){
    let repo_url = null;
    let git_name = null;
    this.setState({
      checkRepoKey:false
    });
    this.props.repos.map((item) =>{
      if(item.repo_name == key){
        repo_url = item.html_url;
        git_name = item.git_name;
      }
    });
    this.setState({repoKey:key,html_url:repo_url,git_name:git_name});
    return false;
  }
  getLi(){
    let list = this.props.repos;
    if(!list.length) return <div>暂无数据~</div>;
    let li = this.props.repos.map((item,i)=>{
      return <NavItem key={i} eventKey={item.repo_name}>{item.repo_name}</NavItem>
    });
    return(<Nav bsStyle="pills" className = "navList" activeKey = {this.state.repoKey} onSelect = {this.selectRepo.bind(this)}>
      {li}
    </Nav>)

  }
  render(){
    let oauth = this.props.oauth;
    return(
      <Modal {...this.props} show={this.state.show}
             onHide={this.hide.bind(this)}
             bsSize="sm" aria-labelledby="contained-modal-title-sm">
        <div className="modal-header">
          <button type="button" onClick={this.hide.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="contained-modal-title-sm">请选择要添加的项目</h4>
        </div>
        <div className="modal-body">
          <div className={cx(s.modal,"modalItem")}>
            {!oauth.github?<a href={this.props.authUrl.github} className="btn btn-primary">github授权</a>:
              <div>
                {
                  !this.props.isBtnState.code?<Loading />:
                    <div className={s.list}>
                      <button className={cx(s.refresh,"btn btn-default icon-refresh")}
                              onClick = {this.selectCodeStore.bind(this,true,this.state.codeStoreKey)}> </button>
                      {this.getLi()}
                    </div>
                }
              </div>
            }
            {/*<Tabs id = "codeSources" ref = "codeSources"*/}
                    {/*activeKey = {this.state.codeStoreKey}*/}
                    {/*onSelect = {this.selectCodeStore.bind(this,false)}>*/}
                {/*<Tab eventKey = "github" title = "Github" disabled={!this.props.isBtnState.code}>*/}
                {/*</Tab>*/}
                {/*<Tab eventKey = "coding" title = "Coding" disabled={!this.props.isBtnState.code}>*/}
                  {/*{!oauth.coding?<a href={this.props.authUrl.coding} className="btn btn-primary">coding授权</a>:*/}
                    {/*<div>*/}
                      {/*{*/}
                        {/*!this.props.isBtnState.code ? <Loading /> :*/}
                          {/*<div>*/}
                            {/*<p>请选择要添加的项目</p>*/}
                            {/*<button className="btn btn-default icon-refresh"*/}
                                    {/*onClick={this.selectCodeStore.bind(this, true, this.state.codeStoreKey)}> </button>*/}
                            {/*<Nav bsStyle="pills" activeKey={this.state.repoKey} onSelect={this.selectRepo.bind(this)}>*/}
                              {/*{this.props.repos.map((item, i)=> {*/}
                                {/*return <NavItem key={i} eventKey={item.repo_name}>{item.repo_name}</NavItem>*/}
                              {/*})}*/}
                            {/*</Nav>*/}
                          {/*</div>*/}
                      {/*}*/}
                    {/*</div>*/}
                  {/*}*/}
                {/*</Tab>*/}
              {/*</Tabs>*/}
          </div>
          <div className="modalItem modelItemLast">
            <label><span> </span></label>
            <label>
              <button className={`btn btn-primary ${!this.props.isBtnState.building?"btn-loading":""}`}
                      disabled = {!this.props.isBtnState.building}
                      onClick={this.addProject.bind(this)}>
                {this.props.isBtnState.building?"添加":"添加中..."}
                </button>
            </label>
          </div>
        </div>
      </Modal>
    )
  }
}

export default widthstyle(s)(Building);
