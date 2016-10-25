/**
 * Created by zhangsai on 16/9/2.
 */
import React,{ PropTypes,Component } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';

import cx from 'classnames';
import s from './ServiceDetail.css';
import HeadLine from '../HeadLine';
import Monitor from '../Monitor';
import Loading from '../Loading';

class GetMonitorTabs extends Component{
  static contextTypes = {
    store:PropTypes.object
  };
  static propTypes = {
    serviceDetail:React.PropTypes.object,
    podList :React.PropTypes.array,
    getMonitorData:React.PropTypes.func,
    monitorData:React.PropTypes.object
  };
  constructor(props){
    super(props);
    this.state = {
      pod_name:this.props.podList[0].pod_name
    }
  }
  componentDidMount(){
  }
  changeTime(type,time){
    let userName = this.context.store.getState().user_info.user_name;
    let pod_name = this.state.pod_name;
    let data = {
      userName: userName,
      pod_name: pod_name,
      type: type,
      time_long: time,
      time_span: "1m"
    };
    console.log(data);
    this.props.getMonitorData(data);
  }

  changePods(e){
    console.log(e.target.value);
    this.setState({
      pod_name:e.target.value
    })
  }

  render(){
    if(!this.state.pod_name) return(<div className="text-center"><Loading> </Loading></div>);
    let userName = this.context.store.getState().user_info.user_name;
    let pod_name = this.state.pod_name;
    let memory = {
      userName: userName,
      pod_name: pod_name,
      type: "memory",
      time_long: "30m",
      time_span: "1m"
    };
    let netWork = {
      userName: userName,
      pod_name: pod_name,
      type: "network",
      time_long: "30m",
      time_span: "1m"
    };
    let cpu = {
      userName: userName,
      pod_name: pod_name,
      type: "cpu",
      time_long: "30m",
      time_span: "1m"
    };
    let option = this.props.podList.map((item,i) => {
      return (
        <option value = {item.pod_name} key = {i}>{item.pod_name}</option>
      )
    });
    return(
      <div>
        <div className="choosePods">
          <label>
            请选择容器实例:
          </label>
          <select className="form-control" onChange={this.changePods.bind(this)}>
            {option}
          </select>
        </div>
        <div className={cx(s.assItem)}>
          <HeadLine
            title="CPU监控"
            titleEnglish="CPU MONITOR"
            titleInfo="24小时"
          />
          <div className={s.assBox}>
            <Monitor
              payload = {cpu}
              color = {["#7ed9fc"]}
              legend = {false}
              divisor = "1"
              valueSuffix = "K"
            >
            </Monitor>
          </div>
        </div>
        <div className={cx(s.assItem)}>
          <HeadLine
            title="内存监控"
            titleEnglish="MEMORY MONITOR"
            titleInfo="24小时"
          />
          <div className={s.assBox}>
            <Monitor
              payload = {memory}
              color = {["#b7e769"]}
              legend = {false}
              divisor = "1000000"
              valueSuffix = "M"
            >
            </Monitor>
          </div>
        </div>
        <div className={cx(s.assItem)}>
          <HeadLine
            title="网络监控"
            titleEnglish="NETWORK MONITOR"
            titleInfo="24小时"
          />
          <div className={s.assBox}>
            <Monitor
              payload = {netWork}
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

export default withStyle(s)(GetMonitorTabs);
