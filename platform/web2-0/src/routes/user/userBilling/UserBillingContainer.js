import UserCenter from './UserBilling'
import {connect} from 'react-redux'
import {setBreadcrumbAction} from '../../../actions/breadcumb'
import {fetchGetAuthURLLAction} from '../../../actions/building';
import * as funUser from '../../../actions/users';
import * as funOrganize from  '../../../actions/organize';

const mapStateToProps = (state) => {
  return {
    isBtnState:state.isBtnState,
    rechargeList:state.rechargeList,
    consume:state.consume,
    balance:state.balance,
    couponList:state.couponList,
    couponGiftList:state.couponGiftList
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
    getCouponGiftList:(data)=>{
      dispatch(funUser.fetchGetCouponGiftListAction(data))
  }

  }
};

const UserCenterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCenter);

export default UserCenterContainer
