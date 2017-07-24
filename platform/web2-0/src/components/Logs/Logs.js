
import React from 'react'
import ReactDOM from 'react-dom'
import * as Const from '../../constants'
import cookie from 'react-cookie'
import {timeFormat} from '../../core/utils';
import DatePicker from 'react-bootstrap-date-picker';
import {Tooltip,OverlayTrigger} from "react-bootstrap";
import s from "./Logs.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";
import fetch from 'isomorphic-fetch';
import {isLoadingAction} from '../../actions/header';

export default class extends React.Component {
  static contextTypes = {
    insertCss:React.PropTypes.func,
    store:React.PropTypes.object
  };
  constructor(){
    super();
    this.state = {
      items:[],
      buildTxt :"Loading...",
      time:""
    }
  }
  shutByHand = false;
  xhr = null;
  start_time = "None";
  static propTypes = {
    logLabel: React.PropTypes.string,
    service_uuid:React.PropTypes.string,
    type:React.PropTypes.string,
    value:React.PropTypes.string,
    tabs:React.PropTypes.string
  };
  fetchLogs(logLabel,time){
    let me = this;
    let url = null;
    if (!logLabel) return console.info('fetch log with null label');
    var xhr = this.xhr;
    if (!xhr) return console.error('fetch log with null xhr!');
    if(this.props.type =="build"){
      url = Const.FETCH_URL.AUTO_BUILD+"/logs/"+logLabel;
    }else{
      url = time?
          Const.FETCH_URL.LOGS+"/"+logLabel+"?service_uuid="+this.props.service_uuid+"&start_time="+time
        :
          Const.FETCH_URL.LOGS+"/"+logLabel+"?service_uuid="+this.props.service_uuid;
    }
    xhr.open("get",url,true);
    xhr.setRequestHeader("token", cookie.load("_at"));
    var offset = 0;
    xhr.onreadystatechange = function(){
      me.context.store.dispatch(isLoadingAction(true));
      // me.setState({
      //   items:[{log_time:"",log_info:"Loading..."}]
      // });
      if (xhr.readyState == 2){

      }
      if(me.props.type == "build" && (xhr.readyState == 3 || xhr.readyState == 4)){
        me.setState({
          buildTxt: xhr.responseText
        })
        return
      }
      if (xhr.readyState == 3 && xhr.responseText) {
        me.context.store.dispatch(isLoadingAction(false));
        // me.setState({
        //   items:[{log_time:"",log_info:""}]
        // });
        var s = xhr.responseText.substring(offset);
        console.log('log string :> ',s,typeof s);
        var json = JSON.parse(s)
        console.log(json,typeof json)
        if (s == "\n" || !s) return
        try {
          console.log('log :> ', json);
          me.start_time = json.end_time;
          offset = xhr.responseText.length;
          if (json.status == 0) {
            me.setState({
              items: [].concat(me.state.items).concat(json.result.logs_list)
            })
          } else {
            xhr.abort();
            console.info('fetch logs error: ', json)
          }
        } catch (e) {
          console.log("json.parse error",JSON.parse(s))
          // me.setState({
          //   items:[{log_time:"",log_info:""}]
          // })
        }
      }
    };
    xhr.onabort = function(){
      console.info('fetch logs abort!!!!!!')
      if (!me.shutByHand){
        console.info('fetch logs reconnect .')
        setTimeout(function(){
          me.fetchLogs(logLabel,me.start_time)
        },100)
      } else {
        console.info('fetch logs abort by hand .')
      }
    };
    xhr.send(JSON.stringify({start_time:me.start_time}));
    return xhr
  }
  searchLogs(logLabel,date,msec){
    let myInit = {
      method:"GET",
      headers:{token:cookie.load("_at")},
    };
    let start_time = msec;
    let end_time = (msec+60*60*1000);//一小时后的
    let date_time = (new Date(date).getTime())/1000;
    console.log(new Date(start_time),"start_time");
    console.log(new Date(end_time),"end_time");
    let url = Const.FETCH_URL.SEARCH_LOGS+"/"+logLabel+"?date_time="+date_time+"&start_time="+start_time+"&end_time="+end_time;
    let me = this;
    fetch(url,myInit)
      .then(response => response.json())
      .then((json) =>{
        me.context.store.dispatch(isLoadingAction(false));
        console.log(json,"获取查询logs");
        if(json.status == 0){
          let logs = json.result.logs_list;
          logs = logs.length?logs:[{log_time:"",log_info:"暂无日志~"}];
          me.setState({
            items:logs
          })
        }
      })
      .catch((e)=>{
        me.setState({
          items:[{log_time:"",log_info:"服务正忙,请重试~"}]
        })
      })
  }
  componentDidMount(){
    if(this.props.tabs ==3){
      this.xhr = new XMLHttpRequest();
      this.fetchLogs(this.props.logLabel,false);
    }
  }
  componentWillMount(){
    this.removeCss = this.context.insertCss.apply(undefined, [s]);
  }
  componentWillUnmount(){
    this.shutByHand = true;
    this.xhr?this.xhr.abort():null;
    this.xhr = null;
  }
  componentDidUpdate(){
    ReactDOM.findDOMNode(this.refs.list).scrollTop = 1000000
  }
  onSearchLogs(){
    let value = this.refs.datePicker.getFormattedValue();
    let h = this.refs.h.value;
    let m = this.refs.m.value;
    if(!value) return false;
    let msec = new Date(value+" 00:00:00").getTime()+(h*60*60*1000)+(m*60*1000);
    this.shutByHand = true;
    this.xhr?this.xhr.abort():null;
    this.xhr = null;
    this.searchLogs(this.props.logLabel,value,msec)
  }
  onGetLogs(){
    if(this.xhr != null) return;
    this.setState({
      items:[]
    });
    this.shutByHand = false;
    this.xhr = new XMLHttpRequest();
    this.fetchLogs(this.props.logLabel,false);
  }
  onClearLogs(){
    this.setState({
      items:[]
    });
    this.refs.h.value = 0;
    this.refs.m.value = 0;
    this.refs.datePicker.clear();
    if(this.xhr != null) return false;
    this.shutByHand = false;
    this.xhr = new XMLHttpRequest();
    this.fetchLogs(this.props.logLabel,false);
  }
  onAbortLog(){
    this.shutByHand = true;
    this.xhr?this.xhr.abort():null;
    this.xhr = null;
    this.context.store.dispatch(isLoadingAction(false));
  }
  render(){
    let me = this;
    let _items = this.state.items;
    if(!_items.length) {
      _items.sort(function (a, b) {
        let t1 = a.time;
        let t2 = b.time;
        if (t1 < t2) return -1;
        if (t1 == t2) return 0;
        if (t1 > t2) return 1;
      });
    }
    let items = _items.slice(_items.length-100).map((item,i)=>{
      return (
        <div key={i}>{timeFormat(item.log_time)} {item.log_info}</div>
      )
    });
    let tip =<Tooltip id="tooltip">{`搜索此时间开始1个小时内的日志`}</Tooltip>;
    return (
      <div className = {s.root}>
        <pre ref="list" className={cx("darken")}>
          {me.props.type == "build"?me.state.buildTxt:items}
        </pre>
        {
          this.props.type == "build"?
            ""
          :
            <div className={s.bottom}>
              <DatePicker className = {s.time} id="datePicker" ref = "datePicker"
                          calendarPlacement="top"
                          dayLabels = {['日','一','二','三','四','五','六']}
                          monthLabels = {["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]}
                          dateFormat = {"YYYY-MM-DD"}
                          showTodayButton = {true}
              />
              <b> : </b>
              <select className="form-control" ref = "h">
                <option value = "00">00</option>
                <option value = "01">01</option>
                <option value = "02">02</option>
                <option value = "03">03</option>
                <option value = "04">04</option>
                <option value = "05">05</option>
                <option value = "06">06</option>
                <option value = "07">07</option>
                <option value = "08">08</option>
                <option value = "09">09</option>
                <option value = "10">10</option>
                <option value = "11">11</option>
                <option value = "12">12</option>
                <option value = "13">13</option>
                <option value = "14">14</option>
                <option value = "15">15</option>
                <option value = "16">16</option>
                <option value = "17">17</option>
                <option value = "18">18</option>
                <option value = "19">19</option>
                <option value = "20">20</option>
                <option value = "21">21</option>
                <option value = "22">22</option>
                <option value = "23">23</option>
              </select>
              <b> : </b>
              <select className="form-control" ref = "m">
                <option value = "00">00</option>
                <option value = "01">01</option>
                <option value = "02">02</option>
                <option value = "03">03</option>
                <option value = "04">04</option>
                <option value = "05">05</option>
                <option value = "06">06</option>
                <option value = "07">07</option>
                <option value = "08">08</option>
                <option value = "09">09</option>
                <option value = "10">10</option>
                <option value = "11">11</option>
                <option value = "12">12</option>
                <option value = "13">13</option>
                <option value = "14">14</option>
                <option value = "15">15</option>
                <option value = "16">16</option>
                <option value = "17">17</option>
                <option value = "18">18</option>
                <option value = "19">19</option>
                <option value = "20">20</option>
                <option value = "21">21</option>
                <option value = "22">22</option>
                <option value = "23">23</option>
                <option value = "24">24</option>
                <option value = "25">25</option>
                <option value = "26">26</option>
                <option value = "27">27</option>
                <option value = "28">28</option>
                <option value = "29">29</option>
                <option value = "30">30</option>
                <option value = "31">31</option>
                <option value = "32">32</option>
                <option value = "33">33</option>
                <option value = "34">34</option>
                <option value = "35">35</option>
                <option value = "36">36</option>
                <option value = "37">37</option>
                <option value = "38">38</option>
                <option value = "39">39</option>
                <option value = "40">40</option>
                <option value = "41">41</option>
                <option value = "42">42</option>
                <option value = "43">43</option>
                <option value = "44">44</option>
                <option value = "45">45</option>
                <option value = "46">46</option>
                <option value = "47">47</option>
                <option value = "48">48</option>
                <option value = "49">49</option>
                <option value = "50">50</option>
                <option value = "51">51</option>
                <option value = "52">52</option>
                <option value = "53">53</option>
                <option value = "54">54</option>
                <option value = "55">55</option>
                <option value = "56">56</option>
                <option value = "57">57</option>
                <option value = "58">58</option>
                <option value = "59">59</option>
              </select>
              <OverlayTrigger placement="bottom" id = "OverlayTrigger1" overlay={tip}>
                <button className="btn btn-primary" onClick = {this.onSearchLogs.bind(this)}>搜索</button>
              </OverlayTrigger>
              <button className="btn btn-primary" onClick = {this.onClearLogs.bind(this)}>清除</button>
            </div>
        }
      </div>
    )
  }
}

// export default widthstyle(s)(Logs)
