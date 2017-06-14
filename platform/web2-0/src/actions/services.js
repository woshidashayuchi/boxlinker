
import {isLoadingAction} from './header';
import fetch from 'isomorphic-fetch';
import {receiveNotification,clearNotification} from './notification';
import {fetchServiceDetailAction} from './serviceDetail';
import {navigate} from "./route";
import cookie from 'react-cookie';
import * as Const from '../constants';

function receiveServices(data){
  return {
    type: Const.GET_ALL_SERVICES,
    payload: data
  }
}

export function fetchAllServicesAction(pageData){
  let url =  pageData.searchVal ?
      Const.FETCH_URL.SERVICE+"/application/services?service_name="+pageData.searchVal+"&page_size="+pageData.page_size+"&page_num="+pageData.page_num
    :
      Const.FETCH_URL.SERVICE+"/application/services?page_size="+pageData.page_size+"&page_num="+pageData.page_num;
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")},
  };
  return (dispatch) => {
    dispatch(isLoadingAction(true));
    return fetch(url , myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,"服务列表");
        if (json.status == 0) {
          console.log(json.result,'klkklklklkl')
          dispatch(receiveServices(json.result));
        } else {
          dispatch(receiveNotification({message:"获取列表失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          dispatch(receiveServices({count:0}))
        }
        dispatch(isLoadingAction(false));
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveServices({count:0}));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error('get all service error',e)
      })
  }
}

export function fetchDeleteServiceAction(data,pageData){
  let url =Const.FETCH_URL.SERVICE+"/application/services/"+data.service_uuid,
      myInit = {
        method:"DELETE",
        headers:{token:cookie.load("_at")},
      };
  return dispatch => {
    dispatch(isLoadingAction(true));
    return fetch (url,myInit)
          .then(response => response.json())
          .then(json => {
            console.log(json);
            dispatch(receiveServiceDelete(false));
            if(json.status == 0){
              dispatch(receiveNotification({message:"删除成功",level:"success"}));
              if(data.type == "list"){
                dispatch(fetchAllServicesAction(pageData));
              }else{
                dispatch(navigate("/serviceList"));
              }
              setTimeout(function(){
                dispatch(clearNotification())
              },1500);
            }else{
              dispatch(receiveNotification({message:"删除失败:"+Const.returnMsg(json.status),level:"danger"}));
              if(data.type == "list"){
                dispatch(fetchAllServicesAction(pageData));
              }else{
                dispatch(navigate("/serviceList"));
              }
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
            console.error('delete service error',e)
          })
  }
}

export function fetchChangeStateAction(data,type,pageData){
  let url =Const.FETCH_URL.SERVICE+"/application/services/"+data.serviceUuid+"?rtype=status",
    myInit = {
      method:"PUT",
      headers:{token:cookie.load("_at")},
      body:JSON.stringify({operate:data.state})
    };
  return dispatch => {
    dispatch(isLoadingAction(true));
    return fetch (url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,"");
        if(json.status == 0){
          dispatch(receiveNotification({message:"修改成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          if(type =="list"){
            dispatch(fetchAllServicesAction(pageData));
          }else{
            dispatch(fetchServiceDetailAction(data.serviceUuid));
          }
          console.log(data.serviceUuid,">>>>")
        }else{
          dispatch(receiveNotification({message:"修改失败:"+Const.returnMsg(json.status),level:"success"}));
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
        console.error('change service state error',e)
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

