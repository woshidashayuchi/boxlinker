/**
 * Created by zhangsai on 16/9/2.
 */
import React,{ PropTypes,Component } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';

import cx from 'classnames';
import s from './ServiceDetail.css';
import HeadLine from '../../components/HeadLine';
import Button from 'react-bootstrap/lib/Button';

class GetRealmNameTabs extends Component{
  getRealmNameTableBody(){
    return (
      <tr>
        <td>
          <div className={cx(s.astTdBox,s.sdDomain)}>
            <input type="text" placeholder="请输入新域名"/>
          </div>
        </td>
        <td>
          <div className={s.astTdBox}></div>
        </td>
        <td>
          <div className={s.astTdBox}>
            <span className="color999">是</span>
          </div>
        </td>
        <td>
          <Button bsStyle="primary">添加</Button>
        </td>
      </tr>
    )
  }
  getRealmNameTable(){
    return (
      <table className="table table-hover table-bordered">
        <thead>
        <tr>
          <th width="25%">自有域名</th>
          <th width="25%">CNAME地址</th>
          <th width="25%">域名验证</th>
          <th width="25%">操作</th>
        </tr>
        </thead>
        <tbody>
        {this.getRealmNameTableBody()}
        </tbody>
      </table>
    )
  }
  render(){
    return(
      <div>
        <div className={cx(s.assItem)}>
          <HeadLine
            title="绑定自有域名"
            titleEnglish="BIND OWN DOMAIN"
            titleInfo="域名绑定说明"
          />
        </div>
        <div className={cx(s.assItem)}>
          {this.getRealmNameTable()}
        </div>
      </div>
    )
  }
}

export default withStyle(s)(GetRealmNameTabs);
