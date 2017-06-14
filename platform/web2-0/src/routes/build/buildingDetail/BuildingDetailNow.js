
import React,{PropTypes,Component} from "react";
import {timeSubtraction,timeFormat,timeRange} from '../../../core/utils';
import Loading from "../../../components/Loading";
import Logs from "../../../components/Logs";
import {Tab,Tabs} from "react-bootstrap";
import s from "./BuildingDetail.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";
class BuildingDetailNow extends Component{
  static contextTypes = {
    setTitle: React.PropTypes.func,
    store:React.PropTypes.object
  };
  static propTypes = {
    buildProjectsDetail:React.PropTypes.object,
    buildingDetail:React.PropTypes.object,
    getBuildingDetail:React.PropTypes.func
  };
  componentDidMount(){
    this.props.getBuildingDetail(this.props.buildProjectsDetail.build_id);
  }
  getBuildingLog(){
    let data = this.props.buildProjectsDetail;
    if(data.build_id){
      return <Logs type = "build" logLabel={data.build_id}/>
    }else{
      return <pre ref="list" className="darken">
        暂无日志
      </pre>
    }
  }
  render(){
    let data = this.props.buildingDetail;
    if(data.a ==-1) return (<div style={{"textAlign":"center"}}><Loading /></div>);
    if(!data||!data.id) return (<div className="pad10 text-center">您还未构建,暂无构建详情</div>);
    return(
      <div className = {s.box}>
        <GetTabBox
          buildProjectsDetail = {this.props.buildProjectsDetail}
          buildDetail = {this.props.buildingDetail}
          getBuildingDetail={(id) =>{this.props.getBuildingDetail(id)}}
        />
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

class GetTabBox extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    buildProjectsDetail:React.PropTypes.object,
    buildDetail:React.PropTypes.object,
    getBuildingDetail:React.PropTypes.func
  };
  componentDidMount(){
    let state = this.props.buildDetail.state;
    if(state == "building"){
      let my = this;
      this.myTime = setTimeout(function(){
        my.props.getBuildingDetail(my.props.buildProjectsDetail.build_id);
      },5000)
    }else{
      clearTimeout(this.myTime);
    }
  }
  componentDidUpdate(){
    let state = this.props.buildDetail.state;
    if(state == "building"){
      let my = this;
      this.myTime = setTimeout(function(){
        my.props.getBuildingDetail(my.props.buildProjectsDetail.build_id);
      },5000)
    }else{
      clearTimeout(this.myTime);
    }
  }
  componentWillUnmount(){
    clearTimeout(this.myTime);
  }
  render(){
    let data = this.props.buildDetail;
    let buildBranchDetail = data,
      buildStatus = null,
      buildUseTime = null,
      agoTime = null;
    const username = this.context.store.getState().user_info.user_name;
    switch (data.state) {
      case "failed":
        buildStatus = <span className="text-danger">构建失败</span>;
        buildUseTime = timeSubtraction(buildBranchDetail.started_at, buildBranchDetail.completed_at) + "秒";
        agoTime = timeRange(buildBranchDetail.created_at);
        break;
      case "building":
        buildStatus = <span className="text-warning btn-loading">构建中</span>;
        buildUseTime = "--";
        agoTime = '--';
        break;
      case "succeeded":
        buildStatus = <span className="text-success">构建成功</span>;
        buildUseTime = timeSubtraction(buildBranchDetail.started_at, buildBranchDetail.completed_at) + "秒";
        agoTime = timeRange(buildBranchDetail.created_at);
        break;
      default:
        buildStatus = <span className="">还未构建</span>;
        buildUseTime = "还未构建";
        agoTime = "还未构建";
    }
    return (
      <div className={s.item}>
        <p>镜像名称:<span>{username+"/"+data.repository.split("/")[1]}</span></p>
        <ul className="clearfix">
          <li><span>分支名称 :</span><span>{data.branch}</span></li>
          <li><span>构建状态 :</span>{buildStatus}</li>
          <li><span>构建用时 :</span><span>{buildUseTime}</span></li>
          <li><span>操作用户 :</span><span>{""}</span></li>
          <li><span>完成时间 :</span><span>{agoTime}</span></li>
          {data.compare_url?<li><span>github事件 :</span><a href = "javascript:;">查看</a></li>:""}
          {data.commit_url?<li><span>提交对比 :</span><a href = "javascript:;">查看</a></li>:""}
        </ul>
      </div>
    )
  }
}

export default widthstyle(s)(BuildingDetailNow);
