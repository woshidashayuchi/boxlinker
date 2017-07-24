
import React,{PropTypes,Component} from 'react';
import {Tabs,Tab,} from 'react-bootstrap';
import {BREADCRUMB} from "../../../constants";
import GetOrgInfo from './GetOrgInfo';
import GetOrgAdmin from './GetOrgAdmin';
import GetRole from './GetRole';
import {navigate} from "../../../actions/route";
import GetAccountManage from '../../user/userInfo/GetAccountManage';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Organize.css';
import cx from 'classnames';

class OrgInfo extends  Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    isBtnState:React.PropTypes.object,
    setBreadcrumb:React.PropTypes.func,
    getOrganizeDetail:React.PropTypes.func,
    organizeDetail:React.PropTypes.object,
    setOrganizeDetail:React.PropTypes.func,
    organizeUserList:React.PropTypes.object,
    getOrganizeUserList:React.PropTypes.func,
    inviteUser:React.PropTypes.func,
    changeOrganizeOwner:React.PropTypes.func,
    deleteOrganize:React.PropTypes.func,
    leaveOrganize:React.PropTypes.func,
    modalState:React.PropTypes.object,
    roleList:React.PropTypes.array,
    getRoleList:React.PropTypes.func,
    onCreateRole:React.PropTypes.func,
    onDeleteRole:React.PropTypes.func,
    roleDetail:React.PropTypes.object,
    onGetRoleDetail:React.PropTypes.func,
    onSetRole:React.PropTypes.func,
    clearRoleDetail:React.PropTypes.func,
    token:React.PropTypes.object,
    organizeList:React.PropTypes.array,
    getOrganizeList:React.PropTypes.func,
    getAuthURL:React.PropTypes.func,
    authUrl: React.PropTypes.object,
    relieveBinding:React.PropTypes.func,
    balance:React.PropTypes.number,
    getBalance:React.PropTypes.func,
    levels:React.PropTypes.object,
    tab:React.PropTypes.string
  };
  constructor(props){
    super(props);
    this.state = {
      tab:Number(props.tab)||1
    }
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.ORGANIZE);
  }
  componentWillReceiveProps(props){
    if(props.tab){
      this.setState({
        tab:Number(props.tab)
      })
    }
  }
  onSelectTabs(key){
    if(this.props.tab){
      this.context.store.dispatch(navigate("/orgInfo/"+key));
    }
    this.setState({
      tab:key
    });
    switch (key){
      case 2://组织管理
        let pageData = {
          page_size:10,
          page_num:1
        };
        // this.props.getOrganizeUserList(pageData);
        // this.props.getRoleList();
        break;
      case 3://角色管理
        this.props.getRoleList();
        break;
      case 4://第三方绑定
        let git = this.props.oauth.github;
        !git?this.props.getAuthURL({src_type:"github",redirect_url:window.location.href}):null;
        break;
    }
  }
  render(){
    let isOwner = this.props.organizeDetail.team_owner == this.props.token.user_uuid;//判断当前token是用户还是组织;
    return (
      <div className = "containerBgF">
        <div className = {s.container}>
          <Tabs
            activeKey = {this.state.tab} id="orgInfo" className = "tabIcon"
            onSelect = {this.onSelectTabs.bind(this)}>
            <Tab eventKey={1} title="组织信息">
              <GetOrgInfo
                getOrganizeDetail = {(id) => {this.props.getOrganizeDetail(id)}}
                organizeDetail = {this.props.organizeDetail}
                setOrganizeDetail = {(data) => {this.props.setOrganizeDetail(data)}}
                isBtnState = {this.props.isBtnState}
                organizeId = {this.props.token.team_uuid}
                organizeUserList = {this.props.organizeUserList}
                modalState = {this.props.modalState}
                balance = {this.props.balance}
                getBalance={()=>{this.props.getBalance()}}
                levels = {this.props.levels}
                token = {this.props.token}
              />
            </Tab>
            <Tab eventKey={2} title="组织管理">
              <GetOrgAdmin
                organizeUserList = {this.props.organizeUserList}
                getOrganizeUserList={(pageData) =>{this.props.getOrganizeUserList(pageData)}}
                inviteUser = {(data,pageData) => {this.props.inviteUser(data,pageData)}}
                changeUserRole = {(data,pageData) =>{this.props.changeUserRole(data,pageData)}}
                changeOrganizeOwner = {(data) =>{this.props.changeOrganizeOwner(data)}}
                deleteOrganize = {(id,flag) =>{this.props.deleteOrganize(id,flag)}}
                leaveOrganize = {(data,pageData) =>{this.props.leaveOrganize(data,pageData)}}
                modalState = {this.props.modalState}
                roleList = {this.props.roleList}
                getRoleList = {()=>this.props.getRoleList()}
                organizeId={this.props.token.team_uuid}
                getOrganizeList = {()=>this.props.getOrganizeList()}
                organizeList = {this.props.organizeList}
                token = {this.props.token}
                organizeDetail = {this.props.organizeDetail}
              />
            </Tab>
            <Tab eventKey={3} title="角色管理">
              <GetRole
                roleList = {this.props.roleList}
                getRoleList = {()=>this.props.getRoleList()}
                onCreateRole = {(data,my)=>this.props.onCreateRole(data,my)}
                onDeleteRole = {(id) =>this.props.onDeleteRole(id)}
                modalState = {this.props.modalState}
                roleDetail={this.props.roleDetail}
                onSetRole={(obj,my) =>this.props.onSetRole(obj,my)}
                onGetRoleDetail = {(id) =>this.props.onGetRoleDetail(id)}
                clearRoleDetail = {()=>this.props.clearRoleDetail()}
                token = {this.props.token}
                isBtnState = {this.props.isBtnState}
              />
            </Tab>
            {
              isOwner?
                <Tab eventKey={4} title="第三方绑定">
                  <GetAccountManage
                    authUrl = {this.props.authUrl}
                    getAuthURL = {(data) =>{this.props.getAuthURL(data)}}
                    relieveBinding = {(data) =>{this.props.relieveBinding(data)}}
                    oauth = {this.props.oauth}
                    url = "/orgInfo"
                  />
                </Tab>
                :
                null
            }
          </Tabs>
        </div>
      </div>
    )
  }

}

export default withStyles(s)(OrgInfo);
