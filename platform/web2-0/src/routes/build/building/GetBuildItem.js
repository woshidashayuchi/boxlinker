import React,{Component} from 'react';
import {SplitButton,MenuItem,
} from 'react-bootstrap';
import Link from '../../../components/Link';
import Loading from 'react-loading';
import fetch from 'isomorphic-fetch'
import {timeSubtraction,timeFormat,timeRange} from '../../../core/utils';
import * as Const from "../../../constants";
import s from "./Building.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";
import cookie from 'react-cookie'

class GetBuildItem extends Component{
  static propTypes = {
    data:React.PropTypes.object,
    getBuildBranch:React.PropTypes.func,
    fastBuilding:React.PropTypes.func,
    deleteLine:React.PropTypes.func,
    user_name:React.PropTypes.string
  };
  constructor(){
    super();
    this.state = {
      branch:[]
    }
  }
  componentDidMount(){
    this.getBranch(this.props.data.id);
  }
  building(a,b){
    let value = this.refs.branch.value;
    this.props.fastBuilding(a,b,value)
  }
  getBranch(id){
    let myInit = {
      method:"GET",
      headers:{
        token:cookie.load("_at"),
      }
    };
    let my = this;
    let url = Const.FETCH_URL.AUTO_BUILD+"/project/"+id+"/branches";
    fetch(url,myInit)
      .then(response =>response.json())
      .then(json=>{
        console.log(json,">>>>>   分支列表");
        if(json.status == 0){
          my.setState({
            branch:json.result
          })
        }else{
          console.error("分支列表",json)
        }
      })
  }
  render(){
    let buildStatus = null,
      buildUseTime = null,
      prevUseTime = null,
      user_name = this.props.user_name;
    let item = this.props.data;
    switch(item.state) {
      case "failed":
        buildStatus = <span className="text-danger">构建失败</span>;
        buildUseTime = timeSubtraction(item.started_at, item.completed_at)+"秒";
        prevUseTime = timeRange(item.create_at);
        break;
      case "pending":
        buildStatus = <span className="">还未构建</span>;
        buildUseTime = "还未构建";
        prevUseTime = "还未构建";
        break;
      case "building":
        buildStatus = <span className="text-warning btn-loading">构建中</span>;
        buildUseTime = "--";
        prevUseTime = timeRange(item.create_at);
        break;
      case "succeeded":
        buildStatus = <span className="text-success">构建成功</span>;
        buildUseTime = timeSubtraction(item.started_at, item.completed_at)+"秒";
        prevUseTime = timeRange(item.create_at);
        break;
      default :
        buildStatus = <span className="">还未构建</span>;
        buildUseTime = "还未构建";
        prevUseTime = "还未构建";
    }
    let option = null;
    if(this.state.branch[0] != -1) {
      if (this.state.branch.length == 0) {
        option = <select className={cx(s.select,"form-control")} ref="branch" defaultValue={item.default_branch}>
          <option value="master">master</option>
        </select>
      } else {
        option = <select key = {new Date().getTime() + 1} className={cx(s.select,"form-control")} ref="branch" defaultValue={item.default_branch}>
          {this.state.branch.map((item, i) => {
            return <option key={i} value={item.name}>{item.name}</option>
          })}
        </select>
      }
    }else {
      option = <div className="tableLoading"><Loading type="bubbles" color="#24a8d9" height="20px" width="40px"/></div>
    }
    return(
      <tr>
        <td>
          <Link to={`/buildingDetail/${item.id}`}>
            <div className="mediaItem">
              <img className="mediaImg" src = "/images/slImgJx.png" />
              <span className="mediaTxt">{user_name+"/"+item.repository.split("/")[1]}</span>
            </div>
          </Link>
        </td>
        <td>
          <a href = {item.repo_url} className={cx(s.tabP,"clLink")} target = "_blank">{item.repo_url}</a>
        </td>
        <td><span className="cl3">{buildStatus}</span></td>
        <td><span className="cl3">{buildUseTime}</span></td>
        <td><span className="cl3">{prevUseTime}</span></td>
        <td>
          {option}
        </td>
        <td>
          <SplitButton
            disabled = {item.state == "building"}
            pullRight
            onClick={this.building.bind(this,item.repository,item.source)}
            onSelect={this.props.deleteLine.bind(this,item.id)}
            bsStyle="primary" title="构建" id={`building-table-line`}>
            <MenuItem eventKey="1">删除</MenuItem>
          </SplitButton>
        </td>
      </tr>
    )
  }
}
export default widthstyle(s)(GetBuildItem);
