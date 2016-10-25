import React, { Component } from 'react';
import Loading from 'react-loading'
import cookie from 'react-cookie'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem,
} from 'react-bootstrap';

class Header extends Component {
  static propTypes = {
    isLoading: React.PropTypes.bool,
    isSidebarOpen: React.PropTypes.bool.isRequired,
    onSidebarToggleClick: React.PropTypes.func,
    goToUserCenter:React.PropTypes.func
  };
  static contextTypes = {
    store: React.PropTypes.object
  };
  handleSelect(key){
    console.log(key);
    switch (key) {
      case 1:
            this.props.onSidebarToggleClick(!this.props.isSidebarOpen);
            var exp = new Date();
            exp.setTime(exp.getTime()+1000*60*60*24*7);
            cookie.save('isSidebarOpen',!this.props.isSidebarOpen,{path:'/',expires: exp});
            break;
      case 3:
            this.props.goToUserCenter();
            break;
      case 4.1:
            cookie.remove('_at')
            localStorage.removeItem('_at');
            localStorage.removeItem('sidebarActive');
            location.href = '/login';
            break;
    }
  }
  render(){
    const username = this.context.store.getState().user_info.user_name;
    let dropdown = username?
      <NavDropdown eventKey={4} title={username} id="header-nav-item-userinfo">
        <MenuItem eventKey={2}>创建组管理</MenuItem>
        <MenuItem eventKey={3}>用户中心</MenuItem>
        <MenuItem eventKey={4.1}>退出</MenuItem>
      </NavDropdown>:null
    return (
      <Navbar fixedTop={true} className="app-navbar" style={{left:"180px"}}>
        <Nav onSelect={this.handleSelect.bind(this)}>
          <NavItem eventKey={1} href="javascript:void(0)"><i className={this.props.isSidebarOpen?"icon-withdraw":"icon-back"} aria-hidden="true"></i></NavItem>
        </Nav>
        <Nav pullRight onSelect={this.handleSelect.bind(this)} style={{marginRight:"0"}}>
          <NavItem className="loading-animation">{this.props.isLoading?<Loading type="bubbles" color="#fff" height="50px" width="50px"/>:null}</NavItem>
          {dropdown}
        </Nav>

      </Navbar>
    )
  }

}

export default Header;
// export default withStyles(s)(Header);
