
import {GET_REPO_LIST,FETCH_URL,
  GET_GITHUB_AUTH_URL,
  GET_BUILDING_IMAGE_LIST,
  IS_BTN_STATE,
  REFRESH_LIST
} from '../constants'
import * as Const from "../constants";
import {isLoadingAction} from './header'
import fetch from 'isomorphic-fetch'
import {navigate} from './route';
import {receiveNotification,clearNotification} from './notification';
import {fetchImageListAction} from './imageList';
import cookie from 'react-cookie'

function receiveRepoListAction (data){
  return {
    type : GET_REPO_LIST,
    payload : data
  }
}

function isBuilding(state){
  return {
    type:IS_BTN_STATE.building,
    payload:state
  }
}
function isDeleteing(state){
  return {
    type:IS_BTN_STATE.deleteIng,
    payload:state
  }
}

function isSetCodeing(state){
  return {
    type:IS_BTN_STATE.code,
    payload:state
  }
}

function receiveAuthURLAction(type,url){
  let action_type =null;
  switch (type){
    case "github":
      action_type = Const.GET_GITHUB_AUTH_URL;
      break;
    case "coding":
      action_type = Const.GET_CODING_AUTH_URL;
      break;
    default:
      action_type = Const.GET_GITHUB_AUTH_URL;
  }
  return {
    type: action_type,
    payload: url
  }
}

function receiveBuildingImageListAction (data){
  return {
    type : GET_BUILDING_IMAGE_LIST,
    payload : data
  }
}

export function fetchGetAuthURLLAction(data){
  let body = JSON.stringify(data);
  let url = Const.FETCH_URL.IMAGE_AUTH+"/oauthclient/url";
  let myInit = {
    method:'POST',
    headers:{token: cookie.load("_at")},
    body:body
  };
  console.log(body,"授权链接参数");
  return (dispatch) => {
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,"获取授权链接");
        if (json.status == 0){
          switch (data.src_type){
            case "github":
              dispatch(receiveAuthURLAction("github",json.result));
              break;
            case "coding":
              dispatch(receiveAuthURLAction("coding",json.result));
          }
        }else {
          console.error('fetchGithubAuthURLAction error: ',json)
        }
        dispatch(isLoadingAction(false));
      })
      .catch(e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error('fetchGithubAuthURLAction error:',e)
      })
  }
}

export function fetchRepoListAction (data,refresh){
  let method = refresh?"PUT":"GET";
  let myInit = {
    method: method,
    headers:{
      token: cookie.load("_at")
    }
  };
  let url = FETCH_URL.IMAGE_AUTH+"/oauthclient/repos/"+data.src_type;
  return (dispatch) => {
    dispatch(isLoadingAction(true));
    dispatch(isSetCodeing(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,"项目列表,git");
        dispatch(isSetCodeing(true));
        if (json.status == 0){
          dispatch(receiveRepoListAction(json.result))
        }else {
          console.error('fetch repos error: ',json)
        }
        dispatch(isLoadingAction(false))
      })
      .catch(e => {
        dispatch(isSetCodeing(true));
        console.error('fetch reopos error:',e);
        dispatch(isLoadingAction(false))
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
      })

  }
}

export function refreshBuildingList(){
  return {
    type: REFRESH_LIST,
  }
}

function receiveBuildingDetail(data){
  return{
    type:Const.GET_BUILDING_DETAIL,
    payload:data
  }
}

function receiveBuildProjectsDetail(data){
  return{
    type:Const.GET_BUILD_PROJECTS_DETAIL,
    payload:data
  }
}

//NEW
function receiveBuildHistory(data){
  return{
    type:Const.GET_BUILD_HISTORY,
    payload:data
  }
}
function receiveBuildBranchHistory(data){
  return{
    type:Const.GET_BUILD_BRANCH_HISTORY,
    payload:data
  }
}
function receiveGetBuildBranch(arr){
  return {
    type:Const.GET_BUILD_BRANCH,
    payload:arr
  }
}
export function receiveBuildBranch(data){
  return{
    type:Const.RECEIVE_BUILD_BRANCH,
    payload:data
  }
}
export function receiveClearBuildBranchHistory(data){
  return {
    type:Const.RECEIVE_CLEAR_BUILD_BRANCH_HISTORY,
    payload:data
  }
}
export function fetchBuildProjectsAction(data,page,my){
  let body = JSON.stringify(data);
  console.log(body,page,">>>>>>>>创建构建项目  参数")
  let myInit = {
    method:"POST",
    headers:{token:cookie.load("_at")},
    body:body
  };
  let url = Const.FETCH_URL.AUTO_BUILD+"/projects";
  return(dispatch)=>{
    dispatch(isLoadingAction(true));
    dispatch(isBuilding(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,">>>>>>>>>创建构建项目");
        if(json.status==0){
          dispatch(fetchBuildProjectsListAction(page));
          dispatch(receiveNotification({message:"添加成功",level:"success"}));
          my.setState({
            show:false
          });
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }else{
          dispatch(receiveNotification({message:"添加失败:"+json.err,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }
        dispatch(isLoadingAction(false));
        dispatch(isBuilding(true));
      })
      .catch (e => {
        my.setState({
          show:false
        });
        dispatch(isLoadingAction(false));
        dispatch(isBuilding(true));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error("创建构建项目 error" ,e);
      })
  }
}
export function fetchBuildProjectsListAction(data){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")}
  };
  let url = Const.FETCH_URL.AUTO_BUILD+"/projects?current_page="+data.current_page+"&page_num="+data.page_num;
  return(dispatch)=>{
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch(isLoadingAction(false));
        if(json.status==0){
          dispatch(receiveBuildingImageListAction(json.result))
        }else{
          dispatch(receiveNotification({message:"获取失败:"+json.err,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
          dispatch(receiveBuildingImageListAction([]));
          console.error("buildingImageList error",json);
        }
      })
      .catch (e => {
        dispatch(receiveBuildingImageListAction([]));
        dispatch(isLoadingAction(true));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error("buildingImageList error" ,e);
      })
  }
}
export function fetchOnBuildingAction(data,page){
  let body = JSON.stringify(data);
  console.log(body,">>>>>>>>自动构建  参数");
  let myInit = {
    method:"POST",
    headers:{token:cookie.load("_at")},
    body:body
  };
  let url = Const.FETCH_URL.AUTO_BUILD+"/builds";
  return(dispatch)=>{
    dispatch(isLoadingAction(true));
    dispatch(isBuilding(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json,">>>>>>>>>自动构建");
        if(json.status==0){
          dispatch(fetchBuildProjectsListAction(page));
          dispatch(receiveNotification({message:"构建进行中",level:"warning"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }else{
          dispatch(receiveNotification({message:"构建失败:"+json.err,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
        }
        dispatch(isBuilding(true));
        dispatch(isLoadingAction(false));
      })
      .catch (e => {
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error("自动构建" ,e);
      })
  }
}
export function fetchBuildProjectsDetail(id) {
  let myInit = {
    method:"GET",
    headers:{
      token:cookie.load("_at"),
    }
  };
  let url = Const.FETCH_URL.AUTO_BUILD+"/project/"+id;
  return(dispatch) =>{
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json=>{
        dispatch(isLoadingAction(false));
        console.log(json,">>>>>构建项目详情");
        if(json.status == 0){
          dispatch(receiveBuildProjectsDetail(json.result));
        }else{
          dispatch(receiveBuildProjectsDetail({}));
          dispatch(receiveNotification({message:"获取构建详情失败:"+json.err,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
          console.error("构建项目详情失败",json)
        }
      })
      .catch(e =>{
        dispatch(isLoadingAction(false));
        dispatch(receiveBuildProjectsDetail({}));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error("构建项目详情失败",e)
      })
    }
}
export function receiveClearBuildProjectsDetail(){
  return {
    type:Const.CLEAR_BUILD_PROJECT_DETAIL,
    payload:{}
  }
}
export function receiveClearBuildingDetail() {
  return {
    type:Const.CLEAR_BUILD_DETAIL,
    payload:{}
  }
}
export function fetchBuildDetail(id) {
  let myInit = {
    method:"GET",
    headers:{
      token:cookie.load("_at"),
    }
  };
  let url = Const.FETCH_URL.AUTO_BUILD+"/builds/"+id;
  return(dispatch) =>{
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json=>{
        dispatch(isLoadingAction(false));
        console.log(json,">>>>>构建详情");
        if(json.status == 0){
          dispatch(receiveBuildingDetail(json.result));
        }else{
          dispatch(receiveNotification({message:"构建详情失败:"+json.err,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
          dispatch(receiveBuildingDetail(json.result));
          console.error("构建详情失败",json)
        }
      })
      .catch(e =>{
        dispatch(isLoadingAction(false));
        dispatch(receiveBuildingDetail({}));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error("构建详情失败",e)
      })
  }
}
export function receiveClearBuildBranch() {
  return{
    type:Const.CLEAR_BUILD_BRANCH,
    payload:[]
  }
}
export function fetchBuildHistoryAction(data){
  let myInit = {
    method:"GET",
    headers:{
      token:cookie.load("_at"),
    }
  };
  console.log(data,"构建历史参数")
  let url = Const.FETCH_URL.AUTO_BUILD+"/builds/repo/"+data.source+"/"+data.username+"/"
    +data.repo+"?current_page="+data.current_page+"&page_num="+data.page_num;
  return(dispatch) =>{
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json=>{
        dispatch(isLoadingAction(false));
        console.log(json,">>>>>   构建历史");
        if(json.status == 0){
          dispatch(receiveBuildHistory(json.result));
        }else{
          dispatch(receiveNotification({message:"构建历史失败:"+json.err,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
          console.error("构建历史失败",json)
        }
      })
      .catch(e =>{
        dispatch(isLoadingAction(false));
        dispatch(receiveBuildHistory([]));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error("构建历史失败",e);
      })
  }
}
export function fetchBuildBranchHistoryAction(data){
  let myInit = {
    method:"GET",
    headers:{
      token:cookie.load("_at"),
    }
  };
  console.log(data,"分支历史参数");
  let url = Const.FETCH_URL.AUTO_BUILD+"/builds/repo/"+data.source+"/"+data.username+"/"
    +data.repo+"/"+data.branch+"?current_page="+data.current_page+"&page_num="+data.page_num;
  return(dispatch) =>{
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json=>{
        dispatch(isLoadingAction(false));
        console.log(">>>>>   分支历史 ",data.branch,json.result);
        if(json.status == 0){
          json.result.sort(function(a,b){
            let t1 = a.completed_at;
            let t2 = b.completed_at;
            if (t1 > t2) return -1;
            if (t1 == t2) return 0;
            if (t1 < t2) return 1;
          });
          dispatch(receiveBuildBranchHistory({name:data.branch,historyData:json.result}));
        }else{
          dispatch(receiveNotification({message:"分支历史失败:"+json.err,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },5000);
          console.error("分支历史",json)
        }
      })
      .catch(e =>{
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        dispatch(isLoadingAction(false));
        console.error("分支历史",e);
      })
  }
}
export function fetchDeleteProjectAction(data){
  let myInit = {
    method:"DELETE",
    headers:{
      token:cookie.load("_at"),
    }
  };
  let url = Const.FETCH_URL.AUTO_BUILD+"/project/"+data.id;
  return(dispatch)=>{
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log("删除project返回值",json);
        dispatch(isLoadingAction(false));
        dispatch(receiveProjectDelete(false));
        if(json.status==0){
          dispatch(fetchBuildProjectsListAction(data.page));
          dispatch(receiveNotification({message:"删除成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }else{
          dispatch(receiveNotification({message:"删除失败:"+json.err,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
        }
      })
      .catch(e =>{
        dispatch(isLoadingAction(false));
        dispatch(receiveProjectDelete(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error("删除失败",e)
      })
  }
}
export function setCreateBuildDataAction(data){
  return {
    type:Const.CREATE_BUILD_DATA,
    payload:data
  }
}
export function fetchGetBuildBranchAction(id){
  let myInit = {
    method:"GET",
    headers:{
      token:cookie.load("_at"),
    }
  };
  let url = Const.FETCH_URL.AUTO_BUILD+"/project/"+id+"/branches";
  return(dispatch) =>{
    dispatch(isLoadingAction(true));
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json=>{
        dispatch(isLoadingAction(false));
        console.log(json,">>>>>   分支列表");
        if(json.status == 0){
          dispatch(receiveGetBuildBranch(json.result));
        }else{
          dispatch(receiveNotification({message:"分支列表失败:"+json.err,level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification())
          },3000);
          console.error("分支列表",json)
        }
      })
      .catch(e =>{
        dispatch(isLoadingAction(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },5000);
        console.error("分支列表",e);
      })
  }
}
export function addOtherHistory(data){
  return{
    type:Const.ADD_HISTORY,
    payload:data
  }
}
export function delOtherHistory(id){
  return{
    type:Const.DEL_HISTORY,
    payload:id
  }
}
export function receiveProjectDelete(flag){
  return{
    type:Const.MODAL_STATE.MODAL_PROJECT_DELETE,
    payload:flag
  }
}
