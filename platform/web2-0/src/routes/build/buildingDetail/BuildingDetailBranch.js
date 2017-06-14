
import React,{PropTypes,Component} from "react";
import {timeSubtraction,timeRange} from '../../../core/utils';
import Loading from "../../../components/Loading";
import {receiveBuildBranch,receiveClearBuildBranchHistory,addOtherHistory} from '../../../actions/building';
import s from "./BuildingDetail.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class BuildingDetailBranch extends Component{
  static contextTypes = {
    setTitle: React.PropTypes.func,
    store:React.PropTypes.object
  };
  static propTypes = {
    buildProjectsDetail:React.PropTypes.object,
    getBuildBranchHistory:React.PropTypes.func,
    buildBranchHistory:React.PropTypes.array,
    getBuildBranch:React.PropTypes.func,
    buildBranch:React.PropTypes.array,
    goToDetail:React.PropTypes.func,
    otherHistory:React.PropTypes.array
  };
  componentDidMount(){
    console.log(this.props.buildBranch)
  }
  getHistoryItem(){
    let itemBox = this.props.buildBranch.map((item,i) =>{
      return (
        <GetHistoryItem
          key = {i}
          branchName = {item.name}
          projectName = {this.props.buildProjectsDetail.repository}
          buildBranchHistory = {this.props.buildBranchHistory}
          getBuildBranchHistory = {(data) =>{this.props.getBuildBranchHistory(data)}}
          goToDetail = {(data) =>{this.props.goToDetail(data)}}
          otherHistory = {this.props.otherHistory}
        />
      )
    });
    return itemBox;
  }
  render(){
    if(!this.props.buildBranch.length) return <div className="pad10"><Loading/></div>;
    return(
      <div className="buildingDetailItem assItem">
        {this.getHistoryItem()}
      </div>
    )
  }
}

class GetHistoryItem extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    branchName:React.PropTypes.string,
    projectName:React.PropTypes.string,
    buildBranchHistory:React.PropTypes.array,
    getBuildBranchHistory:React.PropTypes.func,
    goToDetail:React.PropTypes.func,
    otherHistory:React.PropTypes.array
  };
  componentWillMount(){
    let branchData = {name:this.props.branchName,historyData:null};
    this.context.store.dispatch(receiveBuildBranch(branchData));
  }
  componentDidMount(){
    console.log(this.props.branchName,">>>",this.props.buildBranchHistory);
    let repository = this.props.projectName.split("/");
    let dataBranch = {
      source:"github",
      username:repository[0],
      repo:repository[1],
      branch:this.props.branchName,
      current_page:1,
      page_num:20
    };
    this.props.getBuildBranchHistory(dataBranch);

  }
  componentWillUnmount(){
    this.context.store.dispatch(receiveClearBuildBranchHistory([]));
  }
  onGoToDetail(id,branch,i){
    this.props.otherHistory.map((item,i) =>{

    });
    let data = {
      buildId:id,
      text:branch+" : #"+i,
      name:branch+" : #"+i,
    };
    console.log(data);
    this.context.store.dispatch(addOtherHistory(data));
    let my = this;
    setTimeout(function(){
      my.props.goToDetail(id);
    },100);
  }
  getBranchHistory(){
    let data = null;
    this.props.buildBranchHistory.map((item,i) =>{
      if(item.name == this.props.branchName){
        data = item;
      }
    });
    let buildBranchDetail = null,
      buildBranchName = null,
      buildStatus = null,
      buildUseTime = null,
      agoTime = null,
      style = null,
      otherData = null,
      otherLi = null;
    if(!data.historyData || !data.historyData.length){
      buildBranchName = data.name;
      buildStatus = "还未构建";
      buildUseTime = "还未构建";
      agoTime = "还未构建";
      style = "";
    }else{
      buildBranchDetail = data.historyData[0];
      buildBranchName = buildBranchDetail.branch;
      if(data.historyData.length>1){
        otherData = data.historyData.slice(1);
        otherLi = otherData.map((item,i) =>{
          let state = null;
          switch (item.state){
            case "failed":
              state = <span className="danger icon-fail">构建失败</span>;
              break;
            case "building":
              state = <span className="warning icon-refresh">构建中...</span>;
              break;
            case "succeeded":
              state = <span className="success icon-finish">构建成功</span>;
              break;
          }
          if(i>=3){return false}
          return (<div key = {i} className={s.branchBtn}
                       onClick = {this.onGoToDetail.bind(this,item.id,item.branch,i+1)}>
            <span>{`#${i+1}`}</span>
            {state}
          </div>)
        });
      }
      switch (buildBranchDetail.state) {
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
    }
    return (
      <div className={s.branch}>
        <ul className="clearfix">
          <li>
            <p><span>{buildBranchName}</span></p>
            <p><span>2次构建</span></p>
          </li>
          <li>
            <p><span className={style}>{buildStatus}</span></p>
            <p><span>{agoTime}</span></p>
          </li>
          <li>
            <p><span>构建用时</span></p>
            <p><span>{buildUseTime}</span></p>
          </li>
          <li>
            {otherLi}
          </li>
        </ul>
      </div>
    );
  }
  render(){
    if(!this.props.buildBranchHistory.length) return <div className="pad10"><Loading/></div>;
    return(
      <div className={s.box}>
        {this.getBranchHistory()}
      </div>
    )
  }
}
export default widthstyle(s)(BuildingDetailBranch);

