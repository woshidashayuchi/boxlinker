
import React, { PropTypes,Component } from 'react';

import {DropdownButton,MenuItem,Media,Checkbox,Button} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CodeBuildList.css';

class AddCodeBtn extends Component{
  render(){
      return(<div className={cx("hbAddBtn", "clearfix")}>
          <div className={cx("hbPlus", "left")}></div>
          <div className={cx("hbPlusInfo", "left")}>
            <p className={"hbPName"}>添加代码</p>
            <p className={"hbPInfo"}>Add code</p>
          </div>
        </div>
    )
  }
}
class CodeBuildList extends React.Component{
  static contextTypes = {
    setTitle: React.PropTypes.func
  };
  render(){
    this.context.setTitle('代码构建');

    return (
      <div className="containerBgF">
        <div className={cx("hbHd","hbHdNoMb", "clearfix")}>
          <div className={cx("hbAdd", "left")}>
            <AddCodeBtn />
            <a href="javascript:;" className={"hbAddExplain"}>什么是容器云代码构建？</a>
          </div>
          <div className={cx(s.cblOpt,"right")}>
            <DropdownButton bsSize="xs" title="操作" id="dropDown" className="dropDownForOpt">
              <MenuItem eventKey="1">全选</MenuItem>
              <MenuItem eventKey="2">删除</MenuItem>
              <MenuItem eventKey="2">置顶</MenuItem>
            </DropdownButton>
          </div>
        </div>
        <div className={cx(s.cdBd)}>
          <div className={s.cblItem}>
            <Media>
              <div className="media-left">
                <img width={65} height={65} src={require('./imgHd.png')} alt="Image"/>
              </div>
              <div className="media-body">
                <div className="media-heading">
                  <div className={cx(s.cblHd)}>
                    <label><span className={s.cblName}>项目名称：</span><span>app00app001</span></label>
                    <label>上次构建时间：<span>1个月前</span></label>
                    <label>持续时间：<span>28小时</span></label>
                    <label>构建状态：<span>构建中</span></label>
                  </div>
                </div>
                <p><label><span className={s.cblName}>代码源：</span><span>www.asdasdasd/asda/asda/asdasss/asda/asda/asda/asdasss</span></label></p>
              </div>
            </Media>
            <Media>
              <div className="media-left">
                <div className={s.cblBtn}>
                  <Button bsStyle="warning">构建</Button>
                </div>
              </div>
              <div className="media-body">
                <p className={s.cblImage}><label><span className={s.cblName}>镜像：</span><a href="javascript:;" className="aLink">www.asdasdasd/asda/asda/asdasss/asda/asda/asdasss/asda/asda/asd</a></label></p>
              </div>
            </Media>
             <div className={s.cblCheckbox} style={{display:"none"}}><Checkbox></Checkbox></div>
          </div>

          
        </div>
      </div>
    )
  }
}

export default withStyles(s)(CodeBuildList);
