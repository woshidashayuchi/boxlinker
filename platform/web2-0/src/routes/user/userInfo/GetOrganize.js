import React,{PropTypes,Component,} from 'react';
import HeadLine from '../../../components/HeadLine';
import {Modal} from 'react-bootstrap';
import Loading from '../../../components/Loading';
import Confirm from '../../../components/Confirm';
import {navigate} from '../../../actions/route';
import {receiveOrganizeRemove,receiveOrganizeDelete} from "../../../actions/organize";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../User.css';
import cx from 'classnames';
import * as Const from '../../../constants';

class GetOrganize extends Component {
    static contextTypes = {
        store:React.PropTypes.object
    };
    static propTypes = {
      createOrganize:React.PropTypes.func,
      organizeList:React.PropTypes.array,
      getOrganizeList:React.PropTypes.func,
      leaveOrganize:React.PropTypes.func,
      deleteOrganize:React.PropTypes.func,
      modalState:React.PropTypes.object,
      isBtnState:React.PropTypes.object,
      onRepeatOrganizeName:React.PropTypes.func,
      repeatName:React.PropTypes.object
    };
    constructor(){
        super();
        this.state = {
            orgData:{
              team_uuid:"",
              type:"user"
            },
            leaveData:{
              team_uuid:"",
              user_uuid:"",
              type:"delete"
            }
        }
    }
    createOrganize(org_name,my){
        this.props.createOrganize(org_name,my);
    }
    leaveOrganize(id){
      let user_uuid = this.context.store.getState().user_info.user_uuid;
      this.setState({
          leaveData:{
            team_uuid:id,
            user_uuid:user_uuid,
            type:"user"
          }
      });
      this.context.store.dispatch(receiveOrganizeRemove(true));
    }
    leaveOrganizeHide(){
        this.context.store.dispatch(receiveOrganizeRemove(false));
    }
    deleteOrganize(id){
        this.setState({
            orgData:{
              team_uuid:id,
              type:"user"
            }
        });
        this.context.store.dispatch(receiveOrganizeDelete(true));
    }
    deleteOrganizeHide(){
        this.context.store.dispatch(receiveOrganizeDelete(false));
    }
    getOrganizeBody(){
        let data = this.props.organizeList;
        if(data[0] == 1) return <tr><td colSpan = "5" style = {{textAlign:"center"}}><Loading /></td></tr>;
        if(data.length == 1 && data[0].team_type == 'system') return <tr><td colSpan = "5" style = {{textAlign:"center"}}>暂无数据~</td></tr>;
        if(data.length == 0) return <tr><td colSpan = "5" style = {{textAlign:"center"}}>暂无数据~</td></tr>;
        return data.map((item,i) =>{
            if(item.team_type == 'system') return false;
            return (
                <tr key = {i}>
                    <td>
                        <div className="mediaItem">
                            <img className="mediaImg" src = {item.logo||"/images/avatar.png"} />
                            <span className="mediaTxt">{item.team_name}</span>
                        </div>
                    </td>
                    <td>{item.team_desc||"暂无简介"}</td>
                    <td>{item.role_name}</td>
                    <td>
                        {
                          item.role_name == "owner"?
                            <button className="btn btn-danger" onClick = {this.deleteOrganize.bind(this,item.team_uuid)}>解散组织</button>
                          :
                            <button className="btn btn-danger" onClick = {this.leaveOrganize.bind(this,item.team_uuid)}>退出组织</button>
                        }
                    </td>
                </tr>
            )
        })
    }
    getTableDemo(){
       return (
           <table className="table table-hover table-bordered">
               <thead>
               <tr>
                   <th width = "25%">组织名称</th>
                   <th width = "25%">组织简介</th>
                   <th width = "25%">组织权限</th>
                   <th width = "25%">操作</th>
               </tr>
               </thead>
               <tbody>
                {this.getOrganizeBody()}
               </tbody>
           </table>
       )
    }
    componentDidMount(){
    }
    componentWillMount(){
        let is_user = this.context.store.getState().user_info.is_user;
        if(is_user == 0){
            this.context.store.dispatch(navigate("/"));
        }
    }
    render(){
        return(
            <div className={s.tab}>
                <div className={cx(s.item)}>
                  <div className="clearfix">
                    <div className = "left">
                      <HeadLine
                        title = "我的组织"
                        titleEnglish = "MY ORGANIZE"
                        titleInfo = "所有我加入的组织的列表"
                      />
                    </div>
                    <div className={cx(s.left,"right")}>
                      <div className="projectHeadBtn clearfix" onClick = {() => {this.refs.createOrgModel.open()}}>
                        <div className="projectHeadPlus left"></div>
                        <div className="projectHeadName left">
                          <p className="projectHeadP1">新建组织</p>
                          <p className="projectHeadP2">Create Organize</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx(s.tabBox,"tableBox")}>
                    <div className={s.table}>
                      {this.getTableDemo()}
                    </div>
                  </div>
                </div>
                <CreateOrganize
                  onCreateOrganize = {this.createOrganize.bind(this)}
                  repeatName={this.props.repeatName}
                  onRepeatOrganizeName = {(name)=>{this.props.onRepeatOrganizeName(name)}}
                  isBtnState={this.props.isBtnState} ref = "createOrgModel" />
                <Confirm
                  key = {this.state.leaveData.team_uuid}
                  isShow={this.props.modalState.organizeRemove}
                  onHide={() =>{this.leaveOrganizeHide()}}
                  title = "警告"
                  text = "您确定要离开此组织吗?"
                  ref = "confirmModalLeave"
                  func = {() => {this.props.leaveOrganize(this.state.leaveData)}}
                />
                <Confirm
                  key = {this.state.orgData.team_uuid+"1"}
                  isShow={this.props.modalState.organizeDelete}
                  onHide={() =>{this.deleteOrganizeHide()}}
                  title = "警告"
                  text = "您确定要解散此组织吗?"
                  ref = "confirmModalDelete"
                  func = {() => {this.props.deleteOrganize(this.state.orgData)}}
                />
            </div>
        )
    }

}

export default withStyles(s)(GetOrganize);

class CreateOrganize extends Component{
  static propTypes = {
    onCreateOrganize:React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    onRepeatOrganizeName:React.PropTypes.func,
    repeatName:React.PropTypes.object
  };
  constructor(props){
    super(props);
    this.state = {
      show:false,
      orgName:false,
      orgDesc:false
    }
  }
  componentWillReceiveProps(props){
    if(props.repeatName.organizeName){
      this.setState({
        orgName:true
      });
      this.refs.name_tip.innerHTML = Const.INPUT_TIP.organize.Repeat;
    }
  }
  open(){
    this.setState({
      show:true,
    })
  }
  hide(){
    this.setState({
      show:false,
      orgName:false,
      orgDesc:false
    })
  }
  createOrganize(){
    let org_name = this.refs.org_name;
    let org_desc = this.refs.org_desc;
    let name_tip = this.refs.name_tip;
    let desc_tip = this.refs.desc_tip;
    if(!org_name.value){
      this.setState({
        orgName:true
      });
      name_tip.innerHTML = Const.INPUT_TIP.organize.Name;
      return false;
    }
    if(!org_desc.value){
      this.setState({
        orgDesc:true
      });
      desc_tip.innerHTML = Const.INPUT_TIP.organize.Desc;
      return false;
    }
    if(!this.state.orgName && !this.state.orgDesc) {
      let data = {
        team_name:org_name.value,
        team_desc:org_desc.value
      };
      this.props.onCreateOrganize(data,this);
    }
  }
  onInputName(){
    let value = this.refs.org_name.value.trim();
    let name_tip = this.refs.name_tip;
    let regExp = Const.REGEXP_NAME;
    if(value.length == 0){
      this.setState({
        orgName:false
      });
      return false;
    }else if (!regExp.test(value)){
      this.setState({
        orgName:true
      });
      name_tip.innerHTML = Const.INPUT_TIP.organize.Format;
      return false;
    }else{
      this.setState({
        orgName:false
      });
    }
  }
  onInputDesc(){
    let value = this.refs.org_desc.value;
    if(value.length != 0) {
      this.setState({
        orgDesc: false
      });
    }
  }
  onRepeatOrganizeName(e){
    let value = e.target.value.trim();
    if(value.length>=5){
      this.props.onRepeatOrganizeName(value);
    }
  }
  render(){
    return(
      <Modal {...this.props} show={this.state.show}
             onHide={this.hide.bind(this)}
             bsSize="sm" aria-labelledby="contained-modal-title-sm">
        <div className="modal-header">
          <button type="button" onClick={this.hide.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="contained-modal-title-sm">新建组织</h4>
        </div>
        <div className="modal-body">
          <div className={this.state.orgName?cx(s.show,"modalItem has-error"):"modalItem"}>
            <label><span>组织名称</span></label>
            <label>
              <input  onInput = {this.onInputName.bind(this)}
                      onBlur = {this.onRepeatOrganizeName.bind(this)}
                      className="form-control form-control-sm"
                      type="text" placeholder="请输入名称"
                      ref="org_name"/></label>
            <div ref = "name_tip" className={cx(s.modileTip,"volumeTip")}>组织名称不正确</div>
          </div>

          <div className={this.state.orgDesc?cx(s.show,s.lastItem,"modalItem has-error"):cx(s.lastItem,"modalItem")}>
            <label className={s.label}><span>组织描述</span></label>
            <label>
                    <textarea className="form-control" ref = "org_desc"
                              onInput={this.onInputDesc.bind(this)}
                    >

                    </textarea></label>
            <div ref = "desc_tip" className={cx(s.modileTip,"volumeTip")}></div>
          </div>
          <div className="modalItem modelItemLast">
            <label><span> </span></label>
            <label>
              <button className={`btn btn-primary ${!this.props.isBtnState.createOrg?"btn-loading":""}`}
                      disabled={!this.props.isBtnState.createOrg}
                      onClick={this.createOrganize.bind(this)}
              >
                {this.props.isBtnState.createOrg?"创建组织":"创建中..."}
              </button>
            </label>
          </div>
        </div>
      </Modal>
    )
  }
}
