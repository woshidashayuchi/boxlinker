import React from 'react';
import s from "./ServiceDetail.css";
import cx from 'classnames';
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import Loading from '../../../components/Loading';

class GetContainerTabs extends React.Component{
  static propTypes = {
    podList:React.PropTypes.array
  };
  componentDidMount(){
  }
  getTableLine(){
    let podList = this.props.podList;
    if (podList[0] ==1) return <tr><td colSpan="4"><Loading /></td></tr>;
    if(podList.length == 0) return <tr><td colSpan="4">暂无数据~</td></tr>;
    let body = [];
    podList.map((item,i) => {
      let n = item.containers.length;
      let port = item.containers.map((obj, j) => {
        let d = n == j + 1 ? "" : ",";
        return obj.container_port + "/" + obj.access_mode + d;
      });
      let txt = null;
      switch(item.pod_phase){
        case "Running":
          txt = "运行中";
          break;
        case "Pending":
          txt = "创建中";
          break;
        case "Stopping":
          txt = "已停止"
      }
      body.push(
        <tr key={i}>
          <td>{item.pod_name}</td>
          <td>{item.pod_ip}</td>
          <td>{port}</td>
          <td>
            <div
              className={`mirror-state ${item.pod_phase == "Running" ? "on" : "off"} tablePaddingLeft`}>
              {txt}
            </div>
          </td>
        </tr>
      )
    });
    return body;
  }
  render(){
    return(
      <div className={cx(s.item,'tableBox tableBox-center')}>
        <div className={s.table}>
        <table className="table table-hover table-bordered volumes-table">
          <thead>
          <tr>
            <th>名称</th>
            <th>IP</th>
            <th>端口</th>
            <th>状态</th>
          </tr>
          </thead>
          <tbody>
          {this.getTableLine()}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}

export default widthstyle(s)(GetContainerTabs);
