
import {isLoadingAction} from './header';
import fetch from 'isomorphic-fetch';
import {receiveNotification,clearNotification} from './notification';
import {fetchServiceDetailAction} from './serviceDetail';
import {navigate} from "./route";
import cookie from 'react-cookie';
import * as Const from '../constants';

function receiveServiceRecovery(data){
  return {
    type: Const.GET_ALL_SERVICE_RECOVERY,
    payload: data
  }
}

export function fetchAllServicesAction(pageData){
  let url = Const.FETCH_URL.SERVICE_RECOVERY+"/application/services?page_size="+pageData.page_size+"&page_num="+pageData.page_num;
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")},
  };
  return (dispatch) => {
    dispatch(isLoadingAction(true));
    return fetch(url , myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,"服务回收列表");
        if (json.status == 0) {
          console.log(json.result,'[[[[[>>>>>>>>>>>')
          dispatch(receiveServiceRecovery(json.result));
        } else {
          dispatch(receiveNotification({message:"获取回收列表失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          dispatch(receiveServiceRecovery({count:0}))
        }
        dispatch(isLoadingAction(false));
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveServiceRecovery({count:0}));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error('get all serviceRecovery error',e)
      })
  }
}

export function deleteServiceRecoveryAction(data,pageData){
  let url =Const.FETCH_URL.SERVICE_RECOVERY_DELETE+"/application/services",
     myInit = {
      method:"DELETE",
      headers:{token:cookie.load("_at")},
      body:JSON.stringify({service_uuid:data.service_uuid}),
    };
  return dispatch => {
    dispatch(isLoadingAction(true));
    console.log(myInit,'jjj<<<<<<<<<<')
    return fetch (url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch(receiveServiceDelete(false));
        if(json.status == 0){
          dispatch(receiveNotification({message:"删除成功",level:"success"}));
          dispatch(fetchAllServicesAction(pageData));
          setTimeout(function(){
            dispatch(clearNotification())
          },1500);
        }else{
          dispatch(receiveNotification({message:"删除失败:"+Const.returnMsg(json.status),level:"danger"}));
          dispatch(navigate("/serviceRecovery"));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          console.error(json);
        }
        dispatch(isLoadingAction(false));
      })
      .catch(e => {
        dispatch(receiveServiceDelete(false));
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error('delete serviceRecovery error',e)
      })
  }
}

export function reductionStateAction(data,pageData){
  let url =Const.FETCH_URL.SERVICE_REDUCTION+"/application/services",
    myInit = {
      method:"POST",
      headers:{token:cookie.load("_at")},
      body:JSON.stringify({service_uuid:data.serviceUuid})
    };
  return dispatch => {
    console.log(myInit,'llll>>>><<<<<<?????')
    dispatch(isLoadingAction(true));
    return fetch (url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,"");
        if(json.status == 0){
          dispatch(receiveNotification({message:"还原成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          dispatch(fetchAllServicesAction(pageData));
          console.log(data.serviceUuid,">>>>")
        }else{
          dispatch(receiveNotification({message:"还原失败:"+Const.returnMsg(json.status),level:"danger"}));
          dispatch(navigate("/serviceRecovery"));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
          console.error(json);
        }
        dispatch(isLoadingAction(false));
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error('change serviceRcovery state error',e)
      })
  }
}

export function refreshServiceList(){
  return {
    type: Const.REFRESH_LIST,
  }
}

export function receiveServiceDelete(flag){
  return{
    type:Const.MODAL_STATE.MODAL_SERVICE_DELETE,
    payload:flag
  }
}
