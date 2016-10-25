
import React, { PropTypes,Component } from 'react';

import {Media,Tabs,Tab,FormControl,FormGroup,Col,Button} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CodeBuild.css';

class CodeBuild extends React.Component{
  static contextTypes = {
    setTitle: React.PropTypes.func
  };
  static propTypes = {
    projectId: React.PropTypes.string.isRequired
  };
  BuildLog(){//构建日志
    return(
      <div className={s.logBox}>
        <div className={cx(s.logHd,'icon-fail')}>{/*icon-finish,icon-fail*/}
          <label>项目名称：<span>app00app001</span></label>
          <label>上次构建时间：<span>1个月前</span></label>
          <label>持续时间：<span>28小时</span></label>
          <label>构建状态：<span>失败</span></label>
        </div>
        <div className={s.logBd}>

        </div>
      </div>
    )
  };
  baseSeting(){//基本设置
    return(
      <div className={s.baseSet}>
        <div className={s.baseItem}>
          <FormGroup controlId="form">
            <Col sm={2}>
              项目名称
            </Col>
            <Col sm={5}>
              <FormControl type="text" placeholder="" />
            </Col>
          </FormGroup>
        </div>
        <div className={s.baseItem}>
          <FormGroup controlId="form">
            <Col sm={2}>
              Dockerfile位置
            </Col>
            <Col sm={5}>
              <FormControl type="text" placeholder="" />
            </Col>
            <Col sm={2}><span>请输入位置路径</span></Col>
          </FormGroup>
        </div>
        <div className={s.baseItem}>
          <FormGroup controlId="form">
            <Col sm={2}>
              默认代码分支
            </Col>
            <Col sm={5}>
              <FormControl type="text" placeholder="" />
            </Col>
          </FormGroup>
        </div>
        <div className={s.baseItem}>
          <FormGroup controlId="form">
            <Col sm={2}>

            </Col>
            <Col sm={5}>
              <Button bsStyle="primary">确认修改</Button>
            </Col>
          </FormGroup>
        </div>
      </div>
    )
  };
  handle(){//操作
    return(
      <div className={s.handleBox}>
        <Button bsStyle="danger">删除项目</Button>
        <p>*删除项目将清除项目相关数据，请慎重选择！ </p>
      </div>
    )
  };
  render(){
    this.context.setTitle('构建镜像');

    return (
      <div className="containerBgF">
        <div className={cx(s.cdBd)}>
          <div className={s.cbCodeInfo}>
            <Media>
              <div className="media-left">
                <img width={65} height={65} src={require('./imgHd.png')} alt="Image"/>
              </div>
              <div className="media-body">
                <div className="media-heading">镜像名称</div>
                <p><a href="javascript:;" className="aLink">app00app001app00app001</a></p>
              </div>
            </Media>
          </div>
          <div className={s.cbTabs}>
            <Tabs defaultActiveKey={1} id="cbTabs">
              <Tab eventKey={1} title="构建日志">
                <div className={s.asTableBox}>
                  {this.BuildLog()}
                </div>
              </Tab>
              <Tab eventKey={2} title="基本设置">
                <div className={s.asTableBox}>
                  {this.baseSeting()}
                </div>
              </Tab>
              <Tab eventKey={3} title="操作">
                <div className={s.asTableBox}>
                  {this.handle()}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(CodeBuild);
