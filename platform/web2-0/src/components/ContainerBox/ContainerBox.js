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
import s from './ContainerBox.css';
import ContainerItem from '../ContainerItem';
import {CPU} from '../../constants';

export default class extends Component {
  static propTypes = {
    number: React.PropTypes.number,
    getCosts:React.PropTypes.func,
    getPodNum:React.PropTypes.func,
    detail:React.PropTypes.bool,
    defaultValue:React.PropTypes.number,
    modal:React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      index: this.props.number
    };
  }
  handleClick(component,index){
    this.setState({
      index: index
    });
    if(!this.props.detail&&!this.props.modal){
      let pod_num = this.props.getPodNum();
      let x = CPU[index].x;
      let data = {
        resource_type:"app",
        resource_conf:parseInt(x)*pod_num+"x",
        resource_status:"on",
        hours:1
      };
      this.props.getCosts(data);
    }
  }
  getX(){
    return parseInt(CPU[this.state.index].x);
  }
  getValue(){
    return this.state.index;
  }
  render(){
    let me = this, index = this.state.index;
    let children = CPU.map(function(item,i){
          return (
            <ContainerItem key={i}
                           index={i}
                           active={i == index}
                           x={item.x}
                           m={item.m}
                           cpu={item.cpu}
                           onClick={me.handleClick.bind(me,i)}
            >
            </ContainerItem>
          );
      });

    return (
      <div>
        {
          this.props.detail?children[this.props.number]:children
        }
      </div>
    )
  }
}
