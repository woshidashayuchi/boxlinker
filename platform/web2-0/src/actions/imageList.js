import {
  GET_IMAGE_LIST,
  FETCH_URL
} from '../constants';
import * as Const from '../constants';
import fetch from 'isomorphic-fetch';
import {isLoadingAction} from './header';
import cookie from 'react-cookie'
import {navigate} from './route';
import {receiveNotification,clearNotification} from './notification';

export function receiveImageList(data){
  return {
    type: GET_IMAGE_LIST,
    payload: data
  }
}
export function receivePlatformImageList(data){
  return {
    type: Const.GET_PLATFORM_IMAGE_LIST,
    payload: data
  }
}
export function receiveImageRecommendList(data){
  return {
    type:Const.GET_IMAGE_RECOMMEND_LIST,
    payload:data
  }
}

export function fetchImageListAction(data){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")},
  };
  let url = data.repo_fuzzy?Const.FETCH_URL.IMAGE_AUTH+"/imagerepo/ownimages/"+data.page+"/"+data.page_size+"?repo_fuzzy="+data.repo_fuzzy:
  Const.FETCH_URL.IMAGE_AUTH+"/imagerepo/ownimages/"+data.page+"/"+data.page_size;
  return dispatch =>{
    dispatch(isLoadingAction(true));
    dispatch(receiveImageList({count:-1}));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log('>>>>>images list',json);
        if(json.status==0){
          dispatch(receiveImageList(json.result));
        }else{
          dispatch(receiveNotification({message:Const.returnMsg(json.status),level:"danger"}));
          dispatch(receiveImageList({result:[]}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          console.error("images list error",json);
        }
        dispatch(isLoadingAction(false));
      })
      .catch (e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        dispatch(receiveImageList({result:[]}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error("images list error" ,e);
      })
  }
}

export function fetchImageRecommendList(){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")},
  };
  let url = Const.FETCH_URL.IMAGE_AUTH+"/imagerepo/ranks";
  return dispatch =>{
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log('>>>>>images recommend list',json);
        if(json.status==0){
          dispatch(receiveImageRecommendList(json.result));
        }else{
          dispatch(receiveNotification({message:Const.returnMsg(json.status),level:"danger"}));
          dispatch(receiveImageRecommendList({count:0}));
          setTimeout(function(){
            dispatch(clearNotification())
          },1000);
          console.error("images recommend list error",json);
        }
        dispatch(isLoadingAction(false));
      })
      .catch (e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        dispatch(receiveImageRecommendList({count:0}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        console.error("images recommend list error" ,e);
      })
  }
}

export function fetchPlatformList(data){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")},
  };
  let url = data.repo_fuzzy?Const.FETCH_URL.IMAGE_AUTH+"/imagerepo/publicimages/"+data.page+"/"+data.page_size+"?repo_fuzzy="+data.repo_fuzzy:
                Const.FETCH_URL.IMAGE_AUTH+"/imagerepo/publicimages/"+data.page+"/"+data.page_size;
  return dispatch =>{
    dispatch(isLoadingAction(true));
    dispatch(receivePlatformImageList({count:-1}));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        dispatch(isLoadingAction(false));
        console.log('>>>>>platformImageList',json);
        if(json.status==0){
          dispatch(receivePlatformImageList(json.result));
        }else{
          dispatch(receiveNotification({message:Const.returnMsg(json.status),level:"danger"}));
          dispatch(receivePlatformImageList({result:[]}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          console.error("platformImageList",json);
        }
      })
      .catch (e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        dispatch(receivePlatformImageList({result:[]}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
        dispatch(isLoadingAction(false));
        console.error("platformImageList error" ,e);
      })
  }
}

export function fetchDeleteImageAction(data){
  let myInit = {
    method:"DELETE",
    headers:{
      token:cookie.load("_at"),
    }
  };
  let url = FETCH_URL.IMAGE_AUTH+"/imagerepo/image/"+data.id;
  return(dispatch)=>{
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log("删除镜像返回值",json);
        dispatch(isLoadingAction(false));
        dispatch(receiveImageDelete(false));
        if(json.status==0){
          switch (data.key){
            case "imageList" :
              dispatch(fetchImageListAction(data.page));
              break;
            case "detail":
              dispatch(navigate("/myImage"));
              break;
          }
          dispatch(receiveNotification({message:"删除成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }else{
          dispatch(receiveNotification({message:"删除失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          console.error("del image error",json);
        }
      })
      .catch (e => {
        dispatch(receiveImageDelete(false));
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  }
}


export function receiveImageDelete(flag){
  return{
    type:Const.MODAL_STATE.MODAL_IMAGE_DELETE,
    payload:flag
  }
}
export function clearPlatformImageList() {
  return{
    type:Const.CLEAR_PLATFORM_IMAGE_LIST
  }

}
