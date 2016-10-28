import * as Const from '../constants';

import fetch from 'isomorphic-fetch';
import {receiveNotification,clearNotification} from './notification';
import cookie from 'react-cookie';
import {navigate} from './route';

export function fetchCreateOrganize(org_name){
  let body = JSON.stringify({orga_name:org_name});
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
            dispatch(fetchGetOrganizeListAction());
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

export function fetchLeaveOrganize(id){
  let myInit = {
    method:"PUT",
    headers:{token:localStorage.getItem("_at")}
  };
  let url = Const.FETCH_URL.ORGANIZE+"/"+id;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json);
        if(json.status == 0){
          dispatch(receiveNotification({message:"退出成功",level:"success"}));
          dispatch(fetchGetOrganizeListAction());
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveNotification({message:"退出失败:"+json.msg,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
  })
}

export function fetchDeleteOrganize(id){
  let myInit = {
    method:"DELETE",
    headers:{token:localStorage.getItem("_at")}
  };
  let url = Const.FETCH_URL.ORGANIZE+"/"+id;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json);
        if(json.status == 0){
          dispatch(receiveNotification({message:"解散成功",level:"success"}));
          dispatch(fetchGetOrganizeListAction());
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveNotification({message:"解散失败:"+json.msg,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
  })
}

function receiveOrganizeDetail(data){
  return{
    type:Const.GET_ORGANIZE_DETAIL,
    payload:data
  }
}

export function fetchGetOrganizeDetailAction(id){
  let myInit = {
    method:"GET",
    headers:{token:localStorage.getItem("_at")}
  };
  let url = Const.FETCH_URL.ORGANIZE+"/"+id;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json);
        if(json.status == 0){
          dispatch(receiveOrganizeDetail(json.result));
        }else{
          dispatch(receiveNotification({message:"获取组织详情失败:"+json.msg,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
  })
}

export function fetchSetOrganizeDetailAction(data){
  let body = JSON.stringify({
    orga_detail:data.orga_detail,
    is_public:data.is_public
  });
  console.log(body,"修改组织参数");
  let myInit = {
    method:"PUT",
    headers:{token:localStorage.getItem("_at")},
    body:body
  };
  let url = Const.FETCH_URL.ORGANIZE+"/"+data.id;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json);
        if(json.status == 0){
          dispatch(receiveNotification({message:"修改成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveNotification({message:"修改失败:"+json.msg,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
  })
}

function receiveOrganizeUserList(data){
  return{
    type:Const.GET_ORGANIZE_USER_LIST,
    payload:data
  }
}
export function fetchGetOrganizeUserListAction(id){
  let myInit = {
    method:"GET",
    headers:{token:localStorage.getItem("_at")},
  };
  let url = Const.FETCH_URL.ORGANIZE+"/"+id+"/users";
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"组织用户列表");
        if(json.status == 0){
          dispatch(receiveOrganizeUserList(json.result));
        }else{
          dispatch(receiveNotification({message:"获取组织用户列表失败:"+json.msg,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
  })
}

export function fetchChangeAccountAction(id){
  let body = JSON.stringify({
    orga_uuid:id
  });
  console.log(body);
  let myInit = {
    method:"PUT",
    headers:{token:localStorage.getItem("_at")},
    body:body
  };
  let url = Const.FETCH_URL.TOKEN;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"切换组织");
        if(json.status == 0){
          var exp = new Date();
          exp.setTime(exp.getTime()+1000*60*60*24*7);
          cookie.save('_at',json.result.token,{path:'/',expires: exp});
          localStorage.setItem("_at",json.result.token);
          console.log(json.result.token,1);
          console.log(cookie.load("_at"),2);
          location.href = '/';
        }else{
          dispatch(receiveNotification({message:"切换组织失败:"+json.msg,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
  })
}
