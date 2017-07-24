import OrgBilling from './OrgBilling';
import {connect} from 'react-redux'
import {
  setBreadcrumbAction,
} from '../../../actions/breadcumb';
import * as funUser from "../../../actions/users";
const mapStateToProps = (state) => {
  return {
    isBtnState:state.isBtnState,
    token:state.token,
    rechargeList:state.rechargeList,
    consume:state.consume,
    oauth:state.oauth,
    balance:state.balance,
    levels:state.levels,
    couponList:state.couponList,
    couponGiftList:state.couponGiftList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    getRechargeList:(data) =>{
      dispatch(funUser.fetchGetRechargeList(data))
    },
    getConsumeList:(data) =>{
      dispatch(funUser.fetchGetConsumeList(data))
    },
    getBalance:() =>{
      dispatch(funUser.fetchGetBalanceAction())
    },
    getCouponList:(data) =>{
      dispatch(funUser.fetchGetCouponListAction(data))
    },
    createCoupon:(data,my,pageData) =>{
      dispatch(funUser.fetchCreateCouponAction(data,my,pageData))
    },
    activationCoupon:(uuid,pageData) =>{
      dispatch(funUser.fetchActivationCoupon(uuid,pageData))
    },
    distributeCoupon:(data,my,pageData) =>{
      dispatch(funUser.fetchDistributeCouponAction(data,my,pageData))
    },
    getCouponGiftList:(data) =>{
      dispatch(funUser.fetchGetCouponGiftListAction(data))
    }
  }
};

const OrgBillingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgBilling);

export default OrgBillingContainer
