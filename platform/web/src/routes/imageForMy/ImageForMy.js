
import React from 'react';

import {Panel,Grid,Row,Col,DropdownButton,MenuItem,Checkbox,Button} from 'react-bootstrap'
import SearchBox from '../../components/SearchBox';


class ImageForMy extends React.Component{
  static contextTypes = {
    setTitle: React.PropTypes.func
  };
  getImgList(){

  }
  render(){
    this.context.setTitle('我的镜像');
    const panelHd=(<div className="clearfix imgHd">
              <span>我的镜像</span>
              <a href="javascript:;">什么是容器镜像？</a>
              <div className="imgDropBox">
                <DropdownButton bsSize="xs" title="操作" id="dropDown" className="dropDownForOpt">
                  <MenuItem eventKey="1">全选</MenuItem>
                  <MenuItem eventKey="2">删除</MenuItem>
                  <MenuItem eventKey="2">置顶</MenuItem>
                </DropdownButton>
              </div>
      </div>);
    return (
      <div className="images containerPadding">
        <Panel className="image-left" header={panelHd}>
          <div className="imagesListBox">
            <div className="imagesListItem">
              <div className="hd">
                <div className="imagesListHd">
                  <Checkbox readOnly />
                  <img width={40} height={40} src={require('./imgHd.png')} alt="img"/>
                </div>
                <div className="imagesListInfo">
                  <h1>镜像名称</h1>
                  <p><a href="javascript:;">shanlinfeiniao/docker-minecececraft</a></p>
                </div>
              </div>
              <div className="bd clearfix">
                <span className="icon-collection icon-collectctd">收藏</span>
                <Button bsStyle="primary" bsSize="small">部署</Button>
              </div>
            </div>
            <div className="imagesListItem">
              <div className="hd">
                <div className="imagesListHd">
                  <Checkbox readOnly />
                  <img width={40} height={40} src={require('./imgHd.png')} alt="img"/>
                </div>
                <div className="imagesListInfo">
                  <h1>镜像名称</h1>
                  <p><a href="javascript:;">shanlinfeiniao/docker-minecececraft</a></p>
                </div>
              </div>
              <div className="bd clearfix">
                <span>收藏</span>
                <Button bsStyle="primary" bsSize="small">部署</Button>
              </div>
            </div>
            <div className="imagesListItem">
              <div className="hd">
                <div className="imagesListHd">
                  <Checkbox readOnly />
                  <img width={40} height={40} src={require('./imgHd.png')} alt="img"/>
                </div>
                <div className="imagesListInfo">
                  <h1>镜像名称</h1>
                  <p><a href="javascript:;">shanlinfeiniao/docker-minecececraft</a></p>
                </div>
              </div>
              <div className="bd clearfix">
                <span>收藏</span>
                <Button bsStyle="primary" bsSize="small">部署</Button>
              </div>
            </div>
            <div className="imagesListItem">
              <div className="hd">
                <div className="imagesListHd">
                  <Checkbox readOnly />
                  <img width={40} height={40} src={require('./imgHd.png')} alt="img"/>
                </div>
                <div className="imagesListInfo">
                  <h1>镜像名称</h1>
                  <p><a href="javascript:;">shanlinfeiniao/docker-minecececraft</a></p>
                </div>
              </div>
              <div className="bd clearfix">
                <span>收藏</span>
                <Button bsStyle="primary" bsSize="small">部署</Button>
              </div>
            </div>
            <div className="imagesListItem">
              <div className="hd">
                <div className="imagesListHd">
                  <Checkbox readOnly />
                  <img width={40} height={40} src={require('./imgHd.png')} alt="img"/>
                </div>
                <div className="imagesListInfo">
                  <h1>镜像名称</h1>
                  <p><a href="javascript:;">shanlinfeiniao/docker-minecececraft</a></p>
                </div>
              </div>
              <div className="bd clearfix">
                <span>收藏</span>
                <Button bsStyle="primary" bsSize="small">部署</Button>
              </div>
            </div>
            <div className="imagesListItem">
              <div className="hd">
                <div className="imagesListHd">
                  <Checkbox readOnly />
                  <img width={40} height={40} src={require('./imgHd.png')} alt="img"/>
                </div>
                <div className="imagesListInfo">
                  <h1>镜像名称</h1>
                  <p><a href="javascript:;">shanlinfeiniao/docker-minecececraft</a></p>
                </div>
              </div>
              <div className="bd clearfix">
                <span>收藏</span>
                <Button bsStyle="primary" bsSize="small">部署</Button>
              </div>
            </div>
          </div>
        </Panel>
        <div className="image-right">
          <div className="imageSearch">
            <SearchBox placeholder="搜索镜像" />
          </div>
          <Panel className="imagesRankingList" header="排行榜">
            <div className="imagesListItem">
              <div className="hd">
                <div className="imagesListHd">
                  <img width={40} height={40} src={require('./imgHd.png')} alt="img"/>
                </div>
                <div className="imagesListInfo">
                  <h1>镜像名称</h1>
                  <p><a href="javascript:;">shanlinfeinia2qwesdas</a></p>
                </div>
              </div>
            </div>
            <div className="imagesListItem">
              <div className="hd">
                <div className="imagesListHd">
                  <img width={40} height={40} src={require('./imgHd.png')} alt="img"/>
                </div>
                <div className="imagesListInfo">
                  <h1>镜像名称</h1>
                  <p><a href="javascript:;">shanlinfeinia2qwesdas</a></p>
                </div>
              </div>
            </div>
            <div className="imagesListItem">
              <div className="hd">
                <div className="imagesListHd">
                  <img width={40} height={40} src={require('./imgHd.png')} alt="img"/>
                </div>
                <div className="imagesListInfo">
                  <h1>镜像名称</h1>
                  <p><a href="javascript:;">shanlinfeinia2qwesdas</a></p>
                </div>
              </div>
            </div>
            <div className="imagesListItem">
              <div className="hd">
                <div className="imagesListHd">
                  <img width={40} height={40} src={require('./imgHd.png')} alt="img"/>
                </div>
                <div className="imagesListInfo">
                  <h1>镜像名称</h1>
                  <p><a href="javascript:;">shanlinfeinia2qwesdas</a></p>
                </div>
              </div>
            </div>
            <div className="imagesListItem">
              <div className="hd">
                <div className="imagesListHd">
                  <img width={40} height={40} src={require('./imgHd.png')} alt="img"/>
                </div>
                <div className="imagesListInfo">
                  <h1>镜像名称</h1>
                  <p><a href="javascript:;">shanlinfeinia2qwesdas</a></p>
                </div>
              </div>
            </div>
            <div className="imagesListItem">
              <div className="hd">
                <div className="imagesListHd">
                  <img width={40} height={40} src={require('./imgHd.png')} alt="img"/>
                </div>
                <div className="imagesListInfo">
                  <h1>镜像名称</h1>
                  <p><a href="javascript:;">shanlinfeinia2qwesdas</a></p>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    )
  }
}

export default ImageForMy;
