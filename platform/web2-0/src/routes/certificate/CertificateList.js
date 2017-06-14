
import React, { PropTypes,Component } from 'react';
import {SplitButton,MenuItem,Pagination} from 'react-bootstrap'
import { BREADCRUMB } from '../../constants';
import HeadLine from '../../components/HeadLine';
import Loading from "../../components/Loading";
import Confirm from '../../components/Confirm';
import {receivevolumeDelete} from "../../actions/certificate";
import {timeRange} from "../../core/utils";
import s from "./Certificate.css";
import widthstyle from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";



class Certificate extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    onCertificateCreate: React.PropTypes.func,
    onGetCertificate: React.PropTypes.func,
    onCertificateUp:React.PropTypes.func,
    setBreadcrumb: React.PropTypes.func,
    certificateList: React.PropTypes.object,
    //onClearVolumesList:React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    modalState:React.PropTypes.object,
    //costs:React.PropTypes.number,
    //getCosts:React.PropTypes.func,
  };
  constructor(){
    super();
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.CERTIFICATE);
    this.props.onGetCertificate();
  }
  componentDidUpdate(){
    this.getTableLine()
  }
  createVolume(){
    let count = this.props.certificateList;
    let dd = this.refs.fs_con.value+","+'tls.key:'+this.refs.fs_mi.value;
    if (this.props.certificateList.certify_uuid){
      let id = this.props.certificateList.certify_uuid;
      if(!(count.certify == dd)){
        this.props.onCertificateUp(dd,id)
      }
    }else {
      this.props.onCertificateCreate(dd);
    }
  }
  getTableLine(){

    let count = this.props.certificateList;
    let fsNum = count.certify.indexOf(',');
    let fsCon = count.certify.substring(0,fsNum);
    let keyNum = count.certify.indexOf(':');
    let keyCon = count.certify.substring(keyNum+1);
    if (count.certify_uuid){
      console.log(this.refs.fs_con);
      this.refs.fs_con.value=fsCon;
      this.refs.fs_mi.value=keyCon;
    }else {
      this.refs.fs_con.value='';
      this.refs.fs_mi.value='';
    }
  }
  refresh(){
    this.props.onGetCertificate();
  }
  render(){
    return (
      <div className="containerBgF">
        <div className="projectHead clearfix">
          <div className="projectHeadL left">
            <span className={s.titleSpan}>证书管理</span>
          </div>
          <div id={s.rightTop} className="projectHeadR right">
            <button className="btn btn-default icon-refresh" onClick = {this.refresh.bind(this)} title="刷新"> </button>
          </div>
        </div>

        <div className="containerBgF">
          <div className = {s.box}>
            <div className = {s.hd}>
              <div className={s.item}>
                <HeadLine
                  title="证书内容"
                  titleEnglish="CERTIFICATE CON"
                  titleInfo="填写证书内容"
                />
                  <textarea
                    className = {s.textareaT+" form-control"}
                    ref="fs_con"
                    type="text"
                    placeholder=""
                  />
                  <span className = {s.tip} ref = "serviceNameTip" > </span>
              </div>
              <div className={s.item}>
                <HeadLine
                  title="私钥"
                  titleEnglish="PRIVATE KEY"
                  titleInfo="填写私钥内容"
                />
                <textarea
                  className = {s.textareaT+" form-control"}
                  ref="fs_mi"
                  type="text"
                  placeholder=""
                />
                  <span className = {s.tip} ref = "describeChangeTip" > </span>
              </div>
              <div className={s.createBox+" modalItem modelItemLast"}>
                <label>
                  <button id={s.createBtn} className={`btn btn-primary ${!this.props.isBtnState.volume?"btn-loading":""}`}
                          disabled={!this.props.isBtnState.volume}
                          onClick={this.createVolume.bind(this)}
                  >
                    {this.props.certificateList.certify_uuid?"更新证书":"创建证书"}
                  </button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default widthstyle(s)(Certificate);
