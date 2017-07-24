
import React,{PropTypes,Component} from "react";
import {timeSubtraction,timeFormat,timeRange} from '../../../core/utils';
import * as Const from '../../../constants';
import Loading from "../../../components/Loading";
import Logs from "../../../components/Logs";
import {Tab,Tabs} from "react-bootstrap";
import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import s from "./BuildingDetail.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class BuildingDetailItem extends Component{
  static contextTypes = {
    setTitle: React.PropTypes.func,
    store:React.PropTypes.object
  };
  static propTypes = {
    buildId:React.PropTypes.string,
    deleteBuildId:React.PropTypes.func
  };
  constructor(){
    super();
    this.state = {
      data:{}
    }
  }
  componentWillUnmount(){
    this.props.deleteBuildId();
  }
  componentDidMount(){
    this.fetchBuildDetail(this.props.buildId);
  }
  fetchBuildDetail(id){
    let myInit = {
      method:"GET",
      headers:{
        token:cookie.load("_at"),
      }
    };
    let url = Const.FETCH_URL.AUTO_BUILD+"/builds/"+id;
    let my = this;
    fetch(url,myInit)
      .then(response =>response.json())
      .then(json=>{
        console.log(json,">>>>>构建详情");
        if(json.status == 0){
          my.setState({
            data:json.result
          })
        }else{
          console.error("构建详情失败",json)
        }
      })
  }
  getBuildingLog(){
    let id = this.props.buildId;
    if(id){
      return <Logs type = "build" logLabel={id}/>
    }else{
      return <pre ref="list" className="darken">
        暂无日志
      </pre>
    }
  }
  render(){
    let data = this.state.data;
    if(!data||!data.id) return (<div style={{"textAlign":"center"}}><Loading /></div>);
    const username = this.context.store.getState().user_info.user_name;
    let buildBranchDetail = data,
      buildStatus = null,
      buildUseTime = null,
      agoTime = null,
      style = "";
    switch (data.state) {
      case "failed":
        buildStatus = "构建失败";
        buildUseTime = timeSubtraction(buildBranchDetail.started_at, buildBranchDetail.completed_at) + "秒";
        agoTime = timeRange(buildBranchDetail.created_at);
        style = "text-danger";
        break;
      case "building":
        buildStatus = "构建中";
        buildUseTime = "--";
        agoTime = timeRange(buildBranchDetail.created_at);
        style = "text-warning";
        break;
      case "succeeded":
        buildStatus = "构建成功";
        buildUseTime = timeSubtraction(buildBranchDetail.started_at, buildBranchDetail.completed_at) + "秒";
        agoTime = timeRange(buildBranchDetail.created_at);
        style = "text-success";
        break;
      default:
        buildStatus = "还未构建";
        buildUseTime = "还未构建";
        agoTime = "还未构建";
        style = "";
    }
    return(
      <div className = {s.box}>
        <div className={s.item}>
          <p>镜像名称:<span>{username+"/"+data.repository.split("/")[1]}</span></p>
          <ul className="clearfix">
            <li><span>分支名称 :</span><span>{data.branch}</span></li>
            <li><span>构建状态 :</span><span className={style}>{buildStatus}</span></li>
            <li><span>构建用时 :</span><span>{buildUseTime}</span></li>
            <li><span>操作用户 :</span><span>{username}</span></li>
            <li><span>完成时间 :</span><span>{agoTime}</span></li>
            {data.compare_url?<li><span>github事件 :</span><a href = "javascript:;">查看</a></li>:""}
            {data.commit_url?<li><span>提交对比 :</span><a href = "javascript:;">查看</a></li>:""}
          </ul>
        </div>
        <div className={s.logBox}>
          <Tabs defaultActiveKey = {1} id = "otherNav-tabs">
            <Tab eventKey = {1} title = "日志">
              {this.getBuildingLog()}
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}
export default widthstyle(s)(BuildingDetailItem);
