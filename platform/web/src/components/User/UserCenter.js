
import React,{PropTypes,Component} from 'react';

import {Tabs,Tab,} from 'react-bootstrap';
import GetPersonalInfo from './GetPersonalInfo';
import GetMyAccount from './GetMyAccount';
import GetAccountManage from './GetAccountManage';
import GetCertificateMange from './GetCertificateMange';
import GetOrganize from './GetOrganize';
import {BREADCRUMB} from "../../constants";

const title = '个人中心';

class UserCenter extends  Component{
  static contextTypes = {setTitle: PropTypes.func.isRequired};
  static propTypes = {
    setBreadcrumb:React.PropTypes.func,
    githubAuthURL: React.PropTypes.string,
    getGithubAuthURL: React.PropTypes.func,
    onRevisePassword:React.PropTypes.func,
    createOrganize:React.PropTypes.func,
    organizeList:React.PropTypes.array,
    getOrganizeList:React.PropTypes.func
  };
  componentDidMount(){
    this.props.getGithubAuthURL();
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.USER_CONTAINER)
  }
  render(){
    this.context.setTitle(title);
    return (
      <div className = "containerBgF">
        <div className = "userTab">
          <Tabs defaultActiveKey={5} id="userTabs">
            <Tab eventKey={1} title="个人信息">
              <GetPersonalInfo
                onRevisePassword = {(passwordObj) => this.props.onRevisePassword(passwordObj)}
              />
            </Tab>
            <Tab eventKey={2} title="我的账户">
              <GetMyAccount />
            </Tab>
            <Tab eventKey={3} title="账户管理">
              <GetAccountManage
                githubAuthURL = {this.props.githubAuthURL}
              />
            </Tab>
            <Tab eventKey={4} title="礼券管理">
              <GetCertificateMange />
            </Tab>
            <Tab eventKey={5} title="组管理">
              <GetOrganize
                  createOrganize = {(org_name) =>{this.props.createOrganize(org_name)}}
                  getOrganizeList = {() => {this.props.getOrganizeList()}}
                  organizeList = {this.props.organizeList}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }

}

export default UserCenter
