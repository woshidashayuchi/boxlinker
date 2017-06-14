

import React, { PropTypes,Component } from 'react';
import {SplitButton,MenuItem,Pagination} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import Loading from "../../../components/Loading";
import Confirm from "../../../components/Confirm";
import Search from "../../../components/Search";
import {BREADCRUMB} from "../../../constants";
import * as Const from '../../../constants';
import {receiveServiceDelete} from "../../../actions/recovery";
import s from "./ServiceRecovery.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class ServiceRecovery extends Component{
  static contextTypes = {
    store:PropTypes.object
  };
  static propTypes = {
    serviceRecoveryList: React.PropTypes.object,
    onServiceListLoad: React.PropTypes.func,
    onDeleteServiceRecovery: React.PropTypes.func,
    stepFunc: React.PropTypes.func,
    setBreadcrumb:React.PropTypes.func,
    onReductionService:React.PropTypes.func,
    onRefreshServiceList:React.PropTypes.func,
    modalState:React.PropTypes.object
  };
  constructor(props){
    super(props);
    this.state = {
      delData:{
        service_uuid:null
      },
      pageNumber:1,
      pageSize:10
    }
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.SERVICE_LIST);
    this.pageData = {
      page_size:this.state.pageSize,
      page_num:this.state.pageNumber,
    };
    this.props.onServiceListLoad(this.pageData);
    let my = this;
    //this.myTime = setInterval(function(){
    //  my.props.onServiceListLoad(my.pageData);
    //},10000);
  }
  componentWillUnmount(){
    clearInterval(this.myTime)
  }

  deleteService(service_uuid){
    this.setState({
      delData:{
        service_uuid:[service_uuid],
      },
      service_uuid:service_uuid
    });
    this.context.store.dispatch(receiveServiceDelete(true));
  }
  deleteServiceHide(){
    this.context.store.dispatch(receiveServiceDelete(false));
  }
  reductionService(uuid){
    let data = {serviceUuid:[uuid]};
    console.log(data,'>>>>>>>>>>>>reduction')
    this.props.onReductionService(data,this.pageData)
  }
  handleSelectPage(eventKey){
    eventKey = Math.floor(eventKey);
    this.setState({
      pageNumber: eventKey
    });
    this.pageData.page_num = eventKey;
    this.props.onServiceListLoad(this.pageData);
  }
  refresh(){// refresh
    this.props.onRefreshServiceList();
    this.props.onServiceListLoad(this.pageData);
  }
  //onSearchImage(data){
  //  if(data.service_name !=""){
  //    clearInterval(this.myTime)
  //  }
  //  this.pageData.searchVal = data.service_name;
  //  this.props.onServiceListLoad(this.pageData);
  //}
  getTableBody(){
    let data = this.props.serviceRecoveryList;
    console.log(data,';;;;;;;;;')
    if(data.count == -1) return <tr><td colSpan="6" style={{"textAlign":"center"}}><Loading /></td></tr>;
    if(data.count==0){
      clearInterval(this.myTime);
      return <tr><td colSpan="6" style={{"textAlign":"center"}}>暂无数据~</td></tr>
    }
    let body = [];
    data.service_list.map((item, i) => {
      let serviceState = "";
      //let service_status = item.service_status;
      switch(item.service_status){
        case "running":serviceState = "运行";
          break;
        case "Stopping":serviceState = "停止";
          break;
        case "Pending" :serviceState = "创建中";
          break;
        case "terminated":serviceState = "停止";
          break;
        case 'containercreating':serviceState = "创建中";
          break;
        default:
          break;
      }
      body.push(
        <tr key={new Date().getTime()+i}>
          <td>
            <div className="mediaItem">
              <img className="mediaImg" src = {item.image_dir} />
              <span className="mediaTxt">{item.service_name}</span>
            </div>
          </td>
          <td>
            <span className="cl3">{item.ltime}</span>
          </td>
          <td className="col-lg-3">
            <span className="cl3">{item.description}</span>
          </td>
          <td>
            <div
              className={`mirror-state ${serviceState == "运行" ? "on" : "off"} tablePaddingLeft`}>
              {serviceState}
            </div>
          </td>
          <td>
            <div className="btn-group">
              <SplitButton
                pullRight
                onClick = {this.reductionService.bind(this,item.service_uuid)}
                onSelect={this.deleteService.bind(this,item.service_uuid)}
                bsStyle={"default"}
                title={'还原'} id={`volumes-table-line-${i}`}>
                <MenuItem eventKey="1">删除</MenuItem>
              </SplitButton>
            </div>
          </td>
        </tr>
      )
    });
    return body;
  }
  getDemoTable(){
    return (
      <table className="table table-hover table-bordered services-table">
        <thead>
        <tr>
          <th >服务名称</th>
          <th >部署时间</th>
          <th >服务描述</th>
          <th >状态</th>
          <th >操作</th>
        </tr>
        </thead>
        <tbody ref = "tableBody" key = {new Date().getTime()}>
        {this.getTableBody()}
        </tbody>
      </table>
    )
  }
  getPage(){
    let data = this.props.serviceRecoveryList;
    let page = [];
    if(data.count<this.state.pageSize){}else {
      let pages = data.count/this.state.pageSize;
      pages = data.count%this.state.pageSize>0?Math.floor(pages+1):Math.floor(pages);
      page.push(
        <div className="pageBox" key={new Date().getTime() + 1}>
          <Pagination
            prev
            next
            first
            last
            items={pages}
            activePage={this.state.pageNumber}
            onSelect={this.handleSelectPage.bind(this)}
          />
        </div>
      )
    }
    return page;
  }
  render(){
    return (
      <div className="containerBgF">
        <div className="projectHead clearfix">
          <div className="projectHeadL left">
            <span className={s.titleSpan}>服务回收</span>
          </div>
          <div id={s.rightTop} className="projectHeadR right">
            <button className="btn btn-default icon-refresh" onClick = {this.refresh.bind(this)} title = "刷新"> </button>
          </div>
        </div>
        <div className="tableBox">
          <div className={s.table}>
            {this.getDemoTable()}
            {this.getPage()}
          </div>
        </div>
        <Confirm
          key = {this.state.delData.service_uuid}
          isShow={this.props.modalState.serviceDelete}
          onHide={()=>{this.deleteServiceHide()}}
          title = "警告"
          text = "您确定要删除此服务吗?"
          ref = "confirmModal"
          func = {() => {this.props.onDeleteServiceRecovery(this.state.delData,this.pageData)}}
        />
      </div>
    );
  }
}

export default widthstyle(s)(ServiceRecovery);
