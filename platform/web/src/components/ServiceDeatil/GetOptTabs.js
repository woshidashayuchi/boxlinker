/**
 * Created by zhangsai on 16/9/2.
 */
import React,{ PropTypes,Component } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';

import s from './ServiceDetail.css';
import Button from 'react-bootstrap/lib/Button';


class GetOptTabs extends Component{
  render(){
    return(
      <div className={s.handleBox}>
        <Button bsStyle="danger">删除应用</Button>
        <p>*删除应用将清除该应用的所有数据，且该操作不能被恢复，请慎重选择！ </p>
      </div>
    )
  }
}

export default withStyle(s)(GetOptTabs);
