
import React, { PropTypes,Component } from 'react';
import {Panel,Pagination} from 'react-bootstrap';
import {BREADCRUMB} from "../../../constants";
import Link from '../../../components/Link';
import Loading from '../../../components/Loading';
import fetch from 'isomorphic-fetch';
import * as Const from "../../../constants";
import cookie from 'react-cookie'
import Search from '../../../components/Search';
import s from "./PlatformImage.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";


class PlatformImage extends React.Component{
  static contextTypes = {
  };
  static propTypes = {
    setBreadcrumb:React.PropTypes.func,
    deployImageName:React.PropTypes.func,
    imageRecommendList:React.PropTypes.object,
    getImageRecommendList:React.PropTypes.func,
    platformImageList:React.PropTypes.object,
    getPlatformImageList:React.PropTypes.func,
    clearPlatformImageList:React.PropTypes.func
  };
  constructor(){
    super();
    this.state = {
      isShowSearchTip:false,
      activePage:1,
      page_size:10
    }
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.IMAGES_BOX_LINKER);
    this.pageData = {
      page:this.state.activePage,
      page_size:this.state.page_size,
      repo_fuzzy:""
    };
    this.props.getPlatformImageList(this.pageData);
    this.props.getImageRecommendList(this.pageData);
  }
  deployImage(ImageName,id){
    let obj = {
      image_name :`index.boxlinker.com/${ImageName}`,
      image_uuid:id
    };
    this.props.goToConfigContainer(obj);
  }
  onSearchImage(data){
    if(data.repo_fuzzy) {
      this.pageData.repo_fuzzy = data.repo_fuzzy;
      this.setState({
        isShowSearchTip: true
      });
      this.props.clearPlatformImageList();
    }else{
      this.setState({
        isShowSearchTip: false
      });
    }
    this.props.getPlatformImageList(data)
  }
  handleSelectPage(eventKey){
    eventKey = Math.floor(eventKey);
    this.setState({
      activePage: eventKey
    });
    this.pageData.page = eventKey;
    this.props.getPlatformImageList(this.pageData);
  }
  getPlatformImageHtml(){
    let data = this.props.platformImageList;
    let body = [];
    if(!data.page){body.push(<Loading key = {new Date().getTime()} />)}else {
      if(this.state.isShowSearchTip){
        body.push(<p key = {-1} className={s.searchTip}>共搜索到<span>{data.count}</span>条数据</p>)
      }
      data.result.map((item, i) => {
        body.push(<div className={s.item} key={i}>
            <div className={s.left}>
              <Link to={`/imageDetail/${item.uuid}`}><img src={item.logo} /></Link>
            </div>
            <div className={s.info}>
              <Link to={`/imageDetail/${item.uuid}`}><h1><span>镜像名称 :</span> <span className="clLink">{item.repository}</span></h1>
              <p><span>镜像简介 : </span>{item.short_description}</p></Link>
            </div>
            <div className={s.right}>
              <p>下载次数:<span>{item.download_num}</span></p>
              <Link to={`/configure`} className="btn btn-sm btn-primary"
                    onClick={this.deployImage.bind(this, item.repository, item.uuid)}>部署</Link>
            </div>
          </div>
        )
      });
      if(data.count<this.state.page_size){}else {
        let pages = data.count/this.state.page_size;
        pages = data.count%this.state.page_size>0?Math.floor(pages+1):Math.floor(pages);
        body.push(
          <div className={cx(s.page,"pageBox")} key={new Date().getTime() + 1}><Pagination
            prev
            next
            first
            last
            items={pages}
            activePage={this.state.activePage}
            onSelect={this.handleSelectPage.bind(this)}
          /></div>
        )
      }
    }
    const panelHd=(<div className="clearfix imgHd">
      <span>平台镜像</span>
      <a href="javascript:;">什么是容器镜像？</a>
      <div className="imgDropBox">
      </div>
    </div>);
    return (
          <Panel className={s.box} header={panelHd}>
            {body}
          </Panel>
    );
  }
  getImageRecommendHtml(){
    const panelHd=(<div className="clearfix imgHd">
      <span>推荐镜像</span>
      <a href="javascript:;">什么是容器镜像？</a>
      </div>);
    let body = [<p key = {new Date().getTime()} className={s.searchTip}>没有找到数据,以下是为您推荐的镜像</p>];
    let data = this.props.imageRecommendList;
    if(data.count==-1) return <Loading />;
    let list = data.result||[];
    list.map((item,i) => {
      body.push(<div className={s.item} key={i}>
          <div className={s.left}>
            <img src={item.logo} />
          </div>
          <div className={s.info}>
            <Link  to={`/imageDetail/${item.uuid}`}><h1><span>镜像名称 : </span><span className="clLink">{item.repository}</span></h1></Link>
            <p><span>镜像简介 :</span> {item.short_description}</p>
          </div>
          <div className={s.right}>
            <p>下载次数:<span>{item.download_num}</span></p>
            <Link to={`/configure`} className="btn btn-sm btn-primary"
                  onClick={this.deployImage.bind(this,item.repository,item.uuid)}>部署</Link>
          </div>
        </div>
      )
    });
    return (
          <Panel className={s.box} header={panelHd}>
            {body}
          </Panel>
    );
  }
  render(){
    let data = this.props.platformImageList;
    return (
      <div className="images platformImage">
        <div className={s.search}>
          <Search
            parameter = {this.pageData}
            btnClickFun = {(data) =>{this.onSearchImage(data)}}
            placeholder="搜索nginx试试"
            type = "platformImage"
            ref = "search"
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
          >
          </Search>
        </div>
        {
          data.count?this.getPlatformImageHtml():this.getImageRecommendHtml()
        }
      </div>
    )
  }
}

export default widthstyle(s)(PlatformImage);
