import React, { Component } from 'react';
import Loading from 'react-loading'
import cookie from 'react-cookie'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem,
} from 'react-bootstrap';
import {HOSTNAME} from '../../constants';
import {navigate} from '../../actions/route';
import cx from "classnames";
import s from "./Header.css";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import Pay from '../Layout/PayContainer';
class Header extends Component {
  static propTypes = {
    isLoading: React.PropTypes.bool,
    isSidebarOpen: React.PropTypes.bool,
    onSidebarToggleClick: React.PropTypes.func,
    organizeList:React.PropTypes.array,
    getOrganizeList:React.PropTypes.func,
    changeAccount:React.PropTypes.func,
    user_info:React.PropTypes.object,
    onCancel:React.PropTypes.func,
    token:React.PropTypes.object,
    organizeDetail:React.PropTypes.object,
    getOrganizeDetail:React.PropTypes.func,
    balance:React.PropTypes.number,
    getBalance:React.PropTypes.func,
    levels:React.PropTypes.object,
    getLevels:React.PropTypes.func
  };
  static contextTypes = {
    store: React.PropTypes.object
  };
  onChangeSidebar(){
    this.props.onSidebarToggleClick(!this.props.isSidebarOpen);
    var exp = new Date();
    exp.setTime(exp.getTime()+1000*60*60*24*7);
    cookie.save('isSidebarOpen',!this.props.isSidebarOpen,{path:'/',expires: exp});
  }
  componentDidMount(){
    this.props.getOrganizeList(this.props.token.team_uuid);
    this.props.getBalance();
    this.props.getLevels();
  }
  goToUrl(url){
    this.context.store.dispatch(navigate(url));
  }
  quit(){
    this.props.onCancel();
  }
  changeOrganize(e){
    if(e == -1){return false}
    let obj = {
      team_uuid:e,
      type:"organize"
    };
    this.props.changeAccount(obj);
  }
  refreshBalance(){
    this.props.getBalance();
  }
  render(){
    let user_info = this.context.store.getState().user_info||{};
    let organizeDetail = this.props.organizeDetail;
    let username = user_info.user_name;
    let src = user_info.user_avatar||user_info.team_avatar;
    let titleStyle = src?s.img:s.imgNo;
    let isUser = organizeDetail.team_type == "system";//判断当前组织是用户默认的还是其他的;
    let number = this.props.organizeList.length;
    let menuItem = <MenuItem>
          <div className={s.userList}>
              <div className={cx(s.hd,titleStyle)}>
                <img src={src} className={titleStyle} />
                <div>{username}</div>
                <div onClick = {this.goToUrl.bind(this,"/userInfo")}>等级: <span>L<span>{this.props.levels.level}</span>会员</span></div>
                <div onClick = {this.goToUrl.bind(this,"/userInfo")}>余额: <span className={s.mr10}>¥{this.props.balance.toFixed(2)}</span>
                  <Pay size="btn-xs" />
                </div>
              </div>
            {
              isUser?
                <div>
                  <div className={s.item} onClick = {this.goToUrl.bind(this,"/userInfo/1")}>
                    <p className="icon-perinfor"> </p>
                    <p>个人信息</p>
                  </div>
                  <div className={s.item} onClick = {this.goToUrl.bind(this,"/userInfo/2")}>
                    <p className="icon-containerconfig"> </p>
                    <p>我的组织</p>
                  </div>
                  <div className={s.item} onClick = {this.goToUrl.bind(this,"/userBilling/1")}>
                    <p className="icon-version"> </p>
                    <p>消费记录</p>
                  </div>
                  <div className={s.item} onClick = {this.goToUrl.bind(this,"/userBilling/2")}>
                    <p className="icon-project"> </p>
                    <p>充值记录</p>
                  </div>
                </div>
                :
                <div>
                  <div className={s.item} onClick = {this.goToUrl.bind(this,"/orgInfo/1")}>
                    <p className="icon-perinfor"> </p>
                    <p>组织信息</p>
                  </div>
                  <div className={s.item} onClick = {this.goToUrl.bind(this,"/orgInfo/2")}>
                    <p className="icon-containerconfig"> </p>
                    <p>组织管理</p>
                  </div>
                  <div className={s.item} onClick = {this.goToUrl.bind(this,"/orgBilling/1")}>
                    <p className="icon-version"> </p>
                    <p>消费记录</p>
                  </div>
                  <div className={s.item} onClick = {this.goToUrl.bind(this,"/orgBilling/2")}>
                    <p className="icon-project"> </p>
                    <p>充值记录</p>
                  </div>
                </div>
            }
          </div>
        </MenuItem>;
    let dropdown = <NavDropdown pullRight eventKey={4}
                                onClick = {this.refreshBalance.bind(this)}
                                title={<div className={titleStyle}><span>{username}</span></div>}
                                id="header-nav-item-userinfo">
                    {menuItem}
                    <MenuItem eventKey={4.1}
                      onClick = {this.quit.bind(this)}
                    >安全退出</MenuItem>
                  </NavDropdown>;
    let organizeList = this.props.organizeList.map((item,i) =>{
      if(isUser){
        if(item.team_name == username && number==1){
          return <MenuItem key={-1} eventKey={-1} className = {s.noOrganize}>暂无组织<span className={s.createOrg} onClick = {this.goToUrl.bind(this,"/userInfo/2")}>新建</span></MenuItem>;
        }else if(item.team_name == username) {
          return false;
        }else{
          return <MenuItem key={i} eventKey={item.team_uuid}>
              <div className={s.nav}>
                <p>{item.team_name}</p>
                <p>切换到该组织</p>
              </div>
            </MenuItem>
        }
      }else{
        if(item.team_name == organizeDetail.team_name){
          return false;
        }else {
          return <MenuItem key={i} eventKey={item.team_uuid}>
            <div className={s.nav}>
              <p>{item.team_name}</p>
              <p>{item.team_type == "system"?"切换到个人":"切换到该组织"}</p>
            </div>
          </MenuItem>
        }
      }
    });
    return (
      <header id="navbar">
        <div className={cx(s.box,"navbar-header","logo")}>
          <a href={HOSTNAME.INDEX} className={cx(s.logoBox,"navbar-brand")}>
            <img src="/images/logo.png" id = "logo" alt="boxLinker" className={s.logo} />
          </a>
        </div>
        <div id="navbar-container" className="boxed">
          <div className="navbar-content clearfix">
            <ul className="nav navbar-top-links pull-left">
              <li className="tgl-menu-btn">
                <a className="mainnav-toggle" href="javascript:;"
                  onClick = {this.onChangeSidebar.bind(this)}
                >
                  <i className={this.props.isSidebarOpen?"icon-withdraw":"icon-back"} aria-hidden="true"> </i>
                </a>
              </li>
              <li>
                <a href = "https://docs.boxlinker.com" target = "_blank">文档</a>
              </li>
              <li>
                <a href = "//git.boxlinker.com" target = "_blank">git</a>
              </li>
            </ul>
            <ul className="nav navbar-top-links pull-right">
              <NavItem className={s.loading}>
                {this.props.isLoading?<Loading type="bubbles" color="#000" height="30px" width="50px"/>:null}
              </NavItem>
              <li className={s.organize}>
                <Nav>
                  <NavDropdown title = {<span>组织{isUser?"":organizeDetail.team_name}</span>} id = "organizeList"
                    onSelect = {this.changeOrganize.bind(this)}
                  >
                    {organizeList}
                  </NavDropdown>
                </Nav>
              </li>
              <li className={s.lastNav}>
                <Nav>
                  {dropdown}
                </Nav>
              </li>
              {/*<li>*/}
                {/*<a href="javascript:;" className="aside-toggle">*/}
                  {/*<i className="icon-sandian"> </i>*/}
                {/*</a>*/}
              {/*</li>*/}
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

export default withStyles(s)(Header);
