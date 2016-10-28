

import React,{PropTypes,Component} from 'react';
import HeadLine from '../HeadLine';
import Loading from '../Loading';
import {navigate} from '../../actions/route';
import ReactDOM from 'react-dom';

class GetOrgAdmin extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    organizeUserList:React.PropTypes.array,
    getOrganizeUserList:React.PropTypes.func
  };

  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentWillMount(){
    let is_user = this.context.store.getState().user_info.is_user;
    console.log(is_user);
    if(is_user == 1){
      this.context.store.dispatch(navigate("/"));
    }
  }
  componentDidMount(){
    let organizeId = this.context.store.getState().user_info.orga_uuid;
   this.props.getOrganizeUserList(organizeId);
  }

  getOrganizeUserBody(){
    let data = this.props.organizeUserList;
    if(data[0] == 1) return <tr><td colSpan = "3" style = {{textAlign:"center"}}><Loading /></td></tr>;
    if(!data.length) return <tr><td colSpan = "3" style = {{textAlign:"center"}}>暂无数据~</td></tr>;
    return data.map((item,i) =>{
      return (
        <tr key = {i}>
          <td>
            <div className="mediaItem">
              <img className="mediaImg" src = "/slImgJx.png" />
              <span className="mediaTxt">123</span>
            </div>
          </td>
          <td>123</td>
          <td>123</td>
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

  render(){
    return (
      <div className="organize">
        <div className="organizeHd hbHd clearfix">
          <div className = "left">
            <HeadLine
              title = "组织管理"
              titleEnglish = "ORGANIZE"
              titleInfo = "管理组织信息"
            />
          </div>
        </div>
        <div className="organizeBd sl-bd TableTextLeft">
          {this.getTableDemo()}
        </div>
      </div>
    )
  }
}

export default  GetOrgAdmin;
