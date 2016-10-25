
import React, { PropTypes,Component } from 'react';

import {Media,Tabs,Tab,FormControl,FormGroup,Col,Checkbox,Button} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AddCode.css';

import HeadLine from '../../components/HeadLine';


class AddCode extends React.Component{
  static contextTypes = {
    setTitle: React.PropTypes.func
  };
  render(){
    this.context.setTitle('添加代码');

    return (
      <div className="containerBgF">
        <div className={s.acBox}>
          <h1>创建新代码项目</h1>
          <p>项目描述了应用从代码源,通过集成测试,到可部署镜像的自动化构建过程。构建成功后,会将创建的应用镜像自动发布到您的镜像仓库中,在那可以进一步管理和部署您的应用。</p>
          <div className={s.assItem}>
            <HeadLine
              title="项目名称"
              titleEnglish="PROJECT NAME"
              titleInfo="项目内容的描述"
            />
            <div className={s.assBox}>
              <FormControl
                type="text"
                placeholder=""
              />
            </div>
          </div>
          <div className={s.assItem}>
            <HeadLine
              title="代码源"
              titleEnglish="CODE SOURCES"
              titleInfo="代码源的描述等"
            />
            <div className={s.assBox}>
              <div className={s.codeSource}></div>
              <Button bsStyle="default">同步代码</Button>
            </div>
          </div>
          <div className={s.assItem}>
            <HeadLine
              title="构建位置"
              titleEnglish="CONSTRUCTION POSITION"
              titleInfo="Dockerfile是指导镜像构建的描述文件，系统会根据您设置的构建目录查找Dockerfile并在该目录下执行镜像构建命令。"
            />
            <div className={cx(s.assBox,s.assBoxW100)}>
              <div className={s.assPosition}>
                <FormGroup controlId="form">
                  <Col sm={2}>
                    构建目录
                  </Col>
                  <Col sm={5}>
                    <FormControl type="text" placeholder="" />
                  </Col>
                </FormGroup>
              </div>
              <div className={s.assPosition}>
                <FormGroup controlId="form">
                  <Col sm={2}>
                    Dockerfile路径
                  </Col>
                  <Col sm={5}>
                    <FormControl type="text" placeholder="" />
                  </Col>
                </FormGroup>
              </div>
            </div>
          </div>
          <div className={s.assItem}>
            <HeadLine
              title="镜像应用"
              titleEnglish="MIRROR APPLICATION"
              titleInfo="应用镜像是打通应用开发和业务运维之间通路的关键交付件，也是应用统一发布的重要一环。"
            />
            <div className={s.assBox}>
              <Checkbox>镜像仓库</Checkbox>
              <div className={s.acBtn}>
                <Button bsStyle="warning">开始构建</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(AddCode);
