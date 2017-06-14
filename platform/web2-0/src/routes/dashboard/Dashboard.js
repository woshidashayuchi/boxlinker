
import React, { Component, PropTypes } from 'react';
import {Button,Panel,Table,Pagination} from 'react-bootstrap';
import {BREADCRUMB} from "../../constants";
import Loading from '../../components/Loading';
import MonitorIndex from '../../components/MonitorIndex';
import Link from '../../components/Link';
import HeadLine from '../../components/HeadLine';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';
import cx from 'classnames';

class Panel1Box extends Component {
  render(){
    let url = this.props.url;
    return (
      url?
      <div className={cx(s.item,this.props.theme)}>
          <Link to={this.props.url} >
            <div className={cx(s.left)}>
              <i className={cx(s.icon,this.props.className)}> </i>
              <i className={cx(s.hover,'icon-link')}> </i>
              <span className={s.text}>查看详情</span>
            </div>
          </Link>
          <div className={s.right}>
            {this.props.children}
          </div>
      </div>
        :
      <div className={cx(s.item,this.props.theme)}>
          <div className={cx(s.left)}>
            <i className={cx(s.icon,this.props.className)}> </i>
            <i className={cx(s.hover,'icon-link')}> </i>
            <span className={s.text}>查看详情</span>
          </div>
          <div className={s.right}>
            {this.props.children}
          </div>
      </div>
    )
  }
}

class ResourceDetail extends Component {
  static propTypes = {
    serviceList: React.PropTypes.object,
    imageList:React.PropTypes.object,
    volumesList: React.PropTypes.object,
  };
  render(){
    let serviceLength = this.props.serviceList.count ==-1?0:this.props.serviceList.count;
    let imageLength = this.props.imageList.count ==-1?0:this.props.imageList.count;
    let volumesLength = this.props.volumesList.count ==-1?0:this.props.volumesList.count ;
    return (
      <Panel header="资源详细">
        <ul className={s.box}>
          <li><Link to={`/serviceList`}><Panel1Box theme={s.service} className="icon-service">
            <p className={s.p}>服务<i className={s.i}>services</i></p>
            <span><i className={s.number}>{serviceLength}</i>个</span>
          </Panel1Box></Link></li>
          <li><Link to={`/myImage`}><Panel1Box theme={s.image} className="icon-mirrorceer">
            <p className={s.p}>镜像<i className={s.i}>images</i></p>
            <span><i className={s.number}>{imageLength}</i>个</span>
          </Panel1Box></Link></li>
          <li><Link to={`/volumes`}><Panel1Box theme={s.volume} className="icon-project">
            <p className={s.p}>数据卷<i className={s.i}>volumes</i></p>
            <span><i className={s.number}>{volumesLength}</i>个</span>
          </Panel1Box></Link></li>
          <li><Panel1Box theme={s.create} className="icon-new" url = "/chooseImage">
            <Link to={`/chooseImage`}><p className={s.p}>新建服务<i className={s.lastI}>new service</i></p></Link>
            <a className={s.link}>什么是容器云服务?</a>
          </Panel1Box></li>
        </ul>
      </Panel>
    )
  }
}

class ResourceUseDetail extends Component {
  static propTypes = {
    dashboard:React.PropTypes.object
  };
  componentDidMount(){}
  render(){
    return (
      <Panel header="资源使用详细">
        {this.props.dashboard.cpu_usage?
          <div className={s.used}>
          <div className={cx(s.cpu)}>
            <HeadLine
              title="CPU监控"
              titleEnglish=""
              titleInfo="CPU MONITOR"
            />
            <MonitorIndex
              name = "cpu"
              data = {this.props.dashboard.cpu_usage}
              color = {["#7ed9fc"]}
              legend = {false}
              divisor = {1000}
              valueSuffix = "cores"
            >
            </MonitorIndex>
          </div>
          <div className={cx(s.memory)}>
            <HeadLine
              title="内存监控"
              titleEnglish=""
              titleInfo="MEMORY MONITOR"
            />
            <MonitorIndex
              name = "memory"
              data = {this.props.dashboard.memory_usage}
              color = {["#b7e769"]}
              legend = {false}
              divisor = {1024*1024}
              valueSuffix = "M"
            >
            </MonitorIndex>
          </div>
        </div>:
          <div className="text-center"><Loading/></div>
        }
      </Panel>
    )
  }
}

class Dashboard extends Component {
  static propTypes = {
    setBreadcrumb:React.PropTypes.func,
    serviceList: React.PropTypes.object,
    onServiceListLoad: React.PropTypes.func,
    imageList:React.PropTypes.object,
    onImageListLoad:React.PropTypes.func,
    volumesList: React.PropTypes.object,
    onVolumesListLoad: React.PropTypes.func,
    onDashboardLoad:React.PropTypes.func,
    dashboard:React.PropTypes.object
  };
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.CONSOLE);
    this.pageData = {
      page:1,
      page_size:10
    };
    this.servicePage = {
      page_size:10,
      page_num:1,
      serviceVal:""
    };
    this.props.onServiceListLoad(this.servicePage);
    this.props.onImageListLoad(this.pageData);
    this.props.onVolumesListLoad(this.servicePage);
    this.props.onDashboardLoad();
  }
  render(){
    let serviceList = this.props.serviceList;
    let imageList = this.props.imageList;
    let volumesList = this.props.volumesList;
    let data = this.props.dashboard;
    return (
      <div className={cx(s.root)}>
        <ResourceDetail
          serviceList = {serviceList}
          imageList = {imageList}
          volumesList={volumesList}
        />
        <ResourceUseDetail
          dashboard = {this.props.dashboard}
        />
      </div>
    )
  }
}
export default withStyles(s)(Dashboard)
