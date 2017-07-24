
import React, { PropTypes } from 'react';
import s from './Layout.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import BreadcrumbContainer from './BreadcrumbContainer'
import SidebarContainer from './SidebarContainer';
import HeaderContainer from './HeaderContainer';
import Notification from './Notification';
import cookie from 'react-cookie';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isSidebarOpen: React.PropTypes.bool,
    notifications: React.PropTypes.object,
    onSidebarToggleClick: React.PropTypes.func,
  };
  constructor(){
    super();
    this.state = {
      type:""
    }
  }
  componentDidMount(){
    let my = this;
    let width = window.innerWidth;
    if(width<768){
      my.setState({
        type:"mainnav-in"
      });
      my.refs.app.className = "app effect aside-float aside-bright navbar-fixed mainnav-lg mainnav-in";
      if(!my.props.isSidebarOpen){
        my.props.onSidebarToggleClick(!my.props.isSidebarOpen);
      }
    }else if(width<980&&width>768){
      my.setState({
        type:""
      });
      my.refs.app.className = "app effect aside-float aside-bright navbar-fixed mainnav-lg sidebar-close mainnav-sm";
      if(my.props.isSidebarOpen){
        my.props.onSidebarToggleClick(!my.props.isSidebarOpen);
      }
    }else{
      my.refs.app.className = "app effect aside-float aside-bright navbar-fixed mainnav-lg";
      my.props.onSidebarToggleClick(true);
      my.setState({
        type:""
      });
    }
    window.onresize = function(){
      my.windowWidth = window.innerWidth;
      let width = window.innerWidth;
      if(width<768){
        my.setState({
          type:"mainnav-in"
        });
        my.refs.app.className = "app effect aside-float aside-bright navbar-fixed mainnav-lg mainnav-in";
        if(!my.props.isSidebarOpen){
          my.props.onSidebarToggleClick(!my.props.isSidebarOpen);
        }
      }else if(width<980&&width>768){
        my.setState({
          type:""
        });
        my.refs.app.className = "app effect aside-float aside-bright navbar-fixed mainnav-lg sidebar-close mainnav-sm";
        if(my.props.isSidebarOpen){
          my.props.onSidebarToggleClick(!my.props.isSidebarOpen);
        }
      }else{
        my.refs.app.className = "app effect aside-float aside-bright navbar-fixed mainnav-lg";
        my.props.onSidebarToggleClick(true);
        my.setState({
          type:""
        });
      }
    };
  }
  closeSidebar(){
    this.refs.app.className = "app effect aside-float aside-bright navbar-fixed mainnav-lg mainnav-in";
    if(!this.props.isSidebarOpen){
      this.props.onSidebarToggleClick(!this.props.isSidebarOpen);
    }
  }
  render(){
    let notification = (this.props.notifications&&this.props.notifications.message)?
      <Notification obj={this.props.notifications}/>:null;
    return (
      <div ref = "app" className={`${s.box} app effect aside-float aside-bright navbar-fixed mainnav-lg ${this.state.type} ${this.props.isSidebarOpen?"":"sidebar-close mainnav-sm"}`} id = "container" >
        <HeaderContainer/>
        <div id = "content-container">
          <div className="containerInner">
            <BreadcrumbContainer />
            <div className={s.containerBody}>
              {this.props.children}
            </div>
          </div>

        </div>
        <SidebarContainer/>
        {
          !this.props.isSidebarOpen?<div id = "close" onClick={this.closeSidebar.bind(this)} className={s.close}></div>:null
        }
        {notification}
      </div>
    )
  }
}

export default withStyles(s)(Layout);
