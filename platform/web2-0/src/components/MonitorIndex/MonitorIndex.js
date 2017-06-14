
import React,{ PropTypes,Component } from 'react';
import {timeFormat} from '../../core/utils';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from "./MonitorIndex.css";
import cx from "classnames";
const ReactHighcharts = require('react-highcharts');

class MonitorIndex extends React.Component {
  static contextTypes = {
    store:React.PropTypes.object
  };
  constructor(props){
    super(props);
    this.state = {
      newData:{xAxis:[],series:[]},
      data:this.props.data,
    }
  }
  static propTypes = {
    name :React.PropTypes.string,
    data:React.PropTypes.array,
    color:React.PropTypes.array,
    legend:React.PropTypes.bool,
    divisor:React.PropTypes.number,
    valueSuffix:React.PropTypes.string
  };

  componentDidMount(){

  }
  componentWillUnmount(){
  }
  render(){
    let my = this;
    let monitor = {};
    let xAxis = [];
    let seriesName = [];
    let seriesValue = [];
    seriesName.push(this.props.name);
    seriesValue.push(this.props.data);
    let series = seriesValue.map((item,i) => {
      let newSeries = {};
      let arr = [];
      let cs = Math.floor(seriesValue[i].length/12);
      seriesValue[i].map((obj,j) => {
        if(j%cs == 0) {
          xAxis.push(timeFormat(obj[0],"hh:mm"));
          if(j!=0) {
            let number = obj[1] ? obj[1] / my.props.divisor : 0;
            arr.push(Number(number.toFixed(2)));
          }
        }
      });
      newSeries.data = arr;
      newSeries.name = "已使用";
      return newSeries;
    });
    monitor.xAxis = xAxis;
    monitor.series = series;
    console.log(monitor,">>>>>>>>>>>")
    const config = {
      chart: {
        type: 'area',
        animation: false,
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: monitor.xAxis,
        tickInterval:2
      },
      yAxis:{
        title: {//纵轴标题
          text: ''
        },
        labels: {
          formatter: function () {
            return this.value + my.props.valueSuffix;
          }
        }

      },
      legend: {
        enabled: my.props.legend
      },
      // colors:my.props.color,
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
      series: monitor.series

    };
    return (
      <div className={s.box}>
        <p ref = "noMonitor" className={s.no}> </p>
        <div className={s.item}>
          {
            <ReactHighcharts config={config} />
          }
        </div>
      </div>
    )
  }
}
export default withStyles(s)(MonitorIndex)
