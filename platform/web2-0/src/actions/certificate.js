import * as Const from "../constants";
import fetch from 'isomorphic-fetch'
import {isLoadingAction} from './header'
import {receiveNotification,clearNotification} from './notification';
import {fetchServiceDetailAction} from './serviceDetail';
import cookie from 'react-cookie'

export function receiveCertificate(volumes) {
  return {
    type: Const.CERTIFICATE_LIST,
    payload: volumes
  }
}

export function isCreateVolume(state){
  return {
    type:Const.IS_BTN_STATE.createVolume,
    payload:state
  }
}

export function createCertificate(data){
  let myInit = {
    method :"POST",
    headers:{token:cookie.load("_at")},
    body:data
  };
  let url = Const.CERTIFICATE_HOST;
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(isCreateVolume(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.status == 0){
          dispatch(receiveNotification({message:"创建成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
          dispatch(getCertificateCon())
        } else {
          dispatch(receiveNotification({message:"创建失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          console.error('create certificate error: ', json)
        }
        dispatch(isCreateVolume(true));
        dispatch(isLoadingAction(false));
      })
      .catch(e =>{
        dispatch(isCreateVolume(true));
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error("创建失败",e)
      })
  }
}


export function upCertificate(data,id){
  let myInit = {
    method :"PUT",
    headers:{token:cookie.load("_at")},
    body:data
  };
  let url = Const.CERTIFICATE_HOST+"/"+id;
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(isCreateVolume(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.status == 0){
          dispatch(receiveNotification({message:"更新成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
          dispatch(getCertificateCon())
        } else {
          dispatch(receiveNotification({message:"更新失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          console.error('create certificate error: ', json)
        }
        dispatch(isCreateVolume(true));
        dispatch(isLoadingAction(false));
      })
      .catch(e =>{
        dispatch(isLoadingAction(false));
        dispatch(isCreateVolume(true));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error("更新失败")
      })
  }
}

export function getCertificateCon(){
  let myInit = {
    method: 'GET',
    headers: {
      token: cookie.load('_at')
    }
  };
  let url = Const.CERTIFICATE_CON;
  return dispatch => {
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json,"获取证书")
        if (json.status == 0) {
          dispatch(receiveCertificate(json.result));
        } else {
          dispatch(receiveNotification({message:"获取证书失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          dispatch(receiveCertificate(json.result));
          console.error('get all certificate failed:',json);
        }
        dispatch(isLoadingAction(false));
      })
      .catch((e)=>{
        dispatch(isLoadingAction(false));
        dispatch(receiveCertificate());
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error('get all certificate error:',e);
      })
  }
}

