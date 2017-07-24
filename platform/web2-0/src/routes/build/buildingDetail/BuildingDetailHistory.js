import React,{PropTypes,Component} from "react";
import {timeSubtraction,timeRange} from '../../../core/utils';
import s from "./BuildingDetail.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class BuildingDetailHistory extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    buildProjectsDetail:React.PropTypes.object,
    getBuildHistory:React.PropTypes.func,
    buildHistory:React.PropTypes.array,
  };
  componentDidMount(){
    let repository = this.props.buildProjectsDetail.repository.split("/");
      let data = {
        source:"github",
        username:repository[0],
        repo:repository[1],
        current_page:1,
        page_num:20
      };
      this.props.getBuildHistory(data);
  }
  getHistoryHtml(){
    let html = this.props.buildHistory.map((data,i) =>{
      let buildStatus = null,
          buildUseTime = null,
          agoTime = null;
      switch (data.state) {
        case "failed":
          buildStatus = <span className="text-danger">构建失败</span>;
          buildUseTime = timeSubtraction(data.started_at, data.completed_at) + "秒";
          agoTime = timeRange(data.created_at);
          break;
        case "building":
          buildStatus = <span className="text-warning btn-loading">构建中</span>;
          buildUseTime = "--";
          agoTime = '--';
          break;
        case "succeeded":
          buildStatus = <span className="text-success">构建成功</span>;
          buildUseTime = timeSubtraction(data.started_at, data.completed_at) + "秒";
          agoTime = timeRange(data.created_at);
          break;
        default:
          buildStatus = <span className="">还未构建</span>;
          buildUseTime = "还未构建";
          agoTime = "还未构建";
      }
      return (
        <div className={s.branch} key = {i}>
          <ul className="clearfix">
            <li>
              <p><span>{data.branch}</span></p>
              <p><span>{data.pusher}</span></p>
            </li>
            {data.commit_url?<li>
              <p><span>commit详情</span></p>
              <p><a href={data.commit_url} target = "_blank" className="aLink">Github</a></p>
            </li>:""}
            <li>
              <p>{buildStatus}</p>
              <p><span>{agoTime}</span></p>
            </li>
            <li>
              <p><span>构建用时</span></p>
              <p><span>{buildUseTime}</span></p>
            </li>
          </ul>
        </div>
      )
    });
    html.sort(function(a,b){
      let t1 = a.key;
      let t2 = b.key;
      return t2-t1
    });
    return html;
  }
  render(){
    if(this.props.buildHistory.length == 0){
      return(<div className="pad10 text-center">您还未构建,暂无构建历史</div>);
    }
    return (
      <div className={s.box}>
        {this.getHistoryHtml()}
      </div>
    )
  }
}
export default widthstyle(s)(BuildingDetailHistory);
