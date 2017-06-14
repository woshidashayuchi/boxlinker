/**
 * Created by zhangsai on 16/9/2.
 */
import React,{ PropTypes,Component } from 'react';
import HeadLine from '../../../components/HeadLine';
import s from "./ServiceDetail.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import * as Const from '../../../constants';
import cx from "classnames";

class GetRealmNameTabs extends Component{
  static propTypes = {
    serviceDetail:React.PropTypes.object,
    onSaveDomain:React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    serviceUuid:React.PropTypes.string,
    repeatName:React.PropTypes.object,
    onRepeatDomainName:React.PropTypes.func
  };
  constructor(){
    super();
    this.state = {
      isDomain:false
    }
  }
  componentWillReceiveProps(props){
    if(props.repeatName.domain){
      this.setState({
        isDomain:true
      });
      this.refs.errorTip.innerHTML = Const.INPUT_TIP.domain.Repeat;
    }
  }
  componentDidMount(){
  }
  saveDomain(){
    let val = this.refs.domain.value.trim();
    console.log(val,">>>>")
    let data = {
      serviceUuid:this.props.serviceUuid,
      cname:this.refs.cname.value,
      domain:this.refs.domain.value,
    };
    if(val.length ==0){
      this.setState({
        isDomain:true
      });
      this.refs.errorTip.innerHTML = Const.INPUT_TIP.domain.Null;

    }else{
      if(!this.state.isDomain){
        this.refs.save.setAttribute("disabled",true);
        this.props.onSaveDomain(data);
      }
    }
  }
  onInputDomain(){
    let val = this.refs.domain.value.trim();
    let reg = Const.REGEXP_DOMAIN;
    if(!reg.test(val)) {
      this.setState({
        isDomain: true
      });
      this.refs.errorTip.innerHTML = Const.INPUT_TIP.domain.Format;
    }else{
      this.setState({
        isDomain:false
      });
      this.props.onRepeatDomainName(val);
      this.refs.errorTip.innerHTML = "";
    }
  }
  getRealmNameTableBody(){
    let data = this.props.serviceDetail;
    let domain = [];
    let domainData = [];
    let identify = null;
    data.container.map((item) =>{
      if(item.cname){
        domain.push(item.cname);
      }
      if(item.domain){
        identify = item.identify;
        domainData.push(item.domain);
      }
    });
    return (
      <tr>
        <td className={this.state.isDomain?"has-error":""}>
            <input className="form-control"
                   onInput={this.onInputDomain.bind(this)}
                   defaultValue={domainData}
                   ref = "domain" type="text" placeholder="请输入自有域名"/>
        </td>
        <td>
          <div className="astTdBox">
            <p ref = "cname" >{domain}</p>
          </div>
        </td>
        <td>
          <div className="astTdBox">
            <span className={identify == 1?"text-success":"text-danger"}>
              {
                identify ==1 ?"是":"否"
              }
            </span>
          </div>
        </td>
        <td>
          <button className="btn btn-primary"
                  ref = "save"
                  key = {new Date().getTime()}
                  onClick = {this.saveDomain.bind(this)}>保存</button>
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
          <th width="35%">CNAME地址</th>
          <th width="20%">域名验证</th>
          <th width="20%">操作</th>
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
        <div className={s.item}>
          <HeadLine
            title="绑定自有域名"
            titleEnglish="BIND OWN DOMAIN"
            titleInfo="域名绑定说明"
          />
        </div>
        <div className={cx(s.domain,"tableBox")}>
          {this.getRealmNameTable()}
          <p className="text-danger" ref = "errorTip"> </p>
        </div>
      </div>
    )
  }
}

export default widthstyle(s)(GetRealmNameTabs);
