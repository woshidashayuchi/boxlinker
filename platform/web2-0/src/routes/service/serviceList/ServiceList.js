
import React, { PropTypes,Component } from 'react';
import {SplitButton,MenuItem,Pagination} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Link from '../../../components/Link';
import Loading from "../../../components/Loading";
import Confirm from "../../../components/Confirm";
import Search from "../../../components/Search";
import {BREADCRUMB} from "../../../constants";
import * as Const from '../../../constants';
import {receiveServiceDelete} from "../../../actions/services";
import s from "./ServiceList.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class ServiceList extends Component{
  static contextTypes = {
    store:PropTypes.object
  };
  static propTypes = {
    serviceList: React.PropTypes.object,
    onServiceListLoad: React.PropTypes.func,
    onDeleteService: React.PropTypes.func,
    stepFunc: React.PropTypes.func,
    setBreadcrumb:React.PropTypes.func,
    onChangeState:React.PropTypes.func,
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
      searchVal:""
    };
    this.props.onServiceListLoad(this.pageData);
    let my = this;
    this.myTime = setInterval(function(){
      my.props.onServiceListLoad(my.pageData);
    },10000);
  }
  componentWillUnmount(){
    clearInterval(this.myTime)
  }

  deleteService(service_uuid){
    this.setState({
      delData:{
        service_uuid:service_uuid,
        type:"list"
      },
      service_uuid:service_uuid
    });
    this.context.store.dispatch(receiveServiceDelete(true));
  }
  deleteServiceHide(){
    this.context.store.dispatch(receiveServiceDelete(false));
  }
  changeState(uuid,state){
    let data = {serviceUuid:uuid,state:state};
    this.props.onChangeState(data,"list",this.pageData)
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
  onSearchImage(data){
    if(data.service_name !=""){
      clearInterval(this.myTime)
    }
    this.pageData.searchVal = data.service_name;
    this.props.onServiceListLoad(this.pageData);
  }
  getTableBody(){
    let data = this.props.serviceList;
    console.log(data,';;;;;;;;;')
    if(data.count == -1) return <tr><td colSpan="6" style={{"textAlign":"center"}}><Loading /></td></tr>;
    if(data.count==0){
      clearInterval(this.myTime);
      return <tr><td colSpan="6" style={{"textAlign":"center"}}>暂无数据~</td></tr>
    }
    let body = [];
    data.service_list.map((item, i) => {
      let serviceState = "";
      let service_status = item.service_status;
      let option = "";
      switch(service_status.toLowerCase()){
        case Const.SERVICE_STATE.Running:serviceState = "运行";
          option = <SplitButton
            pullRight
            onClick = {this.changeState.bind(this,item.service_uuid,"stop")}
            onSelect={this.deleteService.bind(this,item.service_uuid)}
            bsStyle={"default"}
            title='关闭' id={`volumes-table-line-${i}`}>
            <MenuItem eventKey="1">删除</MenuItem>
          </SplitButton>;
          break;
        case Const.SERVICE_STATE.Stopping:serviceState = "停止";
          option = <SplitButton
            pullRight
            onClick = {this.changeState.bind(this,item.service_uuid,"start")}
            onSelect={this.deleteService.bind(this,item.service_uuid)}
            bsStyle={"primary"}
            title={'启动'} id={`volumes-table-line-${i}`}>
            <MenuItem eventKey="1">删除</MenuItem>
          </SplitButton>;
          break;
        case Const.SERVICE_STATE.Pending :serviceState = "创建中";
          option = <SplitButton
            pullRight
            onClick={this.deleteService.bind(this,item.service_uuid)}
            bsStyle={"danger"}
            title={'删除'} id={`volumes-table-line-${i}`}>
          </SplitButton>;
          break;
        case "terminated":serviceState = "停止";
          option = <SplitButton
            pullRight
            onClick = {this.changeState.bind(this,item.service_uuid,"start")}
            onSelect={this.deleteService.bind(this,item.service_uuid)}
            bsStyle={"primary"}
            title={'启动'} id={`volumes-table-line-${i}`}>
            <MenuItem eventKey="1">删除</MenuItem>
          </SplitButton>;
          break;
        case 'containercreating':serviceState = "创建中";
          option = <SplitButton
            pullRight
            onClick={this.deleteService.bind(this,item.service_uuid)}
            bsStyle={"danger"}
            title={'删除'} id={`volumes-table-line-${i}`}>
          </SplitButton>;
          break;
        default:
          serviceState = "运行失败";
          option = <button
            onClick={this.deleteService.bind(this,item.service_uuid)}
            className="btn btn-danger">删除
          </button>;
      }
      let domain = [];
      item.container.map((item) =>{
        let obj = {};
        obj.type = item.access_mode;
        if(item.access_mode == "HTTP" || item.access_mode == 'HTTPS'){
          obj.url = item.identify == 1?item.domain:item.http_domain;
        }else{
          obj.url = item.tcp_domain;
          obj.port = item.container_port;
        }
        domain.push(obj);
      });
      body.push(
        <tr key={new Date().getTime()+i}>
          <td>
            <Link to={`/serviceDetail/${item.service_uuid}/1`}>
              <div className="mediaItem">
                <img className="mediaImg" src = {item.image_dir} />
                <span className="mediaTxt">{item.service_name}</span>
              </div>
            </Link>
          </td>
          <td>
            <span className="cl3">{item.ltime}</span>
          </td>
          <td>
            {domain.map((item,i) =>{
              if(item.type == "HTTP" || item.type == 'HTTPS'){
                return <p key = {i} ><a href={`${item.type}://${item.url}`} target="_blank" className="clLink">{item.url}</a></p>
              }else{
                if(item.url != "") {
                  return <p key = {i} ><span>{item.url} ({item.port}/{item.type})</span></p>
                }
              }
            })}
          </td>
          <td className="col-lg-2">
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
              {option}
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
          <th >域名</th>
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
    let data = this.props.serviceList;
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
            <Link to={`/chooseImage`}>
              <div className="projectHeadBtn clearfix">
                <div className="projectHeadPlus left"></div>
                <div className="projectHeadName left">
                  <p className="projectHeadP1">新建服务</p>
                  <p className="projectHeadP2">Create Service</p>
                </div>
              </div>
            </Link>
            <a href="javascript:;" className="projectHeadOther">什么是容器云服务？</a>
          </div>
          <div className="projectHeadR right">
            <button className="btn btn-default icon-refresh" onClick = {this.refresh.bind(this)} title = "刷新"> </button>
            <div className={cx(s.search,"projectHeadSearch")}>
              <Search
                parameter = {{service_name:""}}
                btnClickFun = {(data) =>{this.onSearchImage(data)}}
                placeholder="搜索服务"
                type = "service"
                ref = "search"
                getItem = {function(item,my,i){
                  return (
                    <li key = {i}  onClick={my.chooseVal.bind(my,item.service_name)}>
                      <a href = "javascript:;">
                        <img width={40} height={40} src={item.image_dir} />
                        <p>{item.service_name}</p>
                        <p>{item.service_domain_name}</p>
                      </a>
                    </li>)
                }}
              >
              </Search>
            </div>
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
          func = {() => {this.props.onDeleteService(this.state.delData,this.pageData)}}
        />
      </div>
    );
  }
}

export default widthstyle(s)(ServiceList);
