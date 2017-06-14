
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Error.css';
import cx from 'classnames';

class Error extends Component {
  static propTypes = {
  };
  componentDidMount(){
  }
  render(){
    return (
      <div className={cx(s.root)}>
        网页坏掉啦~~~
      </div>
    )
  }
}
export default withStyles(s)(Error)
