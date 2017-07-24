/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React,{Component} from 'react';
import s from './ServiceStep.css';
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";
class ServiceStep extends Component{

  static propTypes = {
    dataActive:React.PropTypes.string
  };
  render(){
    let active = this.props.dataActive;
    return(
      <div className={s.root}>
        <div className={cx(s.box,active == "first"?s.active:"")}>
          <div className={cx(s.icon,"icon-mirrorceer")}></div>
          <div className={s.info}>
            <p><span>1</span>镜像来源</p>
            <p>MIRRIR SOURCE</p>
          </div>
          <div className={s.triangle}></div>
        </div>
        <div className={cx(s.box,active == "second"?s.active:"")}>
          <div className={cx(s.icon,"icon-containerconfig")}></div>
          <div className={s.info}>
            <p><span>2</span>容器配置</p>
            <p>CONFIGURATION</p>
          </div>
          <div className={s.triangle}></div>
        </div>
        <div className={cx(s.box,active == "third"?s.active:"")}>
          <div className={cx(s.icon,"icon-advancedset")}></div>
          <div className={s.info}>
            <p><span>3</span>高级设置</p>
            <p>ADVANCED SETUP</p>
          </div>
          <div className={s.triangle}></div>
        </div>
      </div>
    )
  }
}

export default widthstyle(s)(ServiceStep);
var ServiceStep1 = React.createClass({
  getDefaultProps:function(){
    return {
      dataActive:"first"
    }
  },
  render:function(){
    var activeFirst="ssHdBox ssHdFirst ";
    var activeSecond="ssHdBox ssHdSecond ";
    var activeThird="ssHdBox ssHdThird ";
    switch(this.props.dataActive){
      case "first":activeFirst=activeFirst+"ssActive";
            break;
      case "second":activeSecond=activeSecond+"ssActive";
            break;
      case "third":activeThird=activeThird+"ssActive";
            break;
    }

    return (
      <div className="ssHd">
        <div className={activeFirst}>
          <div className="ssHdIcon icon-mirrorceer"></div>
          <div className="ssHdName">
            <p><span>1</span>镜像来源</p>
            <p>MIRRIR SOURCE</p>
          </div>
          <div className="ssActiveIcon"></div>
        </div>
        <div className={activeSecond}>
          <div className="ssHdIcon icon-containerconfig"></div>
          <div className="ssHdName">
            <p><span>2</span>容器配置</p>
            <p>CONFIGURATION</p>
          </div>
          <div className="ssActiveIcon"></div>
        </div>
        <div className={activeThird}>
          <div className="ssHdIcon icon-advancedset"></div>
          <div className="ssHdName">
            <p><span>3</span>高级设置</p>
            <p>ADVANCED SETUP</p>
          </div>
          <div className="ssActiveIcon"></div>
        </div>
      </div>)
  }
});
