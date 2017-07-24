
import React, { PropTypes,Component } from 'react';
import VolumeCreateModal from './VolumeCreateModal'
import VolumeScaleModal from './VolumeScaleModal'
import {SplitButton,MenuItem,Pagination} from 'react-bootstrap'
import { BREADCRUMB } from '../../constants';
import Loading from "../../components/Loading";
import Confirm from '../../components/Confirm';
import {receivevolumeDelete} from "../../actions/volumes";
import {timeRange} from "../../core/utils";
import s from "./Volume.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";



class VolumeList extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    onVolumeDelete: React.PropTypes.func,
    onVolumeCreate: React.PropTypes.func,
    onVolumeScale: React.PropTypes.func,
    onVolumesListLoad: React.PropTypes.func,
    setBreadcrumb: React.PropTypes.func,
    volumesList: React.PropTypes.object,
    onClearVolumesList:React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    modalState:React.PropTypes.object,
    costs:React.PropTypes.number,
    getCosts:React.PropTypes.func,
  };
  constructor(){
    super();
    this.state = {
      diskName:"",
      pageSize:10,
      pageNumber:1
    }
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.VOLUMES);
    this.pageData = {
      page_size:this.state.pageSize,
      page_num:this.state.pageNumber
    };
    this.props.onVolumesListLoad(this.pageData);
    // this.myTime = setInterval(this.props.onVolumesListLoad,10000);
  }
  componentWillUnmount(){
    // clearInterval(this.myTime);
  }
  getCreateBtn(){
     return (
       <div className="projectHeadBtn clearfix" onClick={()=>{this.refs.createModal.open()}}>
         <div className="projectHeadPlus left"></div>
         <div className="projectHeadName left">
           <p className="projectHeadP1">创建存储卷</p>
           <p className="projectHeadP2">Create a volume</p>
         </div>
       </div>
     )
  }
  deleteLine(diskName){
    this.setState({
      diskName:diskName
    });
    this.context.store.dispatch(receivevolumeDelete(true));
  }
  deleteLineHide(){
    this.context.store.dispatch(receivevolumeDelete(false));
  }
  createVolume(data,my){
    this.props.onVolumeCreate(data,my,this.pageData);
  }
  scaleVolume(data,my){
    this.props.onVolumeScale(data,my,this.pageData);
  }
  getTableLine(){
    let count = this.props.volumesList.count;
    if(count ==-1) return <tr><td colSpan="6" style={{"textAlign":"center"}}><Loading /></td></tr>;
    if(count==0) return <tr><td colSpan="6" style={{"textAlign":"center"}}>暂无数据~</td></tr>;
    let data = this.props.volumesList.volume_list;
    let body = [];
    data.map((item,i)=>{
      body.push(<tr key={i}>
        <td>
          <div className="mediaItem">
              <img className="mediaImg" src = "/images/slImgJx.png" />
              <span className="mediaTxt">{item.volume_name}</span>
          </div>
        </td>
        <td><span className="cl3">{timeRange(item.create_time)}</span></td>
        <td><span className="cl3">{item.fs_type}</span></td>
        <td><div
          className={`mirror-state ${item.volume_status == "unused"?"off":"on"}`}>
          {item.volume_status == "unused"?'未使用':'使用中'}
        </div></td>
        <td>
          <span className="cl3">{item.volume_size}G</span>
        </td>
        <td>
          <div className="btn-group">
            <SplitButton
              pullRight
              onClick={()=>{this.refs.scaleModal.open(item)}}
              onSelect={this.deleteLine.bind(this,item.volume_uuid)}
              bsStyle="primary" title="扩容" id={`volumes-table-line-${i}`}>
              <MenuItem eventKey="1">删除</MenuItem>
            </SplitButton>

          </div>
        </td>
      </tr>)
      });
    return body
  }
  getPage(){
    let data = this.props.volumesList;
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
  handleSelectPage(eventKey){
    eventKey = Math.floor(eventKey);
    this.setState({
      pageNumber: eventKey
    });
    this.pageData.page_num = eventKey;
    this.props.onVolumesListLoad(this.pageData);
  }
  refresh(){
    this.props.onClearVolumesList();
    this.props.onVolumesListLoad(this.pageData);
  }
  render(){
    return (
      <div className="containerBgF">
        <div className="projectHead clearfix">
          <div className="projectHeadL left">
            {this.getCreateBtn()}
            <a href="javascript:;" className="projectHeadOther">什么是存储卷？</a>
          </div>
          <div className="projectHeadR right">
            <button className="btn btn-default icon-refresh" onClick = {this.refresh.bind(this)} title="刷新"> </button>
          </div>
        </div>
        <div className="tableBox">
          <div className={s.table}>
            <table className="table table-hover table-bordered volumes-table">
              <thead>
              <tr>
                <th width = "20%">存储卷名称</th>
                <th width = "20%">创建时间</th>
                <th width = "15%">存储格式</th>
                <th width = "15%">状态</th>
                <th width = "15%">容量</th>
                <th width = "15%">操作</th>
              </tr>
              </thead>
              <tbody>
              {this.getTableLine()}
              </tbody>
            </table>
          </div>
          {this.getPage()}
        </div>
        <VolumeScaleModal ref="scaleModal"
                          onSave={this.scaleVolume.bind(this)}
                          isBtnState = {this.props.isBtnState}
        />
        <VolumeCreateModal ref="createModal"
                           isBtnState = {this.props.isBtnState}
                           onVolumeCreate={this.createVolume.bind(this)}
                           costs = {this.props.costs}
                           getCosts = {(data) =>{this.props.getCosts(data)}}
        />
        <Confirm
          key = {this.state.diskName}
          isShow={this.props.modalState.volumeDelete}
          onHide={() =>{this.deleteLineHide()}}
          title = "警告"
          text = "您确定要删除此数据卷吗?"
          ref = "confirmModal"
          func = {() => {this.props.onVolumeDelete(this.state.diskName,this.pageData)}}
        />
      </div>
    );
  }
}

export default widthstyle(s)(VolumeList);
