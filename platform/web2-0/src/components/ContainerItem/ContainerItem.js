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
import s from './ContainerItem.css';
import cx from 'classnames';

class ContainerItem extends Component{
  static propTypes = {
    x:React.PropTypes.string,
    m:React.PropTypes.string,
    cpu:React.PropTypes.number,
    onClick:React.PropTypes.func,
    index:React.PropTypes.number
  };
  handleClick(){
    this.props.onClick(this.props.index);
  }
  render(){
    var style=this.props.active?"csActive csItem csItem"+(Number(this.props.index)+1):"csItem csItem"+(Number(this.props.index)+1);
    return (
      <div className={style} onClick={this.handleClick.bind(this)}>
        <p className="csSize" >{this.props.x}</p>
        <p className="csUnit">{this.props.cpu} <span>(cpu)</span></p>
        <p className="csUnit">{this.props.m} <span>(内存)</span></p>
      </div>
    )
  }
}

export default withStyles(s)(ContainerItem);
