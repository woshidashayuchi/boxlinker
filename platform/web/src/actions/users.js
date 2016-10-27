
import {
  FETCH_URL,
  RECEIVE_USER_INFO,
} from "../constants"
import * as Const from '../constants';

import fetch from 'isomorphic-fetch';
import {receiveNotification,clearNotification} from './notification';
import { navigate } from './route';

export function receiveUserInfo(data){
  return {
    type: RECEIVE_USER_INFO,
    payload: data
  }
}

export function fetchUserInfo(token,development = false){
  return (dispatch) => {
    let url = `${development?FETCH_URL.USER_INFO:FETCH_URL.USER_INFO_INTERNAL}`;
    console.log(`fetch user: ${url}`);
    return fetch(url,{
      method:'GET',
      headers:{
        token: token
      }
    }).then(response => response.json())
      .then(json => {
        if (json.status == 0){
          dispatch(receiveUserInfo(json.result))
        }else {
          console.error('fetch user info error',json)
        }
      })
      .catch(e => {
        console.error('fetch user info failed ',e)
      })
  }
}

export function fetchRevisePasswordAction(passwordObj) {
  let myInit = {
    method:"POST",
    headers:{token:localStorage.getItem("_at")},
    body:JSON.stringify(passwordObj)
  };
  return (dispatch) =>{
    return fetch(FETCH_URL.REVISE_PASSWORD,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,">>>>>修改密码");
        if(json.status == 0){
          dispatch(receiveNotification({message:"修改成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification());
            location.href = '/login';
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

export function fetchCreateOrganize(org_name){
  console.log(org_name);
  let body = JSON.stringify({org_name:org_name});
  let myInit = {
    method:"POST",
    headers:{token:localStorage.getItem("_at")},
    body:body
  };
  let url = Const.FETCH_URL.ORGANIZE;
  return (dispatch =>{
    return fetch(url,myInit)
        .then(response => response.json())
        .then(json =>{
          console.log(json,"新建组织返回值");
          if(json.status == 0){
            dispatch(receiveNotification({message:"创建成功",level:"success"}));
            setTimeout(function(){
              dispatch(clearNotification());
            },3000);
          }else{
            dispatch(receiveNotification({message:"创建失败:"+json.msg,level:"danger"}));
            setTimeout(function(){
              dispatch(clearNotification());
            },3000);
          }
        })
  })
}

function receiveOrganizeList(data){
  return {
    type:Const.GET_ORGANIZE_LIST,
    payload:data

  }
}

export function fetchGetOrganizeListAction(){
  let myInit = {
    method:"GET",
    headers:{token:localStorage.getItem("_at")},
  };
  let url = Const.FETCH_URL.ORGANIZE;
  return (dispatch =>{
    return fetch(url,myInit)
        .then(response => response.json())
        .then(json =>{
          console.log(json,"组织列表");
          if(json.status == 0){
            dispatch(receiveOrganizeList(json.result));
          }else{
            dispatch(receiveNotification({message:"获取组织列表失败:"+json.msg,level:"danger"}));
            setTimeout(function(){
              dispatch(clearNotification());
            },3000);
          }
        })
  })
}
