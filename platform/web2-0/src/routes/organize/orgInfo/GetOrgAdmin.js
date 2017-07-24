import React,{PropTypes,Component} from 'react';
import HeadLine from '../../../components/HeadLine';
import Loading from '../../../components/Loading';
import {DropdownButton,MenuItem,Pagination} from 'react-bootstrap';
import Confirm from '../../../components/Confirm';
import Search from '../../../components/Search';
import {navigate} from '../../../actions/route';
import {receiveNotification,clearNotification} from "../../../actions/notification";
import {receiveOrganizeDelete,receiveOrganizeRemove} from "../../../actions/organize";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Organize.css';
import cx from 'classnames';

class GetOrgAdmin extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    organizeUserList:React.PropTypes.object,
    getOrganizeUserList:React.PropTypes.func,
    inviteUser:React.PropTypes.func,
    changeUserRole:React.PropTypes.func,
    changeOrganizeOwner:React.PropTypes.func,
    deleteOrganize:React.PropTypes.func,
    leaveOrganize:React.PropTypes.func,
    modalState:React.PropTypes.object,
    organizeId:React.PropTypes.string,
    roleList:React.PropTypes.array,
    getRoleList:React.PropTypes.func,
    organizeList:React.PropTypes.array,
    getOrganizeList:React.PropTypes.func,
    token:React.PropTypes.object,
    organizeDetail:React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {
      inviteBox:false,
      roleData:{},
      deleteData:{},
      leaveData:{},
      orgData:{},
      tipText:"",
      pageSize:10,
      pageNumber:1
    }
  }
  componentWillMount(){
    let is_user = this.context.store.getState().user_info.is_user;
    if(is_user == 1){
      this.context.store.dispatch(navigate("/"));
    }
  }
  componentDidMount(){
    this.pageData = {
      page_size:10,
      page_num:1
    };
    this.props.getOrganizeUserList(this.pageData);
    this.props.getRoleList();
  }
  getOrganizeUserBody(){
    let organizeDetail = this.props.organizeDetail||{};
    let user_info = this.context.store.getState().user_info;
    let user_name = user_info.user_name;
    let user_uuid = user_info.user_uuid;
    let team_owner = organizeDetail.team_owner;
    let isOwner = user_uuid == team_owner;//判断是不是组织拥有者
    let power = this.props.token.team_priv;
    let roleList = this.props.roleList;
    let count = this.props.organizeUserList.count;
    if(count == -1) return <tr><td colSpan = "5" style = {{textAlign:"center"}}><Loading /></td></tr>;
    if(count == 0) return <tr><td colSpan = "5" style = {{textAlign:"center"}}>暂无数据~</td></tr>;
    let data = this.props.organizeUserList.user_list;
    let roleTxt = roleList.map((item,i) =>{
      if(item.role_name != "owner") {
        return <MenuItem key={i} eventKey={item.role_uuid}>{item.role_name}</MenuItem>
      }
    });
    return data.map((item,i) =>{
      let role = "";
      let buttonGroup = "";
      switch (item.team_role){
        case "owner":
          role = "组织创建者";
          buttonGroup =  <div className={s.roleBox}>
            <button onClick={this.onDeleteOrganize.bind(this)}
                    disabled= {!isOwner}
                    className="btn btn-danger">
              解散组织
            </button>
          </div>;
          break;
        case "admin" :
          role = "管理员";
          buttonGroup = <div className={s.roleBox}>
            <DropdownButton
              onSelect = {this.onChangeUserRole.bind(this,item.user_uuid)}
              bsStyle={"primary"}
              disabled = {power.indexOf("U") == -1}
              title={'更改权限'} id={`volumes-table-line-${i}`}>
              {
                roleTxt
              }
            </DropdownButton>
            {
              user_name == item.user_name?
              <button className="btn btn-danger" onClick = {this.onDeleteUser.bind(this,item.user_uuid,"me")}>离开组织</button>
              :
              <button className="btn btn-danger" disabled = {power.indexOf("D") == -1} onClick = {this.onDeleteUser.bind(this,item.user_uuid,"other")}>移出组织</button>
            }
          </div>;
          break;
        case "user" :
          role = "成员";
          buttonGroup = <div className={s.roleBox}>
             <DropdownButton
              onSelect = {this.onChangeUserRole.bind(this,item.user_uuid)}
              bsStyle={"primary"}
              disabled = {power.indexOf("U") == -1}
              title={'更改权限'} id={`volumes-table-line-${i}`}>
               {
                 roleTxt
               }
            </DropdownButton>
            {
              user_name == item.user_name?
              <button className="btn btn-danger" onClick = {this.onDeleteUser.bind(this,item.user_uuid,"me")}>离开组织</button>
              :
              <button className="btn btn-danger" disabled = {power.indexOf("D") == -1} onClick = {this.onDeleteUser.bind(this,item.user_uuid,"other")}>移出组织</button>
            }
          </div>;
          break;
        default :
          role = item.team_role;
          buttonGroup = <div className={s.roleBox}>
            <DropdownButton
              onSelect = {this.onChangeUserRole.bind(this,item.user_uuid)}
              bsStyle={"primary"}
              disabled = {power.indexOf("U") == -1}
              title={'更改权限'} id={`volumes-table-line-${i}`}>
              {
                roleTxt
              }
            </DropdownButton>
            {
              user_name == item.user_name?
              <button className="btn btn-danger" onClick = {this.onDeleteUser.bind(this,item.user_uuid,"me")}>离开组织</button>
              :
              <button className="btn btn-danger" disabled = {power.indexOf("D") == -1} onClick = {this.onDeleteUser.bind(this,item.user_uuid,"other")}>移出组织</button>
            }
          </div>;

      }
      return (
        <tr key = {i}>
          <td>
            <div className="mediaItem">
              <img className="mediaImg" src = {item.logo||'/image/avatar.png'} />
              <span className="mediaTxt">{item.user_name}</span>
            </div>
          </td>
          <td>{item.team_role}</td>
          <td>{item.create_time}</td>
          <td>{item.update_time}</td>
          <td>
            {buttonGroup}
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
          <th>用户名</th>
          <th>权限信息</th>
          <th>加入时间</th>
          <th>更新时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {this.getOrganizeUserBody()}
        </tbody>
      </table>
    )
  }
  handleSelectPage(eventKey){
    eventKey = Math.floor(eventKey);
    this.setState({
      pageNumber: eventKey
    });
    this.pageData.page_num = eventKey;
    this.props.getOrganizeUserList(this.pageData);
  }
  getPage(){
    let data = this.props.organizeUserList;
    let page = [];
    if(data.count<this.state.pageSize){}else {
      let pages = data.count/this.state.pageSize;
      pages = data.count%this.state.pageSize>0?Math.floor(pages+1):Math.floor(pages);
      page.push(
        <div className="pageBox" key={new Date().getTime() + 1}>
          <Pagination
            prev
            next
            first
            last
            items={pages}
            activePage={this.state.pageNumber}
            onSelect={this.handleSelectPage.bind(this)}
          />
        </div>
      )
    }
    return page;
  }
  onInviteUser(data){
    if(data.user_uuid){
      this.props.inviteUser(data,this.pageData);
    }else{
      this.context.store.dispatch(receiveNotification({message:"没有找到此用户",level:"danger"}));
      let my = this;
      setTimeout(function(){
        my.context.store.dispatch(clearNotification());
      },3000);
    }
  }
  onChangeUserRole(user_uuid,role_uuid){
    let data = {
      role_uuid:role_uuid,
      user_uuid:user_uuid
    };
    this.props.changeUserRole(data,this.pageData);
  }
  onDeleteUser(user_uuid,my){
    let systemOrganizeId = null;
    this.props.organizeList.map((item) =>{
      if(item.team_type == "system"){
        systemOrganizeId =  item.team_uuid;
      }
    });
    console.log(systemOrganizeId)
    let txt = "";
    switch (my){
      case "me":
        txt = "您确定要退出此组织吗?";
        break;
      case "other":
        txt = "您确定要移出此人吗?"
    }
    this.setState({
      tipText:txt,
      roleData: {
        user_uuid: user_uuid,
        team_uuid:this.props.organizeId,
        type:my,//如果是me自己退出
        systemOrganizeId:systemOrganizeId

      }
    });
    this.context.store.dispatch(receiveOrganizeRemove(true));
  }
  onDeleteUserHide(){
    this.context.store.dispatch(receiveOrganizeRemove(false));
  }
  onDeleteOrganize(){
    this.setState({
      orgData:{
        team_uuid:this.props.organizeId,
        type:"organize"
      }
    });
    this.context.store.dispatch(receiveOrganizeDelete(true));
  }
  onDeleteOrganizeHide(){
    this.context.store.dispatch(receiveOrganizeDelete(false));
  }
  render(){
    let power = this.props.token.team_priv;
    return (
     <div className={s.root}>
       {
         power.indexOf("U") == -1 ? "" :
           <div className={s.item}>
             <HeadLine
               title="邀请新成员"
               titleEnglish="INVITE USER"
               titleInfo="邀请新成员"
             />
             <div className={cx(s.search,s.itemFt)}>
               <Search
                 parameter = {{name:""}}
                 btnClickFun = {(data) =>{this.onInviteUser(data)}}
                 placeholder="请输入用户名"
                 type = "organize"
                 ref = "search"
                 getItem = {function(item,my,i){
                   return (
                     <li key = {i}  onClick={my.chooseVal.bind(my,item.user_name)}>
                       <a href = "javascript:;">
                         <img width={40} height={40} src={item.logo} />
                         <p className={s.name}>{item.user_name}</p>
                       </a>
                     </li>)
                 }}
                 searchNumber={5}
               >
               </Search>
             </div>
           </div>
       }
        <div className = {s.item}>
          <HeadLine
            title = "组织成员"
            titleEnglish = "ORGANIZE USER LIST"
            titleInfo = "组织成员列表"
          />
          <div className={cx(s.tabBox,"tableBox")}>
            <div className={s.table}>
              {this.getTableDemo()}
              {this.getPage()}
            </div>
          </div>
        </div>
        <Confirm
          key = {this.state.roleData.user_uuid}
          isShow={this.props.modalState.organizeRemove}
          onHide={() =>{this.onDeleteUserHide()}}
          title = "警告"
          text = {this.state.tipText}
          ref = "confirmModal"
          func = {() => {this.props.leaveOrganize(this.state.roleData,this.pageData)}}
        />
        <Confirm
          key = {this.state.orgData.team_uuid}
          isShow={this.props.modalState.organizeDelete}
          onHide={() =>{this.onDeleteOrganizeHide()}}
          title = "警告"
          text = "您确定要解散此组织吗?"
          ref = "confirmModalDelete"
          func = {() => {this.props.deleteOrganize(this.state.orgData)}}
        />
     </div>
    )
  }
}

export default  withStyles(s)(GetOrgAdmin);
