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

class ContainerBox extends Component {//input滑块
  static propTypes = {
    getContainer: React.PropTypes.func,
    number: React.PropTypes.number,
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
    this.props.getContainer(index);
  }
  render(){
    let me = this, index = this.state.index;
    let data = [
          {x:1,m:"128M"},
          {x:2,m:"256M"},
          {x:4,m:"512M"},
          {x:8,m:"1024M"},
          {x:16,m:"2048M"},
        ];
    let children = data.map(function(item,i){
      return (
        <ContainerItem key={i} index={i} active={i == index} onClick={me.handleClick.bind(me,i)}>
          <span>{item.x}</span>
          <span>x</span>
          <span>{item.m}</span>
        </ContainerItem>
      );
    });

    return (
      <div>
        {children}
      </div>
    )
  }
}

// var ContainerBox = React.createClass({
//   getDefaultProps:function(){
//     return{
//       getContainer:function(){},
//       number:0
//     }
//   },
//   getInitialState:function(){
//     console.log(this.props.number);
//     return{
//       index: this.props.number
//     }
//   },
//   handleClick:function(index){
//     this.setState({
//       index: index
//     });
//     this.props.getContainer(index);
//   },
//   render:function() {
//     let me = this, index = this.state.index;
//     let data = [
//       {x:1,m:"128M"},
//       {x:2,m:"256M"},
//       {x:4,m:"512M"},
//       {x:5,m:"1024M"},
//       {x:16,m:"2048M"},
//     ];
//
//     let children = data.map(function(item,i){
//       return (
//         <ContainerItem key={i} index={i} active={i == index} onClick={me.handleClick}>
//           <span>{item.x}</span>
//           <span>x</span>
//           <span>{item.m}</span>
//         </ContainerItem>
//       );
//     });
//
//     return (
//       <div>
//         {children}
//       </div>
//     )
//   }
// })

export default withStyles(s)(ContainerBox);
