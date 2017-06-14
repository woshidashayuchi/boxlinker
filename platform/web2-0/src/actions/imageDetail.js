import * as Const from '../constants'

import fetch from 'isomorphic-fetch';
import {isLoadingAction} from './header';
import {receiveNotification,clearNotification} from './notification';
import cookie from 'react-cookie'

function receiveImageDetail (data){
  return {
    type : Const.GET_IMAGE_DETAIL,
    payload : data
  }
}

export function fetchImageDetailAction(id){
  let myInit = {
      method : "GET",
      headers:{token:cookie.load("_at")},
    },
    url = Const.FETCH_URL.IMAGE_AUTH+"/imagerepo/image/"+id;
  return dispatch => {
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if(json.status == 0){
          dispatch(receiveImageDetail(json.result));
        }else{
          dispatch(receiveImageDetail({}));
          dispatch(receiveNotification({message:Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }
        dispatch(isLoadingAction(false));
      })
      .catch (e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  }
}

export function fetchSetImageDetailAction(data,fn){
  let body = JSON.stringify({detail:data.detail});
  let myInit = {
      method : "PUT",
      headers:{token:cookie.load("_at")},
      body:body
    },
    url = Const.FETCH_URL.IMAGE_AUTH+"/imagerepo/image/"+data.id+"/detail/"+data.type;
  return dispatch => {
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,"修改镜像");
        dispatch(isLoadingAction(false));
        if(json.status == 0){
          dispatch(fetchImageDetailAction(data.id));
          dispatch(receiveNotification({message:"修改成功",level:"success"}));
          if(fn){
            fn.setState({
              show:false
            });
          }
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }else{
          dispatch(receiveNotification({message:"修改失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          console.error(json);
        }
      })
      .catch (e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  }
}

export function receiveClearImageDetail(){
  return{
    type:Const.CLEAR_IMAGE_DETAIL,
    payload:{}
  }
}

function receiveServiceForImage(obj){
  return{
    type:Const.GET_SERVICE_IMAGE,
    payload:obj
  }
}
export function fetchServiceForImageAction(id){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")}
  };
  let url = Const.FETCH_URL.IMAGE_AUTH+"/imagerepo/image/tagid/"+id;
  return dispatch => {
    return fetch(url,myInit)
      .then(reseponse =>reseponse.json())
      .then(json=>{
        console.log(json,"获取服务相关的镜像");
        if(json.status == 0){
          let data = {
            image_uuid:json.result.image_uuid,
            image_name:json.result.image_name,
            image_tag:json.result.tag
          };
          dispatch(receiveServiceForImage(data))
        }
      })
  }
}
