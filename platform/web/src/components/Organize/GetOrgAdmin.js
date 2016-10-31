

import React,{PropTypes,Component} from 'react';
import HeadLine from '../HeadLine';
import Loading from '../Loading';
import {SplitButton,MenuItem} from 'react-bootstrap'
import {navigate} from '../../actions/route';

class GetOrgAdmin extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    organizeUserList:React.PropTypes.array,
    getOrganizeUserList:React.PropTypes.func,
    getUserList:React.PropTypes.func,
    userList:React.PropTypes.array,
    inviteUser:React.PropTypes.func
  };

  constructor(props){
    super(props);
    this.state = {
      inviteBox:false
    }
  }
  componentWillMount(){
    let is_user = this.context.store.getState().user_info.is_user;
    if(is_user == 1){
      this.context.store.dispatch(navigate("/"));
    }
  }
  componentDidMount(){
    let organizeId = this.context.store.getState().user_info.orga_uuid;
    this.props.getOrganizeUserList(organizeId);
  }

  getOrganizeUserBody(){
    let user_name = this.context.store.getState().user_info.user_name;
    let orgRole = Number(this.context.store.getState().user_info.role_uuid);
    let data = this.props.organizeUserList;
    if(data[0] == 1) return <tr><td colSpan = "3" style = {{textAlign:"center"}}><Loading /></td></tr>;
    if(!data.length) return <tr><td colSpan = "3" style = {{textAlign:"center"}}>暂无数据~</td></tr>;
    return data.map((item,i) =>{
      let role = "";
      let splitButton = "";
      switch (Number(item.role)){
        case 200:
          role = "组织创建者";
          splitButton = <SplitButton
                          bsStyle={"primary"}
                          disabled
                          title={'更改权限'} id={`volumes-table-line-${i}`}>
                          <MenuItem eventKey="210">管理员</MenuItem>
                          <MenuItem eventKey="400">用户</MenuItem>
                        </SplitButton>
          break;
        case 210 :
          role = "管理员";
          splitButton = <SplitButton
            bsStyle={"primary"}
            title={'更改权限'} id={`volumes-table-line-${i}`}>
            <MenuItem eventKey="400">用户</MenuItem>
          </SplitButton>
          break;
        case 400 :
          role = "成员";
          splitButton = <SplitButton
            bsStyle={"primary"}
            title={'更改权限'} id={`volumes-table-line-${i}`}>
            <MenuItem eventKey="210">管理员</MenuItem>
          </SplitButton>
          break;
        default :
          role = "成员";
          splitButton = <SplitButton
            bsStyle={"primary"}
            title={'更改权限'} id={`volumes-table-line-${i}`}>
            <MenuItem eventKey="210">管理员</MenuItem>
          </SplitButton>

      }
      return (
        <tr key = {i}>
          <td>
            <div className="mediaItem">
              <img className="mediaImg" src = "/slImgJx.png" />
              <span className="mediaTxt">{item.user_name}</span>
            </div>
          </td>
          <td>{role}</td>
          <td>
            {splitButton}{item.user_name == user_name?<button className="btn btn-danger">离开组织</button>:
              orgRole ==210||orgRole ==200?<button className="btn btn-danger">移除成员</button>:""}
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
          <th width = "33%">用户名</th>
          <th width = "33%">权限信息</th>
          <th width = "34%">操作</th>
        </tr>
        </thead>
        <tbody>
        {this.getOrganizeUserBody()}
        </tbody>
      </table>
    )
  }
  getUserListFun(e){
    let name = e.target.value;
    if(name.length >=3) {
      this.setState({
        inviteBox:true
      });
      this.props.getUserList(name);
    }
  };
  getUserListBody(){
    let userList = this.props.userList;
    let my = this;
    if(userList && userList.length) {
      let body = userList.map((item, i) => {
        return (<li key = {i} onClick = {my.choseInviteName.bind(my,item.username)}>
                  <img width={40} height={40} src={item.logo||require('./imgHd.png')} />
                  <p>{item.username}</p>
                  <p>{item.email}</p>
        </li>)
      });
      return body;
    }else{
      return <li>暂无数据</li>
    }
  }
  inviteInputBlur(){
    let my = this;
    setTimeout(function(){
      my.setState({
        inviteBox:false
      })
    },200);
  }
  choseInviteName(name){
    console.log(name);
    this.refs.username.value = name;
  }
  onInviteUser(){
    let userList = this.props.userList;
    let userInfo = this.refs.username.value;
    let orga_id = this.context.store.getState().user_info.orga_uuid;
    userList.map((item)=>{
      if(item.username == userInfo || item.email == userInfo){
        let data = {
          user_id:item.user_id,
          orga_id:orga_id
        };
        this.props.inviteUser(data)
      }

    })

  }

  render(){
    let role = this.context.store.getState().user_info.role_uuid;
    return (
      <div className="organize">
        {role == 400 ? "" :
          <div className="organizeHd">
            <HeadLine
              title="邀请新成员"
              titleEnglish="INVITE USER"
              titleInfo="邀请新成员"
            />
            <div className="inviteUser">
              <input type="text" className="form-control inviteUserInput"
                     ref="username"
                     onInput={this.getUserListFun.bind(this)}
                     onBlur={this.inviteInputBlur.bind(this)}
              />
              <button className="btn btn-primary" onClick = {this.onInviteUser.bind(this)}>邀请</button>
              <ul className={this.state.inviteBox ? "inviteShow" : "inviteHide"}>
                {this.getUserListBody()}
              </ul>
            </div>
          </div>
        }
        <div className="organizeBd sl-bd TableTextLeft">
          <HeadLine
            title = "组织成员"
            titleEnglish = "ORGANIZE USER LIST"
            titleInfo = "组织成员列表"
          />
          <div className="organizeUserTab">
            {this.getTableDemo()}
          </div>
        </div>
      </div>
    )
  }
}

export default  GetOrgAdmin;
