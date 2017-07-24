
import React, { PropTypes,Component } from 'react';
import {FormGroup,Col,Tabs,Tab,Nav,NavItem
} from 'react-bootstrap';
import Toggle from '../../../components/Toggle'
import Loading from '../../../components/Loading';
import HeadLine from '../../../components/HeadLine';
import ReactDOM from 'react-dom';
import {BREADCRUMB,INPUT_TIP} from "../../../constants";

class BuildingCreate extends React.Component{
  static contextTypes = {
    setTitle: React.PropTypes.func,
    store: React.PropTypes.object,
  };
  static propTypes = {
    isBtnState:React.PropTypes.object,
    setBreadcrumb:React.PropTypes.func,
    createBuildData:React.PropTypes.object
  };
  constructor(){
    super();
    this.state = {

    }
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.BUILD_IMAGE,BREADCRUMB.BUILD_CREATE);
  }
  render(){
    console.log(this.props.createBuildData,">>>>>");
    return (
      <div className="containerBgF">
        <div className="acBox">
          <h1>代码构建</h1>
          <p>镜像是服务运行的模板, 来源于代码, 基于 Dockerfile 构建, 默认目录在根'/'下, 文件名 Dockerfile .</p>
        </div>
        <div className="assItem">
          <HeadLine
            title="镜像简介"
            titleEnglish="IMAGE SUMMARY"
            titleInfo="简单介绍镜像的信息"
          />
          <div className="assBox">
              <textarea
                placeholder="镜像简介"
                className="form-control"
                defaultValue=""
                ref = 'detail'
              />
          </div>
        </div>
        <div className="assItem assItemNoborder">
          <HeadLine
            title="详细描述"
            titleEnglish="IMAGE DETAIL"
            titleInfo="详细介绍镜像的信息"
          />
          <div className="assBox">
              <textarea
                placeholder="详细描述"
                className="form-control"
                defaultValue=""
                ref = 'short_description'
              />
          </div>
        </div>
      </div>
    )
  }
}

export default BuildingCreate;
