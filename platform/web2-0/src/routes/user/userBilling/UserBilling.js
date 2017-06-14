
import React,{PropTypes,Component} from 'react';

import {Tabs,Tab,} from 'react-bootstrap';
import GetConsume from './GetConsume';
import GetPayments from './GetPayments';
import GetCertificateMange from './GetCertificateMange';
import {BREADCRUMB} from "../../../constants";
import {navigate} from "../../../actions/route";
import {yesterdayTime} from "../../../core/utils";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../User.css';
import cx from 'classnames';

class UserBilling extends  Component{
  static contextTypes = {
    store:React.PropTypes.object
  };
  static propTypes = {
    setBreadcrumb:React.PropTypes.func,
    isBtnState:React.PropTypes.object,
    rechargeList:React.PropTypes.object,
    getRechargeList:React.PropTypes.func,
    consume:React.PropTypes.object,
    getConsumeList:React.PropTypes.func,
    balance:React.PropTypes.number,
    getBalance:React.PropTypes.func,
    couponList:React.PropTypes.object,
    getCouponList:React.PropTypes.func,
    createCoupon:React.PropTypes.func,
    activationCoupon:React.PropTypes.func,
    distributeCoupon:React.PropTypes.func,
    couponGiftList:React.PropTypes.object,
    getCouponGiftList:React.PropTypes.func,
    tab:React.PropTypes.string
  };
  constructor(props){
    super(props);
    this.state={
      tab:Number(props.tab)||1
    }
  }
  componentDidMount(){
    this.props.setBreadcrumb(BREADCRUMB.CONSOLE,BREADCRUMB.USER_CONTAINER);
  }
  componentWillReceiveProps(props){
    if(props.tab){
      this.setState({
        tab:Number(props.tab)
      })
    }
  }
  onSelectTabs(key){
    if(this.props.tab){
      this.context.store.dispatch(navigate("/userBilling/"+key));
    }
    this.setState({
      tab:key
    });
    let user_info = this.context.store.getState().user_info;
    switch (key){
      case 2://充值记录
        this.rechargeData = {
          start_time:(new Date(user_info.create_time).getTime())/1000,
          end_time:(new Date().getTime())/1000,
          page_size:10,
          page_num:1
        };
        this.props.getRechargeList(this.rechargeData);
        break;
      case 3://礼券管理
        this.coupon = {
          start_time:(new Date("2017-03-15 00:00:00").getTime())/1000,
          end_time:(new Date().getTime())/1000,
          page_size:10,
          page_num:1
        };
        this.props.getCouponList(this.coupon);
        this.props.getCouponGiftList(this.coupon);
        break;
    }
  }
  render(){
    return (
      <div className = "containerBgF">
        <div className = {s.container}>
          <Tabs
                activeKey={this.state.tab}
                onSelect = {this.onSelectTabs.bind(this)} id="userBilling" className = "tabIcon"
                ref = "tab"
          >
            <Tab eventKey={1} title="消费记录">
              <GetConsume
                consume={this.props.consume}
                getConsumeList={(data) =>{this.props.getConsumeList(data)}}
              />
            </Tab>
            <Tab eventKey={2} title="充值记录">
              <GetPayments
                rechargeList = {this.props.rechargeList}
                getRechargeList = {(data) =>{this.props.getRechargeList(data)}}
              />
            </Tab>
            <Tab eventKey={3} title="礼券管理">
              <GetCertificateMange
                couponList={this.props.couponList}
                getCouponList={(data)=>{this.props.getCouponList(data)}}
                createCoupon = {(data,my,pageData) =>{this.props.createCoupon(data,my,pageData)}}
                isBtnState = {this.props.isBtnState}
                activationCoupon = {(uuid,pageData) =>this.props.activationCoupon(uuid,pageData)}
                distributeCoupon={(data,my,pageData)=>{this.props.distributeCoupon(data,my,pageData)}}
                couponGiftList = {this.props.couponGiftList}
                getCouponGiftList={(data)=>{this.props.getCouponGiftList(data)}}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }

}

export default withStyles(s)(UserBilling);
