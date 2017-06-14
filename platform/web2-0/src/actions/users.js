
import {
  FETCH_URL,
  RECEIVE_USER_INFO,
  HOSTNAME
} from "../constants"
import * as Const from '../constants';
import fetch from 'isomorphic-fetch';
import {receiveNotification,clearNotification} from './notification';
import cookie from 'react-cookie';
import {isLoadingAction} from './header';
import {isCreateVolume} from "./volumes";
export function receiveUserInfo(data){
  return {
    type: RECEIVE_USER_INFO,
    payload: data
  }
}
export function receiveUserId(id){
  return {
    type:Const.GET_USER_ID,
    payload:id
  }
}
export function receiveOrganizeId(id){
  return{
    type:Const.GET_ORGANIZE_ID,
    payload:id
  }
}
export function receiveToken(obj){
  return {
    type:Const.GET_TOKEN,
    payload:obj
  }
}
function receiveOauth(obj){
  return {
    type:Const.GET_O_AUTH,
    payload:obj
  }
}
export function fetchGetOauth(token){
  let url = Const.FETCH_URL.IMAGE_AUTH+"/oauthclient/oauth";
  let myInit = {
    method: 'GET',
    headers: {token:token}
  };
  return (dispatch =>{
    return fetch(url, myInit)
      .then(response =>response.json())
      .then(json => {
        console.log(json,"获取第三方绑定信息");
        if (json.status == 0) {
          dispatch(receiveOauth(json.result));
        } else {

        }
      })
      .catch(e => {
        console.error('获取第三方绑定信息 error ',e);
      })
  })
}
export function fetchToken(token) {
  let url = `${FETCH_URL.UCENTER}/ucenter/tokens`;
  let myInit = {
    method: 'GET',
    headers: {
      token:token
    }
  };
  return (dispatch =>{
      return fetch(url, myInit)
        .then(response => response.json())
        .then(json => {
          if (json.status == 0) {
            dispatch(receiveUserId(json.result.user_uuid));
            dispatch(receiveOrganizeId(json.result.team_uuid));
            dispatch(receiveToken(json.result));
          } else {

          }
        })
  })
}

export function fetchUserInfo(userId,token){
  return (dispatch) => {
    let url = `${FETCH_URL.UCENTER}/ucenter/users/${userId}`;
    return fetch(url,{
      method:'GET',
      headers:{
        token: token,
        contentType: "application/json",
      }
    }).then(response => response.json())
      .then(json => {
        console.log('Get user info: ',json);
        if (json.status == 0){
          dispatch(receiveUserInfo(json.result));
        }else {
          dispatch(receiveUserInfo(null));
          console.error('fetch user info failed',json)
        }
      })
      .catch(e => {
        console.error('fetch user info error ',e)
        dispatch(receiveUserInfo(null))
      })
  }
}

export function fetchRevisePasswordAction(obj) {
  let myInit = {
    method:"POST",
    headers:{token:cookie.load("_at")},
    body:JSON.stringify({
      old_password:obj.old_password,
      new_password:obj.new_password
    })
  };
  let url = FETCH_URL.UCENTER+"/ucenter/passwords/"+obj.user_uuid;
  return (dispatch) =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,">>>>>修改密码");
        if(json.status == 0){
          dispatch(receiveNotification({message:"修改成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification());
            location.href = HOSTNAME.LOGIN;
          },3000);
        }else {
          dispatch(receiveNotification({message: "修改失败:" + json.msg, level: "danger"}));
          setTimeout(function () {
            dispatch(clearNotification())
          }, 3000);
        }
      })
      .catch(e => {
        console.error('fetch user info failed ',e)
      })
  }
}

function receiveBalance(Number){
  return{
    type:Const.GET_BALANCE,
    payload:Number
  }
}
export function fetchGetBalanceAction(){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")}
  };
  let url = Const.FETCH_URL.BILLING+"/billing/balances";
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"获取余额");
        if(json.status == 0) {
          dispatch(receiveBalance(json.result.balance))
        }else{

        }
      })
  })
}

export function fetchRelieveBindingAction(data){
  let myInit = {
    method:"DELETE",
    headers:{token:cookie.load("_at")}
  };
  let url = Const.FETCH_URL.IMAGE_AUTH+"/oauthclient/oauth/"+data.src_type;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"解除绑定");
        if(json.status == 0) {
          dispatch(receiveNotification({message: "解除成功:" + json.msg, level: "success"}));
          setTimeout(function () {
            dispatch(clearNotification());
            window.location.href = data.url;
          }, 1000);
        }else{
          dispatch(receiveNotification({message: "解除失败:" + Const.returnMsg(json.status), level: "danger"}));
          setTimeout(function () {
            dispatch(clearNotification())
          }, 3000);
        }
      })
  })
}

export function cancel() {
  let url = FETCH_URL.UCENTER+"/ucenter/tokens";
  let myInit = {
    method:"DELETE",
    headers:{token:cookie.load("_at")}
  };
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        if(json.status == 0){
          cookie.remove('_at', {path:'/', domain:HOSTNAME.COOKIE});
          location.href = HOSTNAME.INDEX;
        }
       })
  })
}
function receiveReachageList(list){
  return {
    type:Const.GET_RECHARGE_LIST,
    payload:list
  }
}
export function fetchGetRechargeList(data){
  let url = FETCH_URL.BILLING+"/billing/recharges?start_time="+data.start_time+"&end_time="+data.end_time+
    "&page_size="+data.page_size+"&page_num="+data.page_num;
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")}
  };
  return (dispatch =>{
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"充值记录");
        dispatch(isLoadingAction(false));
        if(json.status ==0){
          dispatch(receiveReachageList(json.result))
        }else{
          dispatch(receiveReachageList({count:0}));
          dispatch(receiveNotification({message:Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }
      })
      .catch(e =>{
        dispatch(receiveReachageList({count:0}));
        dispatch(isLoadingAction(false));
        console.log()
      })

  })
}
export function receiveConsumeList(list){
  return {
    type:Const.GET_CONSUME_LIST,
    payload:list
  }
}
export function fetchGetConsumeList(data){
  let url = FETCH_URL.BILLING+"/billing/bills?start_time="+data.start_time+"&end_time="+data.end_time+
    "&page_size="+data.page_size+"&page_num="+data.page_num;
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")}
  };
  return (dispatch =>{
    dispatch(isLoadingAction(true));
    dispatch(receiveConsumeList({bills_list:[1],bills_total:{resource_cost:0,voucher_cost:0}}));
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"消费记录");
        dispatch(isLoadingAction(false));
        if(json.status == 0){
          dispatch(receiveConsumeList(json.result));
        }else{
          dispatch(receiveNotification({message: "获取消费记录失败:" + Const.returnMsg(json.status), level: "danger"}));
          dispatch(receiveConsumeList({bills_list:[],bills_total:{}}));
          setTimeout(function () {
            dispatch(clearNotification())
          }, 3000);
        }
      })
      .catch(e =>{
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message: Const.error, level: "danger"}));
        setTimeout(function () {
          dispatch(clearNotification())
        }, 3000);
      })
  })
}

function receiveCosts(number){
  return {
    type:Const.GET_COSTS,
    payload:number
  }
}

export function fetchGetCostsAction(data){
  let myInit = {
    method:"POST",
    headers:{token:cookie.load("_at")},
    body:JSON.stringify(data)
  };
  let url = Const.FETCH_URL.BILLING+"/billing/costs";
  return (dispatch =>{
    dispatch(isCreateVolume(false));
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"获取费用信息");
        dispatch(isCreateVolume(true));
        if(json.status == 0){
          let cost = json.result.resource_cost;
          dispatch(receiveCosts(cost));
        }else{
          dispatch(receiveCosts(0));
          dispatch(receiveNotification({message:Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }
      })
      .catch(e =>{
        dispatch(isCreateVolume(true));
        dispatch(receiveCosts(0));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error("获取费用信息",e)
      })
  })
}
function receiveLevels(int){
  return {
    type:Const.GET_LEVELS,
    payload:int
  }
}

export function fetchGetLevelsAction(){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")},
  };
  let url = Const.FETCH_URL.BILLING+"/billing/levels";
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"获取等级信息");
        if(json.status == 0){
          let levels = json.result;
          dispatch(receiveLevels(levels));
        }
      })
      .catch(e =>{
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error("获取等级信息",e)
      })
  })
}

function receiveCouponList(arr){
  return {
    type:Const.GET_COUPON_LIST,
    payload:arr
  }
}
export function fetchGetCouponListAction(data){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")},
  };
  let url = Const.FETCH_URL.BILLING+"/billing/vouchers?start_time="+data.start_time+"&end_time="+data.end_time+
    "&page_size="+data.page_size+"&page_num="+data.page_num;
  return (dispatch =>{
    dispatch(receiveCouponList({count:-1}));
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"获取礼券列表");
        if(json.status == 0){
          let vouchers_list = json.result;
          dispatch(receiveCouponList(vouchers_list));
        }else{
          dispatch(receiveCouponList([]));
        }
      })
      .catch(e =>{
        dispatch(receiveCouponList([]));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error("获取礼券列表",e)
      })
  })
}

function receiveCouponGiftList(arr){
  return {
    type:Const.GET_COUPON_GIFT_LIST,
    payload:arr
  }
}
export function fetchGetCouponGiftListAction(data){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")},
  };
  let url = Const.FETCH_URL.BILLING+"/billing/vouchers?voucher_accept=true&page_size="+data.page_size+"&page_num="+data.page_num;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"获取收到的礼券列表");
        if(json.status == 0){
          let vouchers_list = json.result;
          dispatch(receiveCouponGiftList(vouchers_list));
        }else{
          dispatch(receiveCouponGiftList({count:0}));
        }
      })
      .catch(e =>{
        dispatch(receiveCouponGiftList({count:0}));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error("获取收到的礼券列表",e)
      })
  })
}

function isCreateCoupon(flag){
  return {
    type:Const.IS_BTN_STATE.createCoupon,
    payload:flag
  }
}
export function fetchCreateCouponAction(data,my,pageData){
  let myInit = {
    method:"POST",
    headers:{token:cookie.load("_at")},
    body:JSON.stringify(data)
  };
  let url = Const.FETCH_URL.BILLING+"/billing/vouchers";
  return (dispatch =>{
    dispatch(isCreateCoupon(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"生成礼券");
        dispatch(isCreateCoupon(true));
        if(json.status == 0){
          my.setState({
            show:false
          });
          dispatch(receiveNotification({message:"创建成功",level:"success"}));
          dispatch(fetchGetCouponListAction(pageData));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveNotification({message:"创建失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch (e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

function isCoupon(flag){
  return {
    type:Const.IS_BTN_STATE.activeCoupon,
    payload:flag
  }
}

export function fetchActivationCoupon(uuid,pageData){
  let myInit = {
    method:"POST",
    headers:{token:cookie.load("_at")},
  };
  let url = Const.FETCH_URL.BILLING+"/billing/vouchers/"+uuid;
  return (dispatch =>{
    dispatch(isCoupon(false));
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"激活礼券");
        dispatch(isCoupon(true));
        if(json.status == 0){
          dispatch(receiveNotification({message:"激活成功",level:"success"}));
          dispatch(fetchGetCouponListAction(pageData));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }else{
          dispatch(receiveNotification({message:"激活失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }
      })
      .catch(e =>{
        dispatch(isCreateVolume(true));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

export function fetchDistributeCouponAction(data,my,pageData){
  let myInit = {
    method:"PUT",
    headers:{token:cookie.load("_at")},
    body:JSON.stringify({
      accepter:data.user_name
    })
  };
  let url = Const.FETCH_URL.BILLING+"/billing/vouchers/"+data.uuid;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"分发礼券");
        if(json.status == 0){
          my.setState({
            show:false
          });
          dispatch(receiveNotification({message:"分发成功",level:"success"}));
          dispatch(fetchGetCouponListAction(pageData));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveNotification({message:"分发失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch (e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

function receiveLimits(arr){
  return {
    type:Const.GET_LIMITS,
    payload:arr
  }
}
export function fetchGetLimitsAction(){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")}
  };
  let url = Const.FETCH_URL.BILLING+"/billing/limits?page_size=100&page_num=1";
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"获取限额信息");
        if(json.status==0){
          dispatch(receiveLimits(json.result.limits_list))
        }
      })
  })
}

function receiveRecharges(obj){
  return {
    type:Const.GET_RECHARGES,
    payload:obj
  }
}
export function clearRecharges(){
  return {
    type:Const.CLEAR_RECHARGES
  }
}
export function clearSwitchRecharges(){
  return {
    type:Const.CLEAR_SWITCH_RECHARGES
  }
}
export function fetchGetRechargesAction(data){
  let myInit = {
    method:"POST",
    headers:{token:cookie.load("_at")},
    body:JSON.stringify(data)
  };
  let url = Const.FETCH_URL.BILLING+"/billing/recharges";
  return (dispatch =>{
    // dispatch(receiveRecharges({create_time
    // :
    // "2017-05-23 13:34:44",
    // recharge_amount
    //   :
    //   1,
    // recharge_type
    //   :
    //   "weixin",
    // recharge_uuid
    //   :
    //   "20170523133428915028"
    // team_uuid
    //   :
    //   "d1045457-6631-4645-8f4a-a2d943353492"
    // user_name
    //   :
    //   "zhangsai"}))
    dispatch(isPay(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        dispatch(isPay(true));
        console.log(json,"获取充值信息");
        if(json.status==0){
          dispatch(receiveRecharges(json.result))
        }else{
          dispatch(receiveRecharges({}))
          dispatch(receiveNotification({message:"获取充值信息失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch (e => {
        dispatch(isPay(true));
        dispatch(receiveRecharges({}));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

function receiveSwitchRecharges(obj){
  return {
    type:Const.GET_SWITCH_RECHARGES,
    payload:obj
  }
}
function isPay(flag){
  return {
    type:Const.IS_BTN_STATE.pay,
    payload:flag
  }
}
export function fetchSwitchRechargesAction(data){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")},
  };
  let url = Const.FETCH_URL.BILLING+"/billing/recharges/"+data.recharge_uuid;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"轮询查询支付结果");
        if(json.status==0&&json.result!=0){
          dispatch(receiveSwitchRecharges(json.result));
          data.my.setState({
            show:false
          });
          dispatch(fetchGetBalanceAction());
          dispatch(receiveNotification({message:"支付成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveSwitchRecharges({}));
        }
      })
      .catch (e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

