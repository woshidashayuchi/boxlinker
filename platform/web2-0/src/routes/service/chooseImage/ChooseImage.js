/**
 * Created by zhangsai on 16/9/18.
 */

import React, { PropTypes,Component } from 'react';
import ServiceStep from '../../../components/ServiceStep';
import HeadLine from '../../../components/HeadLine';
import {Tabs,Tab,Pagination} from 'react-bootstrap';
import Link from '../../../components/Link';
import Loading from '../../../components/Loading';
import {BREADCRUMB} from "../../../constants";
import {timeRange} from '../../../core/utils';
import Search from '../../../components/Search';
import s from "./ChooseImage.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class ChooseImage extends Component{
  static contextTypes = {
    store: React.PropTypes.object
  };
  static propTypes = {
    imageList:React.PropTypes.object,
    onImageListLoad:React.PropTypes.func,
    deployData:React.PropTypes.object,
    goToConfigContainer:React.PropTypes.func,
    setBreadcrumb:React.PropTypes.func,
    onPlatformImageListLoad:React.PropTypes.func,
    platformImageList:React.PropTypes.object,
    onClearDeployDetail:React.PropTypes.func
  };
  constructor(){
    super();
    this.state = {
      isShowSearchTip:false,
      tabActiveKey:1,
      activePage:1,
      page:1,
      page_size:10,
      searchType:"myImage"
    }
  }

  componentDidMount(){
    this.pageData = {
      page:this.state.page,
      page_size:this.state.page_size,
    };
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.CREATE_SERVICE,BREADCRUMB.CHOSE_IMAGE);
    this.props.onImageListLoad(this.pageData);
    this.props.onClearDeployDetail();
  }
  focusServiceInput(){
    let me = this;
    document.onkeydown = function(e){
      if(e.keyCode == 13){
        me.onSearchImage();
      }
    }
  }
  deployImage(ImageName,id){
    let data = {
      image_name :`index.boxlinker.com/${ImageName}`,
      image_uuid:id
    };
    this.props.goToConfigContainer(data);
  }
  tabSelect(key){
    this.pageData.repo_fuzzy = "";
    this.setState({
      isShowSearchTip:false
    });
    switch (key){
      case 1:
        this.setState({
          tabActiveKey:key,
          searchType:"myImage"
        });
        this.props.onImageListLoad(this.pageData);
        break;
      case 3:
        this.setState({
          tabActiveKey:key,
          searchType:"platformImage"
        });
        console.log(this.pageData,">>>>>>")
        this.props.onPlatformImageListLoad(this.pageData);
      default:
        break;
    }
  }
  handleSelectPage(eventKey){
    eventKey = Math.floor(eventKey);
    this.setState({
      activePage: eventKey
    });
    this.pageData.page = eventKey;
    switch (this.state.tabActiveKey){
      case 1:
        this.props.onImageList(this.pageData);
        break;
      case 3:
        this.props.onPlatformImageListLoad(this.pageData);
    }
  }
  onSearchImage(data){
    switch (this.state.tabActiveKey){
      case 1:
        if(data.repo_fuzzy) {
          this.setState({
            isShowSearchTip: true
          });
        }else{
          this.setState({
            isShowSearchTip: false
          });
        }
        this.props.onImageListLoad(data);
        break;
      case 3:
        if(data.repo_fuzzy) {
          this.setState({
            isShowSearchTip: true
          });
        }else{
          this.setState({
            isShowSearchTip: false
          });
        }
        this.props.onPlatformImageListLoad(data);
        break;
    }
  }
  getTableBody(flag){
    let data = flag?this.props.imageList:this.props.platformImageList;
    if(data.a&&data.a== 1) return <tr className="pad10"><td colSpan="5" ><Loading /></td></tr>;
    if(!data.result || !data.result.length) return <tr className="pad10"><td className="text-center" colSpan="5" >暂无数据~</td></tr>;
    let body = [];
    data.result.map((item,i) => {
        body.push(  <tr key={i}>
            <td>
              <Link to={`/imageDetail/${item.uuid}`}>
                <div className="mediaItem">
                  <img className="mediaImg" src = {item.logo} />
                  <span className="mediaTxt">{item.repository}</span>
                </div>
              </Link>
            </td>
            <td>
              <span className="cl6">{timeRange(new Date(item.update_time))}</span>
            </td>
            <td>
              <span className="cl6">{`docker pull index.boxlinker.com/${item.repository}`}</span>
            </td>
            <td>
              <span className="cl3">{item.short_description}</span>
            </td>
            <td>
              <button className="btn btn-sm btn-primary"
                    onClick = {this.deployImage.bind(this,item.repository,item.uuid)}>部署</button>
            </td>
          </tr>)
    });
    return body;
  }

  getDemoTable(flag){
    let page = [];
    // let body = [];
    let data = flag?this.props.imageList:this.props.platformImageList;
    if(data.count== -1) return <div className="pad10"><Loading/></div>;
    let body = this.state.isShowSearchTip?
      [<p key = {new Date().getTime()} className="searchTip">共搜索到<span>{data.count}</span>条数据</p>]:
      [];
    if(data.count<this.state.page_size){}else {
      let pages = data.count/this.state.page_size;
      pages = data.count%this.state.page_size>0?pages+1:pages;
      page.push(
        <div className={cx(s.page,"pageBox")} key={new Date().getTime() + 1}>
          <Pagination
            prev
            next
            first
            last
            items={pages}
            activePage={this.state.activePage}
            onSelect={this.handleSelectPage.bind(this)}
          />
        </div>
      )
    }
    return (
      <div className={s.table}>
        {body}
        <table className={cx(`table table-hover table-bordered`)}>
          <thead>
          <tr>
            <th width="25%">镜像名称</th>
            <th width="10%">最近更新</th>
            <th width="35%">拉取命令</th>
            <th width="20%">镜像描述</th>
            <th width="10%">操作</th>
          </tr>
          </thead>
          <tbody>
          {this.getTableBody(flag)}
          </tbody>
        </table>
        {page}
      </div>
    )
  }
  render(){
    return (
      <div className="containerBgF chooseImage">
        <div className = "asTab">
          <ServiceStep dataActive = "first"/>
          <div className = {cx(s.search,"clearfix")}>
            <div className = "left">
              <HeadLine
                title = "选择镜像"
                titleEnglish = "SELECT MIRROR"
                titleInfo = "这里里汇聚了构建产生的所有容器云镜像"
              />
            </div>
            <div className = "right">
              <div className="search myImageSearch">
                <Search
                  type = {this.state.searchType}
                  parameter = {this.pageData}
                  placeholder="搜索镜像"
                  btnClickFun={(data) =>{this.onSearchImage(data)}}
                  getItem = {function(item,my,i){
                    return (
                      <li key = {i}  onClick={my.chooseVal.bind(my,item.repository)}>
                        <a href = "javascript:;">
                          <img width={40} height={40} src={item.logo} />
                          <p>{item.repository}</p>
                          <p>{item.short_description}</p>
                        </a>
                      </li>)
                  }}
                />
              </div>
            </div>
          </div>
          <div className = {s.list}>
            <Tabs defaultActiveKey = {this.state.tabActiveKey} onSelect={this.tabSelect.bind(this)} id="chooseImage" className = "tabIcon">
              <Tab eventKey = {1} title = "我的镜像">
                <div className = "tableBox">
                  {this.getDemoTable(true)}
                </div>
              </Tab>
              {/*<Tab eventKey = {2} title = "镜像仓库">*/}
              {/*<div className = {cx(s.asTableBox,"TableTextLeft")}>*/}
              {/*{this.getDemoTable()}*/}
              {/*</div>*/}
              {/*</Tab>*/}
              <Tab eventKey = {3} title = "平台镜像">
                <div className = "tableBox">
                  {this.getDemoTable(false)}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
export default widthstyle(s)(ChooseImage);
