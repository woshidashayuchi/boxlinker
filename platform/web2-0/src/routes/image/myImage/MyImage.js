
import React from 'react';

import {Panel,MenuItem,Tab,Tabs,SplitButton,Pagination} from 'react-bootstrap';
import {BREADCRUMB} from "../../../constants";
import Loading from '../../../components/Loading';
import Confirm from '../../../components/Confirm';
import {navigate} from '../../../actions/route';
import {receiveImageDelete} from '../../../actions/imageList'
import Search from '../../../components/Search';
import Link from '../../../components/Link';
import s from "./MyImage.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";

class MyImage extends React.Component{
  static contextTypes = {
    store: React.PropTypes.object,
  };
  static propTypes = {
    imageList : React.PropTypes.object,
    onImageList : React.PropTypes.func,
    setBreadcrumb:React.PropTypes.func,
    goToConfigContainer:React.PropTypes.func,
    onDeleteImage:React.PropTypes.func,
    imageRecommendList:React.PropTypes.object,
    getImageRecommendList:React.PropTypes.func,
    modalState:React.PropTypes.object
  };
  constructor(){
    super();
    this.state = {
      delData:{
        id:null
      },
      activePage:1,
      page_size:10,
      isShowSearchTip:false,
    }
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.IMAGES_MY);
    this.pageData = {
      page:this.state.activePage,
      page_size:this.state.page_size
    };
    this.props.onImageList(this.pageData);
    this.props.getImageRecommendList();
  }
  deployImage(ImageName,id){
    let obj = {
      image_name :`index.boxlinker.com/${ImageName}`,
      image_uuid:id
    };
    this.props.goToConfigContainer(obj);
  }
  onSelectBtn(uuid,key){
    switch (key){
      case "1":
        this.context.store.dispatch(navigate(`/imageDetail/${uuid}`));
        break;
      case "2":
        this.setState({
          delData:{
            id:uuid,
            key:"imageList",
            page:this.pageData
          }
        });
        this.context.store.dispatch(receiveImageDelete(true));
        break;
    }
  }
  deleteImageHide(){
    this.context.store.dispatch(receiveImageDelete(false));
  }
  handleSelectPage(eventKey){
    eventKey = Math.floor(eventKey);
    this.setState({
      activePage: eventKey
    });
    this.pageData.page = eventKey;
    this.props.onImageList(this.pageData);
  }
  getImageList(){
    let data = this.props.imageList;
    if(data.count == -1) return <div className="pad10"><Loading /></div>;
    if(data.count ==0) return <div>暂无数据~</div>;
    let body = this.state.isShowSearchTip?
      [<p key = {new Date().getTime()} className={s.searchEnd}>共搜索到<span>{data.count}</span>条数据</p>]:
      [];
    data.result.map((item,i) => {
      body.push(
        <div className={s.item} key = {i}>
          <div className={s.hd}>
            <div className={s.image}>
              <Link to={`/imageDetail/${item.uuid}`}>
                <img src={item.logo} alt="img"/>
              </Link>
            </div>
            <div className={s.info}>
              <h1 title ={item.repository}><span>镜像名称 : </span><Link  to={`/imageDetail/${item.uuid}`}>{item.repository}</Link></h1>
              <p title = {item.short_description}><span>镜像简介 : </span>{item.short_description}</p>
            </div>
          </div>
          <div className={cx(s.bd,"clearfix")}>
            {/*<span className="icon-collection">收藏</span>/!*icon-collectctd*!/*/}
            <SplitButton
              title = "部署"
              bsStyle = "primary"
              bsSize="small"
              pullRight
              onClick = {this.deployImage.bind(this,item.repository,item.uuid)}
              onSelect={this.onSelectBtn.bind(this,item.uuid)}
              id = {`deploy-${i}`}
            >
              <MenuItem eventKey="1">编辑</MenuItem>
              <MenuItem eventKey="2">删除</MenuItem>
            </SplitButton>
          </div>
        </div>
      )
    });
    if(data.count<this.state.page_size){}else {
      let pages = data.count/this.state.page_size;
      pages = data.count%this.state.page_size>0?Math.floor(pages+1):Math.floor(pages);
      body.push(
        <div className="pageBox" key={new Date().getTime() + 1}>
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
    return body
  }
  getImageTopTen(n){
    let data = this.props.imageRecommendList;
    let body = [];
    if(data.count == -1) return <div className="pad10"><Loading/></div>;
    if(data.count == 0) return <div className="pad10">暂无数据</div>;
    let list = data.result||[];
    list.map((item,i) => {
      body.push(<div className={s.item} key={i}>
        <div className={s.hd}>
          <div className={s.image}>
            <Link to={`/imageDetail/${item.uuid}`}>
              <img src={item.logo} alt="img"/>
            </Link>
          </div>
          <div className={s.info}>
            <h1 title = {item.repository}><Link to={`/imageDetail/${item.uuid}`}>{item.repository}</Link></h1>
            <p title = {item.short_description}>{item.short_description}</p>
          </div>
        </div>
        <div className={cx(s.bd,"clearfix")}>
          <button className="btn btn-primary btn-sm"
                  onClick = {this.deployImage.bind(this,item.repository,item.uuid)}
          >部署</button>
        </div>
      </div>)
    });
    return body.splice(0,n);
  }
  onSearchImage(data){
    if(data.repo_fuzzy) {
      this.setState({
        isShowSearchTip: true
      });
    }else{
      this.setState({
        isShowSearchTip: false
      });
    }
    this.props.onImageList(data);
  }
  render(){
    const panelHd=(<div>
      <span>我的镜像</span>
      <a href="javascript:;">什么是容器镜像？</a>
    </div>);
    return (
      <div className={cx(s.container,"images myImage containerPadding")}>
        <Panel className={s.left} header={panelHd}>
          <div className={s.box}>
            {this.getImageList()}
          </div>
        </Panel>
        <div className={s.right}>
          <div className={s.search}>
            <Search
              parameter = {this.pageData}
              placeholder="搜索我的镜像"
              type = "myImage"
              btnClickFun = {(data) =>{this.onSearchImage(data)}}
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
          <Panel className={s.ten} header="推荐镜像">
            {this.getImageTopTen(5)}
            <div className={s.more}><Link to="/platformImage">查看更多>></Link></div>
          </Panel>
        </div>
        <Confirm
          key = {this.state.delData.id}
          isShow={this.props.modalState.imageDelete}
          onHide={() =>{this.deleteImageHide()}}
          title = "警告"
          text = "确定要删除此镜像吗?"
          func = {() =>{this.props.onDeleteImage(this.state.delData)}}
          ref = "confirmModal"
        />
      </div>
    )
  }
}

export default widthstyle(s)(MyImage);
