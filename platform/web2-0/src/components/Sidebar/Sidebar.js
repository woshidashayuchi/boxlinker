import React, { Component } from "react";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from "./Sidebar.css"
import Link from "../Link"
import cookie from 'react-cookie'
import {Collapse} from 'react-bootstrap';

function showIcon(className){
  return <i className={cx(s.listFA,className)}> </i>
}

class MenuListItem extends Component{
  static propTypes = {
    href: React.PropTypes.string.isRequired,
    icon: React.PropTypes.element.isRequired,
  };
  render(){
    return (
      <Link to={this.props.href} onClick={this.props.onClick}>
        {this.props.icon}
        {this.props.children}
        {this.props.rightIcon}
      </Link>
    )
  }
}

class MenuList extends Component{
  constructor(...args){
    super(...args);
    this.state = {
      open: true
    };
  }
  handleClick(){
    this.setState({
      open:!this.state.open
    });
  }
  render(){
    return (
      <li className={`${this.state.open?"active":""}`}>
        <MenuListItem
          href="javascript:;"
          icon={this.props.icon}
          rightIcon={<i className={`arrow`}> </i>}
          onClick={this.handleClick.bind(this)}
        >
          <span className={s.menuTitle}>{this.props.title}</span>
          <span className={s.thinItemTip}>{this.props.title}</span>
        </MenuListItem>
        <Collapse in={this.state.open}>
            <div>
            {this.props.children}
          </div>
        </Collapse>
      </li>
    )

  }
}

class Sidebar extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  };
  static propTypes = {
    isSidebarOpen: React.PropTypes.bool,
    sidebarActive:React.PropTypes.string,
    onChangeSidebarActive:React.PropTypes.func,
    organizeDetail:React.PropTypes.object
  };
  onChangeAction(url){
    var exp = new Date();
    exp.setTime(exp.getTime()+1000*60*60*24*7);
    cookie.save('sidebarActive',url,exp);
    this.props.onChangeSidebarActive(url);
  }
  componentDidMount(){}
  getList(){
    let isUser = this.props.organizeDetail.team_type == "system";//判断当前token是用户还是组织;
    return (
        <div className={s.listPack} id = "mainnav">
          <ul className={s.menuList} id = "mainnav-menu">
            <li onClick = {this.onChangeAction.bind(this,"/")}
                className={this.props.sidebarActive =="/"?s.subListAction:""}>
              <MenuListItem href="/" icon={showIcon("icon-console")}>
                <span className={s.menuTitle}>控制台</span>
                <span className={s.thinItemTip}>控制台</span>
              </MenuListItem>
            </li>
            <MenuList title="服务中心" icon={showIcon("icon-servicecenter")}>
              <p onClick = {this.onChangeAction.bind(this,"/chooseImage")}
                 className={this.props.sidebarActive =="/chooseImage"||this.props.sidebarActive =="/deployService"||this.props.sidebarActive =="/configure"?s.subListAction:s.navSecond}>
                <MenuListItem href="/chooseImage" icon={showIcon("icon-New-service")}>
                  <span className={s.menuTitle}>新建服务</span>
                  <span className={s.thinItemTip}>新建服务</span>
                </MenuListItem>
              </p>
              <p onClick = {this.onChangeAction.bind(this,"/serviceList")}
                 className={this.props.sidebarActive =="/serviceList"?s.subListAction:s.navSecond}>
                <MenuListItem href="/serviceList" icon={showIcon("icon-servicelist")}>
                  <span className={s.menuTitle}>服务列表</span>
                  <span className={s.thinItemTip}>服务列表</span>
                </MenuListItem>
              </p>
              <p onClick = {this.onChangeAction.bind(this,"/volumes")}
                 className={this.props.sidebarActive =="/volumes"?s.subListAction:s.navSecond}>
                <MenuListItem href="/volumes" icon={showIcon("icon-storagemanag")}>
                  <span className={s.menuTitle}>存储卷管理</span>
                  <span className={s.thinItemTip}>存储卷管理</span>
                </MenuListItem>
              </p>
              <p onClick = {this.onChangeAction.bind(this,"/certificate")}
                 className={this.props.sidebarActive =="/certificate"?s.subListAction:s.navSecond}>
                <MenuListItem href="/certificate" icon={showIcon("icon-mirrorhouse")}>
                  <span className={s.menuTitle}>证书管理</span>
                  <span className={s.thinItemTip}>证书管理</span>
                </MenuListItem>
              </p>
            </MenuList>
            <MenuList title="镜像中心" icon={showIcon("icon-mirrorceer")}>
              {/*<p onClick = {this.onChangeAction.bind(this,"/createImage")}*/}
                 {/*className={this.props.sidebarActive =="/createImage"?s.subListAction:s.navSecond}>*/}
                {/*<MenuListItem href="/createImage" icon={showIcon("icon-mirrorhouse")}>*/}
                  {/*<span className={s.menuTitle}>新建镜像</span>*/}
                  {/*<span className={s.thinItemTip}>新建镜像</span>*/}
                {/*</MenuListItem>*/}
              {/*</p>*/}
              <p onClick = {this.onChangeAction.bind(this,"/myImage")}
                 className={this.props.sidebarActive =="/myImage"?s.subListAction:s.navSecond}>
                <MenuListItem href="/myImage" icon={showIcon("icon-mymirror")}>
                  <span className={s.menuTitle}>我的镜像</span>
                  <span className={s.thinItemTip}>我的镜像</span>
                </MenuListItem>
              </p>
              <p onClick = {this.onChangeAction.bind(this,"/platformImage")}
                 className={this.props.sidebarActive =="/platformImage"?s.subListAction:s.navSecond}>
                <MenuListItem href="/platformImage" icon={showIcon("icon-formmirror")}>
                  <span className={s.menuTitle}>平台镜像</span>
                  <span className={s.thinItemTip}>平台镜像</span>
                </MenuListItem>
              </p>
              {/*<p onClick = {this.onChangeAction.bind(this,"/building")}*/}
                 {/*className={this.props.sidebarActive =="/building"?s.subListAction:s.navSecond}>*/}
                {/*<MenuListItem href="/building" icon={showIcon("icon-codeconstruct")}>*/}
                  {/*<span className={s.menuTitle}>代码构建</span>*/}
                  {/*<span className={s.thinItemTip}>代码构建</span>*/}
                {/*</MenuListItem>*/}
              {/*</p>*/}
            </MenuList>
            {isUser?
              <MenuList title="用户中心" icon={showIcon("icon-login")}>
                <p onClick = {this.onChangeAction.bind(this,"/userInfo")}
                  className={this.props.sidebarActive =="/userInfo"?s.subListAction:s.navSecond}>
                    <MenuListItem href="/userInfo" icon={showIcon("icon-perinfor")}>
                    <span className={s.menuTitle}>用户管理</span>
                    <span className={s.thinItemTip}>用户管理</span>
                    </MenuListItem>
                </p>
                <p onClick = {this.onChangeAction.bind(this,"/userBilling")}
                  className={this.props.sidebarActive =="/userBilling"?s.subListAction:s.navSecond}>
                    <MenuListItem href="/userBilling" icon={showIcon("icon-version")}>
                    <span className={s.menuTitle}>费用管理</span>
                    <span className={s.thinItemTip}>费用管理</span>
                    </MenuListItem>
                </p>
              </MenuList>
              :
              <MenuList title="组织中心" icon={showIcon("icon-login")}>
                <p onClick = {this.onChangeAction.bind(this,"/orgInfo")}
                   className={this.props.sidebarActive =="/orgInfo"?s.subListAction:s.navSecond}>
                  <MenuListItem href="/orgInfo" icon={showIcon("icon-containerconfig")}>
                    <span className={s.menuTitle}>组织管理</span>
                    <span className={s.thinItemTip}>组织管理</span>
                  </MenuListItem>
                </p>
                <p onClick = {this.onChangeAction.bind(this,"/orgBilling")}
                   className={this.props.sidebarActive =="/orgBilling"?s.subListAction:s.navSecond}>
                  <MenuListItem href="/orgBilling" icon={showIcon("icon-version")}>
                    <span className={s.menuTitle}>费用管理</span>
                    <span className={s.thinItemTip}>费用管理</span>
                  </MenuListItem>
                </p>
              </MenuList>
            }

            <MenuList title="回收站" icon={showIcon("icon-delete")}>
               <p onClick = {this.onChangeAction.bind(this,"/serviceRecovery")}
                    className={this.props.sidebarActive =="/serviceRecovery"?s.subListAction:s.navSecond}>
                  <MenuListItem href="/serviceRecovery" icon={showIcon("icon-servicelist")}>
                    <span className={s.menuTitle}>服务</span>
                    <span className={s.thinItemTip}>服务</span>
                  </MenuListItem>
               </p>
            </MenuList>

          </ul>
        </div>
    )
  }
  render(){
    return (
      <div className={cx(s.root)} id="mainnav-container">
        {this.getList()}
      </div>
    )
  }

}

export default withStyles(s)(Sidebar);

