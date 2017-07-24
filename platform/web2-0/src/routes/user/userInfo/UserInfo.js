
import React,{PropTypes,Component} from 'react';

import {Tabs,Tab,} from 'react-bootstrap';
import GetPersonalInfo from './GetPersonalInfo';
import GetAccountManage from './GetAccountManage';
import GetOrganize from './GetOrganize';
import {BREADCRUMB} from "../../../constants";
import {navigate} from "../../../actions/route";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../User.css';
import cx from 'classnames';

class UserInfo extends  Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    setBreadcrumb:React.PropTypes.func,
    authUrl: React.PropTypes.object,
    getAuthURL: React.PropTypes.func,
    onRevisePassword:React.PropTypes.func,
    createOrganize:React.PropTypes.func,
    organizeList:React.PropTypes.array,
    getOrganizeList:React.PropTypes.func,
    leaveOrganize:React.PropTypes.func,
    deleteOrganize:React.PropTypes.func,
    relieveBinding:React.PropTypes.func,
    modalState:React.PropTypes.object,
    token:React.PropTypes.object,
    organizeDetail:React.PropTypes.object,
    getOrganizeDetail:React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    oauth:React.PropTypes.object,
    balance:React.PropTypes.number,
    getBalance:React.PropTypes.func,
    levels:React.PropTypes.object,
    limits:React.PropTypes.array,
    getLimits:React.PropTypes.func,
    tab:React.PropTypes.string,
    onRepeatOrganizeName:React.PropTypes.func,
    repeatName:React.PropTypes.object,
    recharges:React.PropTypes.object,
    getRecharge:React.PropTypes.func,
    switchRecharges:React.PropTypes.object,
    getSwitchRecharges:React.PropTypes.func
  };
  constructor(props){
    super(props);
    this.state = {
      tab:Number(props.tab)||1
    }
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.USER_CONTAINER);
    this.props.getLimits();
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
      this.context.store.dispatch(navigate("/userInfo/"+key));
    }
    this.setState({
      tab:key
    });
    switch (Number(key)){
      case 2://我的组织
      case 3://第三方绑定
        let git = this.props.oauth.github;
        !git?this.props.getAuthURL({src_type:"github",redirect_url:window.location.href}):null;
        break;
    }
  }
  render(){
    return (
      <div className = "containerBgF">
        <div className = {s.container}>
          <Tabs
                activeKey = {this.state.tab}
                onSelect = {this.onSelectTabs.bind(this)} id="userInfo" className = "tabIcon"
                ref = "tab"
          >
            <Tab eventKey={1} title="个人信息">
              <GetPersonalInfo
                onRevisePassword = {(passwordObj) => this.props.onRevisePassword(passwordObj)}
                balance = {this.props.balance}
                getBalance={()=>{this.props.getBalance()}}
                levels = {this.props.levels}
                token = {this.props.token}
                limits={this.props.limits}
                getLimits={()=>{this.props.getLimits()}}
                recharges = {this.props.recharges}
                getRecharge = {(data) =>{this.props.getRecharge(data)}}
                switchRecharges = {this.props.switchRecharges}
                getSwitchRecharges = {(data) =>{this.props.getSwitchRecharges(data)}}
              />
            </Tab>
            <Tab eventKey={2} title="我的组织">
              <GetOrganize
                createOrganize = {(org_name,my) =>{this.props.createOrganize(org_name,my)}}
                getOrganizeList = {() => {this.props.getOrganizeList()}}
                organizeList = {this.props.organizeList}
                leaveOrganize = {(id) => this.props.leaveOrganize(id)}
                deleteOrganize = {(id) => this.props.deleteOrganize(id)}
                modalState = {this.props.modalState}
                isBtnState = {this.props.isBtnState}
                repeatName={this.props.repeatName}
                onRepeatOrganizeName = {(name)=>{this.props.onRepeatOrganizeName(name)}}
              />
            </Tab>
            <Tab eventKey={3} title="第三方绑定">
              <GetAccountManage
                authUrl = {this.props.authUrl}
                getAuthURL = {(data) =>{this.props.getAuthURL(data)}}
                relieveBinding = {(data) =>{this.props.relieveBinding(data)}}
                oauth = {this.props.oauth}
                url = "/user"
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }

}

export default withStyles(s)(UserInfo);
