import * as Const from "../constants";
import { navigate } from './route';
import {isLoadingAction} from "./header"
import fetch from 'isomorphic-fetch';
import {receiveNotification,clearNotification} from './notification';
import cookie from 'react-cookie'

export function deployImageNameAction(obj){
  return {
    type: Const.DEPLOY_SVC_IMAGE,
    payload: obj,
  }
}

export function goToConfigContainer(obj){
  return dispatch =>{
    dispatch(deployImageNameAction(obj));
    dispatch(navigate("/configure"));
  }
}


export function deployContainerAction(data) {
  return{
    type:Const.DEPLOY_SVC_CONTAINER,
    payload:data
  }
}

export function goToService(){
  return dispatch =>{
    dispatch(navigate(`/deployService`));
  }
}

export function deploySeniorAction(data){
  return{
    type:Const.DEPLOY_SVC_SENIOR,
    payload:data
  }
}

export function addPortAction(port) {
  return {
    type:Const.ADD_PORT,
    payload:port
  }
}
export function delPortAction(port){
  return{
    type:Const.DEL_PORT,
    payload:port
  }
}
export function addSaveAction() {
  return {
    type:Const.ADD_SAVE
  }
}
export function delSaveAction(item){
  return{
    type:Const.DEL_SAVE,
    payload:item
  }
}
export function delEnvAction(item){
  return {
    type: Const.DEL_ENV,
    payload: item
  }
}

export function addEnvAction() {
  return {
    type:Const.ADD_ENV
  }
}

export function isDeploy(state){
  return{
    type:Const.IS_BTN_STATE.deploy,
    payload:state
  }
}

export function clearDeployData(){
  return{
    type:Const.CLEAR_DEPLOY_DATA
  }
}

export function fetchDeployServiceAction(data){
  if(data.env[0].env_key == ""){
    data.env = "";
  }
  if(data.volume[0].volume_uuid == -1){
    data.volume = "";
  }
  delete data.image_name;
  let myInit = {
    method:"POST",
    headers:{token:cookie.load("_at")},
    body:JSON.stringify(data)
  };
  console.log(JSON.stringify(data))
  let url = Const.FETCH_URL.SERVICE+"/application/services";
  return dispatch =>{
    dispatch(isLoadingAction(true));
    dispatch(isDeploy(false));
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
          console.log(json,"部署服务");
          dispatch(isLoadingAction(false));
          dispatch(isDeploy(true));
          if(json.status==0){
            dispatch(clearDeployData());
            dispatch(navigate(`/serviceDetail/${json.result.resource_uuid}/3`));
          }else{
            dispatch(receiveNotification({message:"部署失败:"+Const.returnMsg(json.status),level:"danger"}));
            setTimeout(function(){
              dispatch(clearNotification())
            },5000);
            console.error("部署失败",json);
          }
        })
        .catch (e => {
          dispatch(isLoadingAction(false));
          dispatch(isDeploy(true));
          dispatch(receiveNotification({message:Const.error,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
          console.error("部署失败" ,e)
        })
  }
}
function receiveServiceName(flag){
  return{
    type:Const.REPEAT_NAME.SERVICE,
    payload:flag
  }
}
export function fetchRepeatServiceName(name){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")}
  };
  let url = Const.FETCH_URL.SERVICE+"/application/services/service_name/"+name+"?rtype=service";
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"服务名称是否重复");
        if(json.status == 0){
          dispatch(receiveServiceName(json.result==1));//等于1已重复 ,0可用
        }else{
          dispatch(receiveServiceName(false));
        }
      })
      .catch(e => {
        dispatch(receiveServiceName(false));
      })
  })
}
