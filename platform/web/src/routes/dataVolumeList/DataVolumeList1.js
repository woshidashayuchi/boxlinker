/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes,Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import MirrorIcon from '../../components/MirrorIcon';
import TableDemo from '../../components/Table';
import cx from 'classnames';
import s from './DataVolumeList.css';

import Checkbox from 'react-bootstrap/lib/Checkbox';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputRange from 'react-input-range';

const title = '数据卷列表';

class InputRangesBox extends Component {//input滑块
  constructor(props) {
    super(props);
    this.state = {
      value: 5
    };
  }
  handleValueChange(component, value) {
    this.setState({
      value: value,
    });
  }
  render() {
    return (
      <div className="formField">
        <InputRange
          className="formField"
          maxValue={10}
          minValue={0}
          labelPrefix="共计"
          labelSuffix="个"
          value={this.state.value}
          onChange={this.handleValueChange.bind(this)}
        />
      </div>
    );
  }
}

class AddNewVolumeBtn extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }
  showModal() {
    this.setState({show: true});
  }
  hideModal() {
    this.setState({show: false});
  }
  render(){
    return(<div className={cx("hbAddBtn", "clearfix")} onClick={this.showModal.bind(this)}>
        <div className={cx("hbPlus", "left")}></div>
        <div className={cx("hbPlusInfo", "left")}>
          <p className={"hbPName"}>创建存储卷</p>
          <p className={"hbPInfo"}>Create a volume</p>
        </div>
        {/*//弹框*/}
        <Modal {...this.props} show={this.state.show} onHide={this.hideModal.bind(this)} bsSize="sm" aria-labelledby="contained-modal-title-sm">
          <div className="modal-header">
            <button type="button" onClick={this.hideModal.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="contained-modal-title-sm">创建存储卷</h4>
          </div>
          <div className="modal-body">
            <div className="modalItem">
              <label><span>名称</span></label>
              <label><FormControl bsSize="sm" type="input" placeholder="请输入名称" /></label>
            </div>
            <div className="modalItem">
              <label><span>大小</span></label>
              <label>
                <div className="modelInputRange">
                  <InputRangesBox />
                  <span>充值用户可以创建更大存储卷</span>
                </div>
              </label>
            </div>
            <div className="modalItem">
              <label><span>格式</span></label>
              <label>
                <FormControl componentClass="select" placeholder="请选择格式">
                  <option value="xfs">xfs</option>
                  <option value="xfs">xfs</option>
                </FormControl>
              </label>
            </div>
            <div className="modalItem modelItemLast">
              <label><span> </span></label>
              <label>
                <Button bsStyle="primary">创建存储卷</Button>
              </label>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

class DilatationBtn extends Component{//  扩容按钮
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }
  showModal() {
    this.setState({show: true});
  }
  hideModal() {
    this.setState({show: false});
  }
  render(){
    return <div>
            <Button bsStyle="primary" onClick={this.showModal.bind(this)}>扩容</Button>
            {/*//弹框*/}
            <Modal {...this.props} show={this.state.show} onHide={this.hideModal.bind(this)}  bsSize="sm" aria-labelledby="contained-modal-title-sm">
              <div className="modal-header">
                <button type="button" onClick={this.hideModal.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 className="modal-title" id="contained-modal-title-sm">扩容</h4>
              </div>
              <div className="modal-body">
                <div className="modalItem dilatationModalItem">
                  <label><span>大小</span></label>
                  <label>
                    <div className="modelInputRange">
                      <InputRangesBox />
                      <span>充值用户可以创建更大存储卷</span>
                    </div>
                  </label>
                </div>
                <div className="modalItem modelItemLast dilatationModalItem">
                  <label><span> </span></label>
                  <label>
                    <Button bsStyle="default">保存</Button>
                  </label>
                </div>
              </div>
            </Modal>
          </div>
  }
}

class DataVolumeList extends Component{
  static contextTypes = {setTitle: PropTypes.func.isRequired};
  getDataVolumeData(){
    return new Promise(function(resolve,reject){
      //ajax
      let data = [
        {name:"这个是存储名字",time:"一个月前",format:"xfs",size:"500M",state:0},
        {name:"这个是存储名字",time:"一个月前",format:"xfs",size:"500M",state:0},
        {name:"这个是存储名字",time:"一个月前",format:"xfs",size:"500M",state:0},
        {name:"这个是存储名字",time:"一个月前",format:"xfs",size:"500M",state:1},
        {name:"这个是存储名字",time:"一个月前",format:"xfs",size:"500M",state:1},
        {name:"这个是存储名字",time:"一个月前",format:"xfs",size:"500M",state:1},
        {name:"这个是存储名字",time:"一个月前",format:"xfs",size:"500M",state:0},
      ];
      let stateStyle=[s.mirrorState];
      let stateTxt=["运行","停止"];
      data.map(function(item){
        stateStyle = item.state==0?stateStyle.concat([s.on]):stateStyle.concat([s.off]);
        item.name=<div className="tablePaddingLeft"><Checkbox readOnly /><MirrorIcon text={item.name} /></div>;
        item.time=<div className="tablePaddingLeft"><span className="color333">{item.time}</span></div>;
        item.format=<div className="tablePaddingLeft"><a href="javascript:;" className="color333">{item.format}</a></div>;
        item.state=<div className={cx(stateStyle,"tablePaddingLeft")}>{stateTxt[item.state]}</div>;
        item.size=<div className="tablePaddingLeft"><span className="color333">{item.size}</span></div>;
        item.opt=<div className="tablePaddingLeft">
                  <DilatationBtn />
                  </div>;
      });
      resolve(data)
    }.bind(this));
  }
  getDataVolumeTable(){
    let cols = [
      {name: "name",label:"存储名称",width:"30%"},
      {name: "time",label:"创建时间",width:"15%"},
      {name: "format",label:"存储格式",width:"15%"},
      {name: "state",label:"状态",width:"15%"},
      {name: "size",label:"大小",width:"10%"},
      {name: "opt",label:(<DropdownButton bsSize="xs" title="操作" id="dropDown" className="dropDownForOpt">
        <MenuItem eventKey="1">全选</MenuItem>
        <MenuItem eventKey="2">删除</MenuItem>
        <MenuItem eventKey="2">置顶</MenuItem>
      </DropdownButton>),width:"15%"}
    ];
    return (
      <TableDemo
        columes={cols}
        getDataFunc={this.getDataVolumeData} />
    )
  }
  render(){
    this.context.setTitle(title)
    return (
      <div className="containerBgF">
        <div className={cx("hbHd", "clearfix")}>
          <div className={cx("hbAdd", "left")}>
            <AddNewVolumeBtn />
            <a href="javascript:;" className={"hbAddExplain"}>什么是存储卷？</a>
          </div>
        </div>
        <div className={cx(s.slBd,"TableTextLeft")}>
          {this.getDataVolumeTable()}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(DataVolumeList);
