
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';
import cx from 'classnames';
import {Button,Panel,Table,Pagination} from 'react-bootstrap';
import {BREADCRUMB} from "../../constants";
import Link from '../Link';

// import echarts from 'echarts';

const ReactHighcharts = require('react-highcharts');

class Panel1Box extends Component {
  render(){
    let url = this.props.url;
    return (
      url?
      <div className={cx(s.p1Box,this.props.theme)}>
          <Link to={this.props.url} >
            <div className={cx(s.p1BoxLeft,"p1box_left")}>
              <i className={cx("bg_dis",this.props.className)}> </i>
              <i className={cx("bg_hover",'icon-link')}> </i>
              <span className="bg_hover bg_detail">查看详情</span>
            </div>
          </Link>
          <div className={s.p1BoxRight}>
            {this.props.children}
          </div>
      </div>
        :
      <div className={cx(s.p1Box,this.props.theme)}>
          <div className={cx(s.p1BoxLeft,"p1box_left")}>
            <i className={cx("bg_dis",this.props.className)}> </i>
            <i className={cx("bg_hover",'icon-link')}> </i>
            <span className="bg_hover bg_detail">查看详情</span>
          </div>
          <div className={s.p1BoxRight}>
            {this.props.children}
          </div>
      </div>
    )
  }
}

class ResourceDetail extends Component {
  static propTypes = {
    serviceList: React.PropTypes.array,
    imageList:React.PropTypes.array,
    volumesList: React.PropTypes.array,
  };
  render(){
    let serviceLength = this.props.serviceList.length||0;
    let imageLength = this.props.imageList.length||0;
    let volumesLength = this.props.volumesList.length||0;
    return (
      <Panel header="资源详细">
        <ul className={s.p1List}>
          <li><Link to={`/serviceList`}><Panel1Box theme="p1box_svc" className="icon-service">
            <p className={s.p1BoxRightTxt}>服务<i>services</i></p>
            <span><i className={s.p1BoxRightNum}>{serviceLength}</i>个</span>
          </Panel1Box></Link></li>
          <li><Link to={`/imageForMy`}><Panel1Box theme="p1box_image" className="icon-mirrorceer">
            <p className={s.p1BoxRightTxt}>镜像<i>images</i></p>
            <span><i className={s.p1BoxRightNum}>{imageLength}</i>个</span>
          </Panel1Box></Link></li>
          <li><Link to={`/volumes`}><Panel1Box theme="p1box_pro" className="icon-project">
            <p className={s.p1BoxRightTxt}>数据卷<i>volumes</i></p>
            <span><i className={s.p1BoxRightNum}>{volumesLength}</i>个</span>
          </Panel1Box></Link></li>
          <li><Panel1Box theme="p1box_new" className="icon-new" url = "/choseImage">
            <Link to={`/choseImage`}><p className={s.p1BoxRightTxt}>新建服务<i className={s.p1BoxNewSvcTip}>new service</i></p></Link>
            <a className={s.p1BoxDescTxt}>什么是容器云服务?</a>
          </Panel1Box></li>
        </ul>
      </Panel>
    )
  }
}

// Highcharts.getOptions().plotOptions.pie.colors=["red","blue"]
class Monitor extends Component {
  render(){
    const config1 = {
      chart: {
        height:145,
        width:145,
        margin: [0, 0, 0, 0]
      },
      title: {
        text: null,//'CPU总剩余量<br><span style="color:#56c8f2;font-size:20px;">30%</span>',
        align: 'center',
        verticalAlign: 'middle',
        y: 0,
        style:{"font-size":"14px","color":"#333"}
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          center: ['50%', '50%'],
          borderWidth:0,
          colors:["#56c8f2","#7c7c7c"]
        }
      },
      series: [{
        type: 'pie',
        innerSize: '80%',
        color:"red",
        data: [
          ['used',   70],
          ['unUsed',       30],
        ],
        states: {
          hover: {
            enabled: false
          }
        }
      }],
      credits: { enabled:false}
    };
    const config2 = {
      chart: {
        height:145,
        width:145,
        margin: [0, 0, 0, 0]
      },
      title: {
        text: null,//'内存总剩余量<br><span style="color:#ff6c60;font-size:20px;">50%</span>',
        align: 'center',
        verticalAlign: 'middle',
        y: 0,
        style:{"font-size":"14px","color":"#333"}
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          center: ['50%', '50%'],
          borderWidth:0,
          colors:["#ff6c60","#7c7c7c"]
        }
      },
      series: [{
        type: 'pie',
        innerSize: '80%',
        data: [
          ['used',   50],
          ['unUsed',       50],
        ],
        states: {
          hover: {
            enabled: false
          }
        }
      }],
      credits: { enabled:false}

    };
    const config3 = {
      chart: {
        height:145,
        width:145,
        margin: [0, 0, 0, 0]
      },
      title: {
        text: null,//'数据卷总剩余量<br><span style="color:#2ecc71;font-size:20px;">70%</span>',
        align: 'center',
        verticalAlign: 'middle',
        y: 0,
        style:{"font-size":"14px","color":"#333"}
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          center: ['50%', '50%'],
          borderWidth:0,
          colors:["#2ecc71","#7c7c7c"]
        }
      },
      series: [{
        type: 'pie',
        innerSize: '80%',
        data: [
          ['used',   30],
          ['unUsed',       70],
        ],
        states: {
          hover: {
            enabled: false
          }
        }
      }],
      credits: { enabled:false}

    };
    return (
      <Panel header="资源配额使用情况" className={s.monitor}>
        {/*<ReactHighcharts config={config}></ReactHighcharts>*/}
        <div className={s.resourceBox}>
          <div className={s.resourceItem}>
            <div className={s.resourceLeft}>
              <p>CPU总剩余量<br /><span>30%</span></p>
              <div className={s.hcItem}>
                <ReactHighcharts config={config1}> </ReactHighcharts>
              </div>
            </div>
            <div className={s.resourceRight}>
              <div className={s.resourceHd}>
                  <p><span>CPU</span>（核）使用情况</p>
              </div>
              <div className={s.resourceBd}>
                  <div className={s.resourceInfo}>
                    <p>总数量</p>
                    <p><span>10</span>核</p>
                  </div>
                  <div className={s.resourceInfo}>
                    <p>已使用</p>
                    <p><span>7</span>核</p>
                  </div>
                  <div className={s.resourceInfo}>
                    <p>剩余数</p>
                    <p><span>3</span>核</p>
                  </div>
              </div>
            </div>
          </div>
          <div className={s.resourceItem}>
            <div className={s.resourceLeft}>
              <p>内存总剩余量<br /><span>50%</span></p>
              <div className={s.hcItem}>
                <ReactHighcharts config={config2}> </ReactHighcharts>
              </div>
            </div>
            <div className={s.resourceRight}>
              <div className={s.resourceHd}>
                <p><span>内存</span>（MB）使用情况</p>
              </div>
              <div className={s.resourceBd}>
                <div className={s.resourceInfo}>
                  <p>总数量</p>
                  <p><span>10</span>MB</p>
                </div>
                <div className={s.resourceInfo}>
                  <p>已使用</p>
                  <p><span>5</span>MB</p>
                </div>
                <div className={s.resourceInfo}>
                  <p>剩余数</p>
                  <p><span>5</span>MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className={s.resourceItem}>
            <div className={s.resourceLeft}>
              <p>数据卷总剩余量<br /><span>70%</span></p>
              <div className={s.hcItem}>
                <ReactHighcharts config={config3}> </ReactHighcharts>
              </div>
            </div>
            <div className={s.resourceRight}>
              <div className={s.resourceHd}>
                <p><span>数据卷</span>（G）使用情况</p>
              </div>
              <div className={s.resourceBd}>
                <div className={s.resourceInfo}>
                  <p>总数量</p>
                  <p><span>10</span>G</p>
                </div>
                <div className={s.resourceInfo}>
                  <p>已使用</p>
                  <p><span>3</span>G</p>
                </div>
                <div className={s.resourceInfo}>
                  <p>剩余数</p>
                  <p><span>7</span>G</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    )
  }
}

class AccountInfo extends Component {
  render(){
    return (
      <Panel header="账户信息" className={s.accountInfo}>
        <div className={s.accountInfoBody}>
          <p><span className={s.accountInfoSubT}>账户余额</span></p>
          <p className={s.accountInfoBalance}><span className={s.accountInfoMoney}>-123.07</span>元<Button bsStyle="primary">充值</Button></p>
        </div>
        <div className={s.accountInfoBody}>
          <p className={s.accountInfoBusiness}>2016.8.19</p>
          <p style={{lineHeight:"34px"}}><span className={s.accountInfoSubT}>最近交易</span>
            <Button bsStyle="primary" className="pull-right">查看</Button></p>
        </div>
      </Panel>
    )
  }
}

const title = '控制台';
class Dashboard extends Component {
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };
  static propTypes = {
    setBreadcrumb:React.PropTypes.func,
    serviceList: React.PropTypes.array,
    onServiceListLoad: React.PropTypes.func,
    imageList:React.PropTypes.array,
    onImageListLoad:React.PropTypes.func,
    volumesList: React.PropTypes.array,
    onVolumesListLoad: React.PropTypes.func,
}
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.CONSOLE);
    this.props.onServiceListLoad();
    this.props.onImageListLoad();
    this.props.onVolumesListLoad();
  }
  render(){
    this.context.setTitle(title);
    let serviceList = this.props.serviceList;
    let imageList = this.props.imageList;
    let volumesList = this.props.volumesList;
    return (
      <div className={cx(s.root,"containerPadding")}>
        <ResourceDetail
          serviceList = {serviceList}
          imageList = {imageList}
          volumesList={volumesList}
        />
        <div className={s.row}>
          <Monitor/>
          <AccountInfo/>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Dashboard)
