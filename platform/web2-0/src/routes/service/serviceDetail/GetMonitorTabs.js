/**
 * Created by zhangsai on 16/9/2.
 */
import React,{ PropTypes,Component } from 'react';
import HeadLine from '../../../components/HeadLine';
import Monitor from '../../../components/Monitor';
import Loading from '../../../components/Loading';
import s from "./ServiceDetail.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";
import ReactDOM from "react-dom";

export default class extends Component{
  static contextTypes = {
    store:PropTypes.object,
    insertCss:React.PropTypes.func
  };
  static propTypes = {
    serviceDetail:React.PropTypes.object,
    podList :React.PropTypes.array,
  };
  constructor(props){
    super(props);
    this.state = {
      pod_name:props.podList[0].pod_name,
    }
  }
  componentDidMount(){
  }
  componentWillMount(){
    this.context.insertCss.apply(undefined, [s]);
  }
  changePods(e){
    this.setState({
      pod_name:e.target.value
    });
    let my = this;
    let pod_name = e.target.value;
    setTimeout(function(){
      my.refs.cpu.againFetch(pod_name);
      my.refs.memory.againFetch(pod_name);
      my.refs.network.againFetch(pod_name);
    },200)
  }

  render(){
    if(this.props.podList[0]==1) return(<div className="text-center"><Loading> </Loading></div>);
    if(this.props.podList.length==0) return(<div className={s.noMonitor}>该服务已关闭,未能显示监控信息</div>);
    let pod_name = this.props.podList[0].pod_name||"";
    let limits_cpu = this.props.serviceDetail.limits_cpu;
    switch (Number(limits_cpu)){
      case 8 :
        limits_cpu = 1000;
      break;
      case 16 :
        limits_cpu = 2000;
      break;
      default :
        limits_cpu = 200;
      break;
    }
    let userName = this.context.store.getState().user_info.user_name;
    let cpu = {
      userName: userName,
      pod_name: pod_name,
      type: "cpu",
      time_span: "1m"
    };
    let memory = {
      userName: userName,
      pod_name: pod_name,
      type: "memory",
      time_span: "1m"
    };
    let network = {
      userName: userName,
      pod_name: pod_name,
      type: "network",
      time_span: "1m"
    };
    let option = this.props.podList.map((item,i) => {
      return (
        <option value = {item.pod_name} key = {i}>{item.pod_name}</option>
      )
    });
    return(
      <div>
        <div className={s.pod}>
          <label>
            请选择容器实例:
          </label>
          <select className="form-control" onChange={this.changePods.bind(this)}>
            {option}
          </select>
        </div>
        <div className={s.item}>
          <HeadLine
            title="CPU监控"
            titleEnglish="CPU MONITOR"
            titleInfo="24小时"
          />
          <div className={s.bd}>
            <Monitor
              ref = "cpu"
              payload = {cpu}
              color = {["#7ed9fc"]}
              legend = {false}
              divisor = {limits_cpu}
              valueSuffix = "cores"
            >
            </Monitor>
          </div>
        </div>
        <div className={s.item}>
          <HeadLine
            title="内存监控"
            titleEnglish="MEMORY MONITOR"
            titleInfo="24小时"
          />
          <div className={s.bd}>
            <Monitor
              ref = "memory"
              payload = {memory}
              color = {["#b7e769"]}
              legend = {false}
              divisor = {1024*1024}
              valueSuffix = "M"
            >
            </Monitor>
          </div>
        </div>
        <div className={s.item}>
          <HeadLine
            title="网络监控"
            titleEnglish="NETWORK MONITOR"
            titleInfo="24小时"
          />
          <div className={s.bd}>
            <Monitor
              ref = "network"
              payload = {network}
              color = {["#f7a397","#b7e769"]}
              legend = {true}
              divisor = "1000"
              valueSuffix = "kBps"
            >
            </Monitor>
          </div>
        </div>
      </div>
    )
  }
}

// export default widthstyle(s)(GetMonitorTabs);
