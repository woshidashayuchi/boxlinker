import * as Const from '../constants';

import fetch from 'isomorphic-fetch';
import {receiveNotification,clearNotification} from './notification';
import cookie from 'react-cookie';
import {navigate} from './route';

function receiveOrganizeList(data){
  return {
    type:Const.GET_ORGANIZE_LIST,
    payload:data

  }
}

function receiveUserList(data){
  return{
    type:Const.GET_USER_LIST,
    payload:data
  }
}
function receiveOrganizeUserList(data){
  return{
    type:Const.GET_ORGANIZE_USER_LIST,
    payload:data
  }
}
function receiveOrganizeDetail(data){
  return{
    type:Const.GET_ORGANIZE_DETAIL,
    payload:data
  }
}
function setOrganizeLoading(state){
  return {
    type:Const.IS_BTN_STATE.setOrg,
    payload:state
  }
}

function isCreateOrg(flag){
  return {
    type:Const.IS_BTN_STATE.createOrg,
    payload:flag
  }
}

export function fetchCreateOrganize(data,my){
  let body = JSON.stringify({
    team_name:data.team_name,
    team_desc:data.team_desc
  });
  let myInit = {
    method:"POST",
    headers:{token:cookie.load("_at")},
    body:body
  };
  let url = Const.FETCH_URL.UCENTER+"/ucenter/teams";
  return (dispatch =>{
    dispatch(isCreateOrg(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"新建组织返回值");
        dispatch(isCreateOrg(true));
        if(json.status == 0){
          my.setState({
            show:false
          });
          dispatch(receiveNotification({message:"创建成功",level:"success"}));
          dispatch(fetchGetOrganizeListAction());
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveNotification({message:"创建失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch (e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

export function fetchGetOrganizeListAction(){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")},
  };
  let url = Const.FETCH_URL.UCENTER+"/ucenter/teams";
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"组织列表");
        if(json.status == 0){
          dispatch(receiveOrganizeList(json.result.team_list));
        }else{
          dispatch(receiveOrganizeList([1]));
          dispatch(receiveNotification({message:"获取组织列表失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch (e => {
        dispatch(receiveOrganizeList([1]));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })

  })
}

export function fetchDeleteOrganize(data){
  let myInit = {
    method:"DELETE",
    headers:{token:cookie.load("_at")}
  };
  let url = Const.FETCH_URL.UCENTER+"/ucenter/teams/"+data.team_uuid;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json);
        if(json.status == 0){
          dispatch(receiveOrganizeDelete(false));
          dispatch(receiveNotification({message:"解散成功",level:"success"}));
          switch (data.type){
            case "user":
              dispatch(fetchGetOrganizeListAction());
              break;
            case "organize":
              var exp = new Date();
              exp.setTime(exp.getTime()+1000*60*60*24*7);
              cookie.save('_at',json.result.token,{path:'/',expires: exp});
              location.href = '/';
              break;
          }
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveOrganizeDelete(false));
          dispatch(receiveNotification({message:"解散失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch (e => {
        dispatch(receiveOrganizeDelete(false));
        dispatch(receiveOrganizeList([1]));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

export function fetchGetOrganizeDetailAction(id,token){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")||token}
  };
  let url = Const.FETCH_URL.UCENTER+"/ucenter/teams/"+id;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"获取组织详情")
        if(json.status == 0){
          dispatch(receiveOrganizeDetail(json.result));
        }else if(json.status ==202){
          dispatch(receiveOrganizeDetail({team_type:""}));
          // dispatch(receiveNotification({message:"获取组织详情失败:"+Const.returnMsg(json.status),level:"danger"}));
          // setTimeout(function(){
          //   dispatch(clearNotification());
          // },3000);
        }
      })
      .catch(e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

export function fetchSetOrganizeDetailAction(data){
  let body = JSON.stringify({
    team_owner:data.team_owner,
    team_type:data.team_type,
    team_desc:data.team_desc
  });
  console.log(body,"修改组织参数");
  let myInit = {
    method:"PUT",
    headers:{token:cookie.load("_at")},
    body:body
  };
  let url = Const.FETCH_URL.UCENTER+"/ucenter/teams/"+data.team_uuid;
  return (dispatch =>{
    dispatch(setOrganizeLoading(false));
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"修改组织返回值");
        dispatch(setOrganizeLoading(true));
        if(json.status == 0){
          if(data.team_owner){
            dispatch(receiveSetOwner(false));
            dispatch(fetchChangeAccountAction({type:"organize",team_uuid:data.team_uuid}))
          }
          dispatch(fetchGetOrganizeDetailAction(data.team_uuid));
          dispatch(receiveNotification({message:"修改成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveNotification({message:"修改失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch(e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

export function fetchGetOrganizeUserListAction(data){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")},
  };
  let url = Const.FETCH_URL.UCENTER+"/ucenter/usersteams?page_size="+data.page_size+"&page_num="+data.page_num;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"组织用户列表,>>>>>>>");
        if(json.status == 0){
          dispatch(receiveOrganizeUserList(json.result));
        }else{
          dispatch(receiveOrganizeUserList({count:0}));
          dispatch(receiveNotification({message:Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch(e => {
        dispatch(receiveOrganizeUserList({count:0}));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

export function fetchChangeAccountAction(obj){
  let body = {};
  if(obj.type = "organize"){
    body = JSON.stringify({
      team_uuid:obj.team_uuid,
    });
  }else{
    body = JSON.stringify({
      project_uuid:obj.project_uuid,
    });
  }
  console.log(body);
  let myInit = {
    method:"PUT",
    headers:{token:cookie.load("_at")},
    body:body
  };
  let url = Const.FETCH_URL.UCENTER+"/ucenter/tokens";
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"切换组织");
        if(json.status == 0){
          var exp = new Date();
          exp.setTime(exp.getTime()+1000*60*60*24*7);
          cookie.save('_at',json.result.orga_token,{path:'/',expires: exp,domain:Const.HOSTNAME.COOKIE});
          location.href = '/';
        }else{
          dispatch(receiveNotification({message:"切换失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch(e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

export function fetchGetUserListAction(name){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")}
  };
  let url = Const.FETCH_URL.USER+"/users/list/"+name;
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"用户列表");
        if(json.status == 0){
          dispatch(receiveUserList(json.result));
        }else{
          dispatch(receiveNotification({message:Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch(e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}
export function fetchInviteUser(data,pageData){
  let body = JSON.stringify({
    user_uuid:data.user_uuid
  });
  console.log(data,pageData);
  let myInit = {
    method:"POST",
    headers:{token:cookie.load("_at")},
    body:body
  };
  let url = Const.FETCH_URL.UCENTER+"/ucenter/usersteams";
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"邀请用户");
        if(json.status == 0){
          dispatch(receiveNotification({message:"邀请成功",level:"success"}));
          dispatch(fetchGetOrganizeUserListAction(pageData));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveNotification({message:"邀请失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch(e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}
export function fetchChangeUserRoleAction(obj,pageData){
  console.log(obj,"设置用户权限参数");
  let body = JSON.stringify({
    role_uuid:obj.role_uuid,
  });
  let myInit = {
    method:obj.type?"DELETE":"PUT",
    headers:{token:cookie.load("_at")},
    body:body
  };
  let url = Const.FETCH_URL.UCENTER+"/ucenter/usersteams/"+obj.user_uuid;
  return(dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"设置用户权限");
        dispatch(receiveOrganizeRemove(false));
        if(json.status == 0){
          dispatch(receiveNotification({message:"操作成功",level:"success"}));
          dispatch(fetchGetOrganizeUserListAction(pageData));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveNotification({message:"操作失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch(e => {
        dispatch(receiveOrganizeRemove(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

export function fetchLeaveOrganizeAction(obj,pageData){
  let myInit = {
    method:"DELETE",
    headers:{token:cookie.load("_at")},
  };
  let url = Const.FETCH_URL.UCENTER+"/ucenter/usersteams?user_uuid="+obj.user_uuid+"&team_uuid="+obj.team_uuid;
  return(dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        dispatch(receiveOrganizeRemove(false));
        console.log(json,obj,"离开,踢出组织");
        if(json.status == 0){
          dispatch(receiveNotification({message:"操作成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
          if(obj.type == "user"){//在个人-组织列表中离开组织
            dispatch(fetchGetOrganizeListAction());
          }
          if(obj.type == "other"){//在组织用户列表中离开,踢出组织
            dispatch(fetchGetOrganizeUserListAction(pageData));
          }
          if(obj.type == "me"){//在组织中心自己离开组织
            dispatch(fetchGetOrganizeUserListAction(pageData));
            dispatch(fetchChangeAccountAction({type:"organize",team_uuid:obj.systemOrganizeId}))
          }
        }else{
          dispatch(receiveNotification({message:"操作失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch(e => {
        dispatch(receiveOrganizeRemove(false));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}
export function fetchChangeOrganizeOwnerAction(data){
  let myInit = {
    method:'PUT',
    headers:{token:cookie.load("_at")},
  };
  let url = Const.FETCH_URL.ORGANIZE+"/"+data.orga_uuid+"/owner/"+data.user_uuid;
  return(dispatch =>{
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json =>{
        console.log(json,"委托组织创建者");
        if(json.status == 0){
          dispatch(receiveNotification({message:"设置成功",level:"success"}));
          var exp = new Date();
          exp.setTime(exp.getTime()+1000*60*60*24*7);
          cookie.save('_at',json.result.token,{path:'/',expires: exp});
          location.href = '/';
          setTimeout(function(){
            dispatch(clearNotification());
          },2000);
        }else{
          dispatch(receiveNotification({message:"操作失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },2000);
        }
      })
      .catch(e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}
export function receiveOrganizeDelete(flag) {
  return {
    type:Const.MODAL_STATE.MODAL_ORGANIZE_DELETE,
    payload:flag
  }
}
export function receiveOrganizeRemove(flag) {
  return {
    type:Const.MODAL_STATE.MODAL_ORGANIZE_REMOVE,
    payload:flag
  }
}
export function receiveSetOwner(flag) {
  return {
    type:Const.MODAL_STATE.MODAL_SET_OWNER,
    payload:flag
  }
}

//角色
function receiveRoleList(arr){
  return {
    type:Const.GET_ROLE_LIST,
    payload:arr
  }
}
function receiveRoleDetail(obj){
  return{
    type:Const.GET_ROLE_DETAIL,
    payload:obj
  }
}
export function receiveRoleDelete(flag) {
  return {
    type:Const.MODAL_STATE.MODAL_ROLE_DELETE,
    payload:flag
  }
}
export function clearRoleDetail(){
  return{
    type:Const.CLEAR_ROLE_DETAIL,
    payload:{}
  }
}
export function fetchGetRoleList() {
  let url = Const.FETCH_URL.UCENTER+"/ucenter/roles";
  let myInit = {
    method:'GET',
    headers:{token:cookie.load("_at")},
  };
  return (dispatch=>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json=>{
        console.log(json,"角色列表");
        if(json.status == 0){
          dispatch(receiveRoleList(json.result.role_list));
        }else{
          dispatch(receiveRoleList([]));
          dispatch(receiveNotification({message:Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },2000);
        }
      })
      .catch(e => {
        dispatch(receiveRoleList([]));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}
function isCreateRole(flag){
  return{
    type:Const.IS_BTN_STATE.createRole,
    payload:flag
  }
}
export function fetchCreateRole(data,my){
  let url = Const.FETCH_URL.UCENTER+"/ucenter/roles";
  let body = JSON.stringify({
    role_name:data.role_name,
    role_priv:data.role_priv
  });
  let myInit = {
    method:'POST',
    headers:{token:cookie.load("_at")},
    body:body
  };
  return (dispatch =>{
    dispatch(isCreateRole(false));
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"创建角色");
        dispatch(isCreateRole(true));
        if(json.status == 0){
          my.setState({
            show:false
          });
          dispatch(fetchGetRoleList());
          dispatch(receiveNotification({message:"创建成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveNotification({message:"创建失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch(e => {
        dispatch(isCreateRole(true));
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

export function fetchDeleteRole(id) {
  let url = Const.FETCH_URL.UCENTER+"/ucenter/roles/"+id;
  let myInit = {
    method:"DELETE",
    headers:{token:cookie.load("_at")}
  };
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"删除角色");
        if(json.status == 0){
          dispatch(fetchGetRoleList());
          dispatch(receiveRoleDelete(false));
          dispatch(receiveNotification({message:"删除成功",level:"success"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveNotification({message:"删除失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch(e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}
export function fetchSetRole(obj,my) {
  let url = Const.FETCH_URL.UCENTER+"/ucenter/roles/"+obj.role_uuid;
  let myInit = {
    method:"PUT",
    headers:{token:cookie.load("_at")},
    body:JSON.stringify({
      role_priv:obj.role_priv
    })
  };
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"更新角色");
        if(json.status == 0){
          dispatch(fetchGetRoleList());
          dispatch(receiveNotification({message:"更新成功",level:"success"}));
          my.hide();
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }else{
          dispatch(receiveNotification({message:"更新失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch(e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}
export function fetchGetRoleDetail(id) {
  let url = Const.FETCH_URL.UCENTER+"/ucenter/roles/"+id;
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")}
  };
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"获取角色信息");
        if(json.status == 0){
          dispatch(receiveRoleDetail(json.result));
        }else{
          dispatch(receiveNotification({message:"获取角色信息失败:"+Const.returnMsg(json.status),level:"danger"}));
          setTimeout(function(){
            dispatch(clearNotification());
          },3000);
        }
      })
      .catch(e => {
        dispatch(receiveNotification({message:Const.error,level:"danger"}));
        setTimeout(function(){
          dispatch(clearNotification())
        },3000);
      })
  })
}

function receiveOrganizeName(flag){
  return{
    type:Const.REPEAT_NAME.ORGANIZE,
    payload:flag
  }
}
export function fetchRepeatOrganizeName(name){
  let myInit = {
    method:"GET",
    headers:{token:cookie.load("_at")}
  };
  let url = Const.FETCH_URL.UCENTER+"/ucenter/teams?team_name="+name+"&name_check=true";
  return (dispatch =>{
    return fetch(url,myInit)
      .then(response =>response.json())
      .then(json =>{
        console.log(json,"组织名称是否重复");
        if(json.status == 0){
          dispatch(receiveOrganizeName(json.result==1));//等于1已重复 ,0可用
        }else{
          dispatch(receiveOrganizeName(false));
        }
      })
      .catch(e => {
          dispatch(receiveOrganizeName(false));
      })
  })
}
