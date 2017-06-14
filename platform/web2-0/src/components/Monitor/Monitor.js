
import React,{ PropTypes,Component } from 'react';
import * as Const from '../../constants';
import fetch from 'isomorphic-fetch';
import {timeFormat} from '../../core/utils';
import {isLoadingAction} from "../../actions/header";
import Loading from "../Loading";
import cookie from 'react-cookie';
import s from "./Monitor.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";
const ReactHighcharts = require('react-highcharts');

export default class extends Component {
  static contextTypes = {
    store:React.PropTypes.object,
    insertCss:React.PropTypes.func
  };
  constructor(props){
    super(props);
    this.state = {
      data:{xAxis:[],series:[]},
      payload:this.props.payload,
      time:"60m"
    }
  }
  static propTypes = {
    payload:React.PropTypes.object,
    color:React.PropTypes.array,
    legend:React.PropTypes.bool,
    valueSuffix:React.PropTypes.string
  };
  fetchGetMonitorDataAction(data,time_long) {
    let myInit = {
      method : "GET",
      headers:{token:cookie.load("_at")},
    };
    let my = this;
    this.context.store.dispatch(isLoadingAction(true));
    let url = Const.FETCH_URL.MONITOR+"/monitors/pods/"+data.pod_name+"/"+data.type+"?time_long="+time_long;
    fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        my.context.store.dispatch(isLoadingAction(false));
        console.log(json,data.type);
        if(json.status == 0){
          let monitor = {};
          let xAxis = [];
          let seriesName = [];
          let seriesValue = [];
          if(!json.result[0].name){
            seriesValue[0] =[];
            seriesValue[1] =[];
            my.refs.noMonitor.innerHTML = "监控信息需要一段时间缓冲,请稍后再试";
            if (data.type == "memory") {
              seriesName.push("memory");
              let nowTime = new Date().getTime();
              let number = parseInt(time_long);
              for(let n = 0;n<number;n++){
                let timeData = [];
                timeData[0] = nowTime - (number-n)*60*1000;
                timeData[1] = null;
                seriesValue[0].push(timeData);
              }
            }else if(data.type == "cpu"){
              seriesName.push("cpu");
              let nowTime = new Date().getTime();
              let number = parseInt(time_long);
              for(let n = 0;n<number;n++){
                let timeData = [];
                timeData[0] = nowTime - (number-n)*60*1000;
                timeData[1] = null;
                seriesValue[0].push(timeData);
              }
            }else{
              seriesName.push("network");
              let nowTime = new Date().getTime();
              let number = parseInt(time_long);
              for(let n = 0;n<number;n++){
                let timeData = [];
                timeData[0] = nowTime - (number-n)*60*1000;
                timeData[1] = null;
                seriesValue[0].push(timeData);
                seriesValue[1].push(timeData);
              }
            }
          }else {
            my.refs.noMonitor.innerHTML = "";
            json.result.map((item, i) => {
              if (data.type == "memory") {
                if (i == 2) {
                  seriesName.push("已使用");
                  seriesValue.push(item.value);
                }
              } else if (data.type == "cpu") {
                if (i == 1) {
                  seriesName.push("已使用");
                  seriesValue.push(item.value);
                }
              } else {
                seriesName.push(item.name.split("/")[1]);
                seriesValue.push(item.value);
              }
            })
          };
          let series = seriesValue.map((item,i) => {
            let newSeries = {};
            let arr = [];
            seriesValue[i].map((obj,j) => {
              xAxis.push(timeFormat(obj[0],"hh:mm"));
              if(j!=0) {
                let number = obj[1] ? obj[1] / my.props.divisor : 0;
                arr.push(Number(number.toFixed(2)));
              }
            });
            if(data.type == "network"){
              newSeries.name = seriesName[i]=="rx_rate"?"入网":"出网";
            }else{
              newSeries.name = seriesName[i]
            }

            newSeries.data = arr;
            return newSeries;
          });
          monitor.xAxis = xAxis;
          monitor.series = series;
          console.log(monitor,">>>>>>>>>>>")
          my.setState({
            data:monitor
          })
        }
      })
      .catch((e)=>{
        my.context.store.dispatch(isLoadingAction(false));
      })
  }

  componentDidMount(){
    let data = this.props.payload ;
    this.fetchGetMonitorDataAction(data,this.state.time);
    let my = this;
    this.myTime = setInterval(function(){
      my.fetchGetMonitorDataAction(data,my.state.time);
    },60000)
  }
  againFetch(pod_name){
    clearInterval(this.myTime);
    let data = this.props.payload ;
    data.pod_name = pod_name;
    this.fetchGetMonitorDataAction(data,this.state.time);
    let my = this;
    this.myTime = setInterval(function(){
      my.fetchGetMonitorDataAction(data,my.state.time);
    },60000)
  }
  componentWillUnmount(){
    clearInterval(this.myTime);
  }
  componentWillMount(){
    this.context.insertCss.apply(undefined, [s]);
  }
  changeTime(time){
    let data = this.props.payload ;
    this.setState({
      time:time
    });
    let my = this;
    setTimeout(function(){
      my.fetchGetMonitorDataAction(data,my.state.time);
    },200);
  }
  render(){
    let my = this;
    const config = {
      chart: {
        type: 'area',
        animation: false
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: my.state.data.xAxis,
        tickInterval: 5,
        // minorGridLineDashStyle: 'solid',
        // minorTickInterval: 'auto',
        // minorTickWidth: 0
      },
      yAxis:{
        title: {//纵轴标题
          text: ''
        },
        labels: {
          formatter: function () {
            return this.value + my.props.valueSuffix;
          }
        },
        // minorGridLineDashStyle: 'longdash',
        // minorTickInterval: 'auto',
        // minorTickWidth: 0

      },
      legend: {
        enabled: my.props.legend
      },
      colors:my.props.color,
      title:{
        text:null
      },
      plotOptions: {
        series: {
          animation: false
        },
        area: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
        },
      },
      tooltip: {
        valueSuffix:""
      },
      series: my.state.data.series

    };
    return (
      <div className={s.box}>
        <div className={s.hd}>
          <BtnGroup
            activeKey={0}
            prop={["1小时","6小时","1天"]}
            type = "memory"
            onSelect={this.changeTime.bind(this)}
          >
          </BtnGroup>
        </div>
        <p ref = "noMonitor" className={s.bd}> </p>
        <div className={s.ft}>
          {
            !this.state.data.xAxis.length?<Loading/>:<ReactHighcharts config={config} />
          }
        </div>
      </div>
    )
  }
}
class BtnGroup extends  Component{
  static propTypes = {
    prop:React.PropTypes.array,
    type:React.PropTypes.string,
    onSelect:React.PropTypes.func,
    activeKey:React.PropTypes.number
  };
  constructor(props){
    super(props);
    this.state = {
      active:this.props.activeKey
    }
  }
  handelSelect(i){
    this.setState({
      active:i
    });
    let time = "";
    switch (i){
      case 0:
        time = "60m";
        break;
      case 1:
        time = "360m";
        break;
      case 2:
        time = "1440m";
        break;
      default :
        time = "60m"
    }
    this.props.onSelect(time);
  }
  render(){
    let html = this.props.prop.map((item,i) => {
      return <button key = {i} className={`btn btn-default btn-xs ${this.state.active == i?"btn-primary":""}`}
                     onClick={this.handelSelect.bind(this,i)}
      >{item}</button>
    });
    return(
      <div className={s.btn}>
        {html}
      </div>
    )
  }

}

// export default widthstyle(s)(Monitor)
