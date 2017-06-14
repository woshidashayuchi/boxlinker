import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import {clearRecharges,clearSwitchRecharges} from '../../actions/users';
import cx from "classnames";
import s from "./Pay.css";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Qrcode from "qrcode-react";
class Pay extends Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    isBtnState:React.PropTypes.object,
    recharges:React.PropTypes.object,
    getRecharge:React.PropTypes.func,
    switchRecharges:React.PropTypes.object,
    getSwitchRecharges:React.PropTypes.func,
    size:React.PropTypes.string
  };
  constructor(props){
    super(props);
    this.state = {
      show:false,
      payNumber:100,
      showInput:false,
      payWay:"weixin",
      payInput:false

    }
  }
  componentWillReceiveProps(props){
    console.log(props,"<<<<<<")
    if(props.recharges.qr_code){
      clearInterval(this.myTime);
      let data = {
        recharge_uuid:props.recharges.recharge_uuid,
        my:this
      };
      let my = this;
      if(props.switchRecharges.recharge_uuid){
        console.log("支付成功>>>>" );
        this.context.store.dispatch(clearRecharges());
        this.context.store.dispatch(clearSwitchRecharges());
        window.location.reload();
        clearInterval(this.myTime);
      }else{
        this.myTime = setTimeout(function(){
          console.log("轮询>>>>");
          my.props.getSwitchRecharges(data);
        },5000)
      }
    }
  }
  componentDidUpdate(props){
    // console.log(props,">>>>>")
  }
  open(){
    this.setState({
      show:true,
    })
  }
  hide(){
    this.setState({
      show:false,
      showInput:false
    });
    this.context.store.dispatch(clearRecharges());
  }
  choosePayNumber(number){
    this.setState({
      payNumber:number,
      showInput:false,
    })
  }
  choosePayOther(){
    this.setState({
      payNumber:0,
      showInput:true
    });
    let my = this;
    setTimeout(function(){
      my.refs.payInput.focus();
    },200)
  }
  choosePayWay(way){
    this.setState({
      payWay:way
    })
  }
  payInput(e){
    let number = e.target.value;
    if(number.length == 0){
      this.setState({
        payNumber:0
      });
      return;
    }
    if(!/^[1-9]\d*$/.test(number)){
      this.setState({
        payInput:true
      });
      this.refs.pay_tip.innerHTML = "充值金额必须为整数";
    }else{
      this.setState({
        payInput:false,
        payNumber:number
      })
    }
  }
  getPay(){
    let recharge_amount = this.state.payNumber;
    let recharge_type = this.state.payWay;
    if(!recharge_amount){
      this.setState({
        payInput:true
      });
      this.refs.pay_tip.innerHTML = "充值金额必须为整数";
      return false;
    }
    let data = {
      recharge_amount:recharge_amount,
      recharge_type:recharge_type
    };
    if(!this.state.payInput){
      this.props.getRecharge(data);
    }
  }
  goToPrev(){
    this.context.store.dispatch(clearRecharges());
    this.setState({
      payNumber:100
    })
  }
  render(){
    return(
      <div className={s.root}>
      <button className={`btn btn-primary ${this.props.size?this.props.size:"btn-sm"}`} onClick = {this.open.bind(this)}>充值</button>
      <Modal {...this.props} show={this.state.show}
             onHide={this.hide.bind(this)}
             bsSize="sm" aria-labelledby="contained-modal-title-sm">
        <div className="modal-header">
          <button type="button" onClick={this.hide.bind(this)} className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 className="modal-title" id="contained-modal-title-sm">
            {
              this.props.recharges.qr_code?
                this.props.recharges.recharge_type =="zhifubao"?"支付宝扫码支付":"微信扫码支付"
                :"充值"
            }
          </h4>
        </div>
        {
          this.props.recharges.qr_code?
            <div className = "modal-body">
              <p className = "text-danger text-left">请在5分钟内进行支付</p>
              <div className = "modalItem text-center">
                <Qrcode value = {this.props.recharges.qr_code}
                        size = {180}
                />
              </div>
              <div className = "modalItem text-center">
                <button className = "btn btn-primary" onClick = {this.goToPrev.bind(this)}>返回上一步</button>
              </div>
            </div>
            :
            <div className="modal-body">
              <div className = {this.state.payInput?cx(s.show,"modalItem has-error"):"modalItem"}>
                <label><span>充值金额</span></label>
                <div className={cx(s.payNumber,"form-group-sm")}>
                  <button className = {cx("btn",this.state.payNumber ==100?"btn-primary":"btn-default")}
                          onClick = {this.choosePayNumber.bind(this,100)}
                  >100</button>
                  <button className = {cx("btn",this.state.payNumber ==200?"btn-primary":"btn-default")}
                          onClick = {this.choosePayNumber.bind(this,200)}
                  >200</button>
                  <button className = {cx("btn",this.state.payNumber ==500?"btn-primary":"btn-default")}
                          onClick = {this.choosePayNumber.bind(this,500)}
                  >500</button>
                  <button className = "btn btn-default"
                          onClick = {this.choosePayOther.bind(this)}
                  >其他金额</button>
                  <input type = "text" ref = "payInput"
                         onInput = {this.payInput.bind(this)}
                         placeholder = "单笔最少一元"
                         className={cx("form-control",this.state.showInput?"":"hidden")} />
                </div>
                <div ref = "pay_tip" className={cx(s.modileTip,"volumeTip")}></div>
              </div>
              <div className = "modalItem">
                <label className={s.pay}><span>充值方式</span></label>
                <label className={s.payLogo}>
                  <img src = {this.state.payWay == "weixin"?"/images/payWxActive.png":"/images/payWx.png"}
                       onClick = {this.choosePayWay.bind(this,"weixin")}
                       width = "100px" height = "34px" />
                  <img src = {this.state.payWay == "zhifubao"?"/images/payZfbActive.png":"/images/payZfb.png"}
                       onClick = {this.choosePayWay.bind(this,"zhifubao")}
                       width = "100px" height = "34px" />
                </label>
              </div>
              <div className="modalItem modelItemLast">
                <label><span> </span></label>
                <label>
                  <button className="btn btn-primary"
                          onClick = {this.getPay.bind(this)}
                          disabled={!this.props.isBtnState.pay}
                  >确定</button>
                </label>
              </div>
            </div>

        }
      </Modal>
      </div>
    )
  }
}

export default withStyles(s)(Pay);
