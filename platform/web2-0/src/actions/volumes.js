
import * as Const from "../constants";
import fetch from 'isomorphic-fetch'
import {isLoadingAction} from './header'
import {receiveNotification,clearNotification} from './notification';
import {fetchServiceDetailAction} from './serviceDetail';
import cookie from 'react-cookie'

export function receiveVolumes(volumes) {
  return {
    type: Const.RECEIVE_VOLUMES_LIST,
    payload: volumes
  }
}

export function refreshVolumeList(){
  return {
    type:Const.REFRESH_LIST
  }
}

export function isCreateVolume(state){
  return {
    type:Const.IS_BTN_STATE.createVolume,
    payload:state
  }
}

export function createVolume(data,my,pageData){
  console.log(data,">>>>>>");
  let myInit = {
    method :"POST",
    headers:{token:cookie.load("_at")},
    body:JSON.stringify(data)
  };
  let url = Const.FETCH_URL.VOLUMES;
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(isCreateVolume(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.status == 0){
          dispatch(receiveNotification({message:"创建成功",level:"success"}));
          my.setState({
            show:false
          });
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
          dispatch(fetchVolumesListAction(pageData))
        } else {
          dispatch(receiveNotification({message:"创建失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          console.error('create volume error: ', json)
        }
        dispatch(isLoadingAction(false));
        dispatch(isCreateVolume(true));
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

export function scaleVolume(data,my,pageData){
  let myInit = {
    method: 'PUT',
    headers:{
      token: cookie.load('_at')
    },
    body: JSON.stringify({volume_size:data.volume_size})
  };
  let  url = Const.FETCH_URL.VOLUMES+"/"+data.volume_uuid+"?update=size";
  return dispatch => {
    dispatch(isLoadingAction(true));
    dispatch(isCreateVolume(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        if ( json.status == 0 ){
          dispatch(receiveNotification({message:"扩容成功",level:"success"}));
          my.setState({
            show:false
          });
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
          dispatch(fetchVolumesListAction(pageData))
        }else {
          dispatch(receiveNotification({message:"扩容失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          console.error(`scale volume failed!`,json)
        }
        dispatch(isLoadingAction(false));
        dispatch(isCreateVolume(true));
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error(`scale volume  error!`,e)
      })
  }
}

export function deleteVolume(volumeId,pageData){
  let myInit = {
    method: 'DELETE',
    headers: {
      token: cookie.load('_at')
    }
  };
  let url = Const.FETCH_URL.VOLUMES+"/"+volumeId;
  return dispatch => {
    dispatch(isLoadingAction(true));
    return fetch(url,myInit
    )
      .then(response => response.json())
      .then(json => {
        console.log(json)
        dispatch(isLoadingAction(false));
        dispatch(receivevolumeDelete(false));
        if ( json.status == 0 ){
          dispatch(receiveNotification({message:"删除成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
          dispatch(fetchVolumesListAction(pageData))
        }else {
          dispatch(receiveNotification({message:"删除失败:"+json.msg,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
        }
      })
      .catch(e =>{
        dispatch(receivevolumeDelete(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error("删除失败",e)
      })
  }
}

export function fetchVolumesListAction(data){
  let url = Const.FETCH_URL.VOLUMES+"?page_size="+data.page_size+"&page_num="+data.page_num;
  return dispatch => {
    dispatch(isLoadingAction(true));
    return fetch(url,{
      headers:{
        token:cookie.load("_at")
      }
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json,"获取数据卷列表")
        if (json.status == 0) {
          dispatch(receiveVolumes(json.result));
        } else {
          dispatch(receiveNotification({message:"获取列表失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          dispatch(receiveVolumes({count:0}));
          console.error('get all volumes failed:',json);
        }
        dispatch(isLoadingAction(false));
      })
      .catch((e)=>{
        dispatch(isLoadingAction(false));
        dispatch(receiveVolumes({count:0}));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error('get all volumes error:',e);
      })
  }
}

export function receivevolumeDelete(flag){
  return{
    type:Const.MODAL_STATE.MODAL_VOLUME_DELETE,
    payload:flag
  }
}
