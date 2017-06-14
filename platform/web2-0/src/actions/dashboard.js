import fetch from "isomorphic-fetch";
import {receiveNotification,clearNotification} from "./notification";
import * as Const from "../constants";
import cookie from 'react-cookie'

function receiveDashboard(data){
  return{
    type:Const.GET_DASHBOARD,
    payload:data
  }
}

export function fetchGetDashboardAction(){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")}
  };
  let url = Const.FETCH_URL.MONITOR+"/monitors/broads";
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"资源使用情况");
        if(json.status == 0){
          dispatch(receiveDashboard(json.result));
        }else{
          dispatch(receiveNotification({message:"获取资源信息失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch(e =>{
        dispatch(receiveDashboard({}));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error("获取资源信息失败",e)
      })
  })
}
