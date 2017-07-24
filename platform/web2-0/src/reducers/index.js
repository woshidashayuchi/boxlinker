import { combineReducers } from 'redux'
import runtime from './runtime'
import {
  TOGGLE_SIDEBAR,
  SIDEBAR_STATUS,
  SIDEBAR_ACTIVE,
  RECEIVE_VOLUMES_LIST,
  GET_ALL_SERVICES,
  GET_SERVICE_DETAIL,
  GET_REPO_LIST,
  IS_LOADING,
  GET_IMAGE_LIST,
  GET_IMAGE_DETAIL,
  RECEIVE_USER_INFO,
  BREADCRUMB_LIST,
  GET_GITHUB_AUTH_URL,
  ADD_PORT,
  DEL_PORT,
  ADD_SAVE,
  DEL_SAVE,
  ADD_ENV,
  DEL_ENV,
  DEPLOY_SVC_IMAGE,
  DEPLOY_SVC_CONTAINER,
  DEPLOY_SVC_SENIOR,
  GET_BUILDING_IMAGE_LIST,
  RECEIVE_NOTIFICATION,
  CLEAR_NOTIFICATION,
  CLEAR_SERVICE_DETAIL,
  CLEAR_SERVICE_LIST,
  CLEAR_VOLUMES_LIST,
  CLEAR_IMAGE_LIST,
  GET_POD_LIST,
  IS_BTN_STATE,
  CERTIFICATE_LIST,
  GET_ALL_SERVICE_RECOVERY
} from '../constants';

import * as Const from '../constants'

const serviceData = {
  policy:1,
  pods_num:1,
  service_name:"",
  containerDeploy:0,
  containerNum:1,
  container:[{at:new Date().getTime(),flag:false,access_mode:"HTTP"}],
  env:[{at:new Date().getTime()}],
  volume:[{at:new Date().getTime(),readonly:0}],
  auto_startup:1
};

function isSidebarOpen(state = SIDEBAR_STATUS.OPEN, action){
  switch (action.type){
    case TOGGLE_SIDEBAR:
      return action.payload;
    default:
      return state;
  }
}

function sidebarActive(state = "/", action){
  switch (action.type){
    case SIDEBAR_ACTIVE:
      return action.payload;
    default:
      return state;
  }
}

function serviceList(state = {count:-1},action){//count初始为-1,页面显示loading。
  switch (action.type){
    case GET_ALL_SERVICES:
      return action.payload;
    case CLEAR_SERVICE_LIST:
      return {count:0};
    case Const.REFRESH_LIST:
      return {count:-1};
    default:
      return state;
  }
}

function podList(state = [1],action) {
  switch (action.type){
    case GET_POD_LIST:
      return action.payload;
    default:
      return state;
  }
}

function serviceDetail(state = serviceData ,action){
  switch(action.type){
    case GET_SERVICE_DETAIL :
      let port = [];
      let flag = false;
      let tr = action.payload.container;
      let n = null;
      for(var i=0;i<tr.length;i++){
        let obj = tr[i];
        let container_port = tr[i].container_port;
        let protocol = tr[i].protocol;
        let access_mode = tr[i].access_mode;
        obj.container_port = container_port;
        obj.protocol = protocol;
        obj.access_mode = access_mode == ""?"no":access_mode;
        obj.at = new Date().getTime()+i;
        if(access_mode == "HTTP"){
          flag = true;
          n = i;
        }
        port.push(obj);
      }
      for(let j =0;j<port.length;j++){
        if(flag){
          if(j == n){
            port[j].flag = false;
          }else{
            port[j].flag = true;
          }
        }else{
          port[j].flag = false;
        }
      }
      return Object.assign({},action.payload,{container:port});
    case ADD_PORT:
      return Object.assign({},state,{container:action.payload});
    case DEL_PORT:
      return Object.assign({},state,{container:action.payload});
    case ADD_SAVE:
      let addSave = state.volume;
      addSave.push({at:new Date().getTime(),readonly:0});
      return Object.assign({},state,{volume:addSave});
    case DEL_SAVE:
      let delSave = state.volume;
      if(delSave.length == 1){
        return Object.assign({},state,{volume:[{at:new Date().getTime(),readonly:0}],});
      }else {
        for(let m=0;m<delSave.length;m++){
          if(delSave[m].at == action.payload){
            delSave.splice(m,1)
          }
        }
        return Object.assign({},state,{volume:delSave});
      }
    case ADD_ENV:
      let addEnv = state.env;
      addEnv.push({at:new Date().getTime()});
      return Object.assign({},state,{env:addEnv});
    case DEL_ENV:
      let env = state.env;
      if(env.length == 1){
        return Object.assign({},state,{env:[{at:new Date().getTime()}]});
      }else {
        for (let i = 0; i < env.length; i++) {
          if (env[i].at == action.payload) {
            env.splice(i, 1)
          }
        }
        return Object.assign({},state,{env:env});
      }
    case Const.RECEIVE_ENDPOINTS:
      return Object.assign({},state,{endpoints: action.payload});
    case CLEAR_SERVICE_DETAIL:
      return serviceData;
    default :
      return state;
  }
}

function monitorData(state = {memory:{},network:{},cpu:{}},action){
  switch (action.type){
    case Const.GET_MONITOR_DATA:
      switch (action.flag){
        case "memory":
          return Object.assign({},state,{memory: action.payload});
          break;
        case "network":
          return Object.assign({},state,{network: action.payload});
          break;
        case "cpu":
          return Object.assign({},state,{cpu: action.payload});
      }
      break;
    default:
      return state;
  }
}

function volumesList(state = {count:-1},action){//count初始为-1,页面显示loading。
  switch (action.type) {
    case RECEIVE_VOLUMES_LIST:
        return action.payload;
    case CLEAR_VOLUMES_LIST:
      return {count:-1};
    case Const.REFRESH_LIST:
      return {count:-1};
    default:
          return state
  }
}

function certificateCon(state = {},action){
  switch (action.type) {
    case CERTIFICATE_LIST:
          return action.payload;
    default:
      return state;
  }
}

function isBtnState(
  state = {deploy:true,building:true,volume:true,autoStateUp:true,reviseBuilding:true,
    port:true,storage:true,env:true,command:true,describe:true,pods:true,setOrg:true,code:true,serviceState:{state:"Running",time:""},
    deleteIng:true,createOrg:true,container:true,createCoupon:true,activeCoupon:true,createRole:true,pay:true
  }
  ,action){
  switch (action.type){
    case IS_BTN_STATE.deploy:
      state.deploy = action.payload;
      return Object.assign({},state);
    case IS_BTN_STATE.building:
      state.building = action.payload;
      return Object.assign({},state);
    case IS_BTN_STATE.createVolume:
      state.volume = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.autoStateUp:
      state.autoStateUp = action.payload;
          return Object.assign({},state);
    case Const.IS_BTN_STATE.reviseBuilding:
      state.reviseBuilding = action.payload;
          return Object.assign({},state);
    case Const.IS_BTN_STATE.port:
      state.port = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.storage:
      state.storage = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.env:
      state.env = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.command:
      state.command = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.describe:
      state.describe = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.pods:
      state.pods = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.setOrg:
      state.setOrg = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.code:
      state.code = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.serviceState:
      state.serviceState.state = action.payload;
      state.serviceState.time = action.time;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.delete:
      state.deleteIng = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.createOrg:
      state.createOrg = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.container:
      state.container = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.createCoupon:
      state.createCoupon = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.activeCoupon:
      state.activeCoupon = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.createRole:
      state.createRole = action.payload;
      return Object.assign({},state);
    case Const.IS_BTN_STATE.pay:
      state.pay = action.payload;
      return Object.assign({},state);
    default:
      return state;
  }
}

function repos(state = [],action){
  switch (action.type) {
    case GET_REPO_LIST:
        return action.payload;
    default:
          return state
  }
}

function isLoading(state = false,action){
  switch (action.type) {
    case IS_LOADING:
        return action.payload;
    default:
          return state
  }
}

function imageList(state = {count:-1},action){
  switch (action.type){
    case GET_IMAGE_LIST:
      return action.payload;
    default:
      return state;
  }
}
function imageRecommendList(state = {count:-1},action){
  switch (action.type){
    case Const.GET_IMAGE_RECOMMEND_LIST:
      return action.payload;
    default:
      return state;
  }
}
function platformImageList(state = {count:-1},action){
  switch (action.type){
    case Const.GET_PLATFORM_IMAGE_LIST:
      return action.payload;
    case Const.CLEAR_PLATFORM_IMAGE_LIST:
      return {count:-1};
    default:
      return state;
  }
}

function imageDetail(state = {} ,action){
  switch(action.type){
    case GET_IMAGE_DETAIL :
      return action.payload;
    case Const.CLEAR_IMAGE_DETAIL:
      return action.payload;
    default :
      return state;
  }
}

function user_info(state = {},action){
  switch(action.type){
    case RECEIVE_USER_INFO:
          return action.payload;
    default:
          return state;
  }
}

function breadcrumbList(state = [],action){
  switch(action.type){
    case BREADCRUMB_LIST :
      return action.payload;
    default :
      return state;
  }
}

function authUrl(state = {github:"",coding:""},action){
  switch(action.type){
    case GET_GITHUB_AUTH_URL :
      state.github = action.payload;
      return Object.assign({},state);
      break;
    case Const.GET_CODING_AUTH_URL:
      state.coding = action.payload;
      return Object.assign({},state);
      break;
    default :
      return state;
  }
}

function buildingImageList(state = [1],action){
  switch (action.type){
    case GET_BUILDING_IMAGE_LIST:
      return action.payload;
    case CLEAR_IMAGE_LIST:
      return [];
    case Const.REFRESH_LIST:
      return [0];
    default :
      return state;
  }
}
function buildingDetail(state = {a:-1},action){//a=-1显示loading
  switch (action.type){
    case Const.GET_BUILDING_DETAIL:
      return Object.assign({a:1},action.payload);//a=1获取到数据
    case Const.CLEAR_BUILD_DETAIL:
      return {a:-1};
    default :
      return state;
  }
}
function buildProjectsDetail(state = {},action){
  switch (action.type){
    case Const.GET_BUILD_PROJECTS_DETAIL:
      return action.payload;
    case Const.CLEAR_BUILD_PROJECT_DETAIL:
      return {};
    default :
      return state;
  }
}
const deploy = {
  policy:1,
  pods_num:1,
  service_name:"",
  containerDeploy:0,
  containerNum:1,
  container:[{at:new Date().getTime(),flag:false,access_mode:"HTTP"}],
  env:[{at:new Date().getTime()}],
  volume:[{at:new Date().getTime(),readonly:0}],
  auto_startup:1
};
function deployData(state = deploy,action){
  switch (action.type){
    case DEPLOY_SVC_IMAGE:
      return Object.assign({},state,{
        image_name: action.payload.image_name,
        image_uuid:action.payload.image_uuid
      });
    case DEPLOY_SVC_CONTAINER:
      return Object.assign({},state,action.payload);
    case DEPLOY_SVC_SENIOR:
      return Object.assign({},state,action.payload);
    case ADD_PORT:
      return Object.assign({},state,{container:action.payload});
    case DEL_PORT:
      return Object.assign({},state,{container:action.payload});
    case ADD_SAVE:
      let addSave = state.volume;
      addSave.push({at:new Date().getTime(),readonly:0});
      return Object.assign({},state,{volume:addSave});
    case DEL_SAVE:
      let delSave = state.volume;
      if(delSave.length<=1){
        return Object.assign({}, state, {volume: delSave});
      }else {
        for (let m = 0; m < delSave.length; m++) {
          if (delSave[m].at == action.payload) {
            delSave.splice(m, 1)
          }
        }
        return Object.assign({}, state, {volume: delSave});
      }
    case ADD_ENV:
      let addEnv = state.env;
      addEnv.push({at:new Date().getTime()});
      return Object.assign({},state,{env:addEnv});
    case DEL_ENV:
      let env = state.env;
      if(env.length<=1){
        return Object.assign({},state,{env:env});
      }else{
        for(let i=0;i<env.length;i++){
          if(env[i].at == action.payload){
            env.splice(i,1)
          }
        }
        return Object.assign({},state,{env:env});
      }
    case Const.CLEAR_DEPLOY_DATA:
      return deploy;
    default:
      return state;
  }
}

function notifications(state = {},action){
  switch (action.type){
    case RECEIVE_NOTIFICATION:
          return action.payload;
    case CLEAR_NOTIFICATION:
          return {};
    default:
          return state
  }
}
function organizeList(state = [1],action){
  switch (action.type){
    case Const.GET_ORGANIZE_LIST:
      return action.payload;
    break;
    default :
        return state
  }
}
function organizeDetail(state = {creation_time:""},action){
  switch (action.type){
    case Const.GET_ORGANIZE_DETAIL:
      return action.payload;
      break;
    default:
      return Object.assign({},state);
  }
}
function organizeUserList(state = {count:-1},action){
  switch (action.type){
    case Const.GET_ORGANIZE_USER_LIST:
      return action.payload;
      break;
    default :
      return state
  }
}
function dashboard(state = {
  cpu_b:"0%",
  cpu_limit:0,
  cpu_usage:0,
  memory_b:"0%",
  memory_limit:0,
  memory_usage:0,
  flag:1
},action){
  switch (action.type){
    case Const.GET_DASHBOARD:
      return action.payload;
    default:
      return state;
  }

}
function userList(state = [],action){
  switch (action.type){
    case Const.GET_USER_LIST:
      return action.payload;
    break;
    default:
      return state;
  }
}

function balance(state = 0,action){
  switch(action.type){
    case Const.GET_BALANCE:
      return action.payload;
    default:
      return state
  }
}function buildBranch (state = [],action){
  switch (action.type){
    case Const.GET_BUILD_BRANCH:
      return action.payload;
      break;
    case Const.CLEAR_BUILD_BRANCH:
      return [];
      break;
    default:
      return state
  }
}
function buildHistory(state = [],action){
  switch (action.type){
    case Const.GET_BUILD_HISTORY:
      return action.payload;
    default:
      return state;
  }
}
function buildBranchHistory(state = [],action){
  switch(action.type){
    case Const.RECEIVE_BUILD_BRANCH:
      let arr = state;
      arr.push(action.payload);
      return arr;
    case Const.GET_BUILD_BRANCH_HISTORY:
      let array = state;
      array.map((item,i) =>{
        if(item.name == action.payload.name){
          item.historyData = action.payload.historyData
        }
      });
      return array;
    case Const.RECEIVE_CLEAR_BUILD_BRANCH_HISTORY:
      return [];
    default :
      return state;
  }
}
function createBuildData(state ={},action){
  switch (action.type){
    case Const.CREATE_BUILD_DATA:
      return action.payload;
    break;
    default :
      return state;
  }
}

function otherHistory(state = [{},{},{}],action){
  switch (action.type){
    case Const.ADD_HISTORY:
      let flag = false;
      state.map((item,i) =>{
        if(item.buildId == action.payload.buildId){
          flag = true;
        }
      });
      if(flag){
        return state;
      }else{
        return [].concat(state).concat(action.payload);
      }
      return n;
    case Const.DEL_HISTORY:
      let arr = state;
      arr.map((item,i) =>{
        if(item.buildId == action.payload){
          arr.splice(i,1);
        }
      });
      return arr;
    default:
      return state;

  }
}
function modalState(state = {projectDelete:false,projectCreate:false,
  organizeLeave:false,organizeDelete:false,organizeRemove:false,serviceDelete:false,volumeDelete:false,
  imageDelete:false,role:false,setOwner:false,},action){
  switch (action.type){
    case Const.MODAL_STATE.MODAL_PROJECT_DELETE:
      state.projectDelete = action.payload;
      return Object.assign({},state);
    case Const.MODAL_STATE.MODAL_ORGANIZE_LEAVE:
      state.organizeLeave = action.payload;
      return Object.assign({},state);
    case Const.MODAL_STATE.MODAL_ORGANIZE_DELETE:
      state.organizeDelete = action.payload;
      return Object.assign({},state);
    case Const.MODAL_STATE.MODAL_ORGANIZE_REMOVE:
      state.organizeRemove = action.payload;
      return Object.assign({},state);
    case Const.MODAL_STATE.MODAL_SERVICE_DELETE:
      state.serviceDelete = action.payload;
      return Object.assign({},state);
    case Const.MODAL_STATE.MODAL_VOLUME_DELETE:
      state.volumeDelete = action.payload;
      return Object.assign({},state);
    case Const.MODAL_STATE.MODAL_IMAGE_DELETE:
      state.imageDelete = action.payload;
      return Object.assign({},state);
    case Const.MODAL_STATE.MODAL_ROLE_DELETE:
      state.role = action.payload;
      return Object.assign({},state);
    case Const.MODAL_STATE.MODAL_SET_OWNER:
      state.setOwner = action.payload;
      return Object.assign({},state);
    default:
      return state;

  }
}
function token(state = {},action){
  switch (action.type){
    case Const.GET_TOKEN:
      return action.payload;
    default:
      return state;
  }
}
function roleList(state = [1],action){
  switch (action.type){
    case Const.GET_ROLE_LIST:
      return action.payload;
    default:
      return state
  }
}
function roleDetail(state = {},action){
  switch (action.type){
    case Const.GET_ROLE_DETAIL:
      return action.payload;
    case Const.CLEAR_ROLE_DETAIL:
      return action.payload;
    default:
      return state
  }
}
function rechargeList(state = {count:-1,recharge_list:[-1]},action) {
  switch (action.type){
    case Const.GET_RECHARGE_LIST:
      return action.payload;
    default:
      return state
  }
}
function consume(state = {bills_list:[1],bills_total:{resource_cost:0,voucher_cost:0}},action){
  switch (action.type){
    case Const.GET_CONSUME_LIST:
      return action.payload;
    default:
      return state
  }
}
function oauth(state = {},action){
  switch (action.type){
    case Const.GET_O_AUTH:
      return action.payload;
    default:
      return state;
  }
}
function serviceForImage(state = {},action){
  switch (action.type){
    case Const.GET_SERVICE_IMAGE:
      return action.payload;
    default:
      return state;
  }
}
function costs(state = 0,action){
  switch (action.type){
    case Const.GET_COSTS:
      return action.payload;
    default:
      return state;
  }
}
function levels(state = {level:0},action){
  switch (action.type){
    case Const.GET_LEVELS:
      return action.payload;
    default:
      return state;
  }
}
function couponList(state = {count:-1},action){
  switch (action.type){
    case Const.GET_COUPON_LIST:
      return action.payload;
    default:
      return state;
  }
}
function couponGiftList(state = {count:-1},action){
  switch (action.type){
    case Const.GET_COUPON_GIFT_LIST:
      return action.payload;
    default:
      return state;
  }
}
function limits(state=[],action){
  switch (action.type){
    case Const.GET_LIMITS:
      return action.payload;
    default:
      return state;
  }
}
let repeatNameObj = {
  organizeName:false,
  serviceName:false,
  domain:false
};
function repeatName(state = repeatNameObj,action){
  switch (action.type){
    case Const.REPEAT_NAME.ORGANIZE:
      state.organizeName = action.payload;
      return Object.assign({},state);
    case Const.REPEAT_NAME.SERVICE:
      state.serviceName = action.payload;
      return Object.assign({},state);
    case Const.REPEAT_NAME.DOMAIN:
      state.domain = action.payload;
      return Object.assign({},state);
    default:
      return state;
  }
}
function recharges(state = {count:-1},action){
  switch(action.type){
    case Const.GET_RECHARGES:
      return action.payload;
    case Const.CLEAR_RECHARGES:
      return {};
    default:
      return state;
  }
}
function switchRecharges(state = {},action){
  switch(action.type){
    case Const.GET_SWITCH_RECHARGES:
      return action.payload;
    case Const.CLEAR_SWITCH_RECHARGES:
      return {};
    default:
      return state
  }
}
function consoleUrl(state = [],action){
  switch (action.type){
    case Const.GET_CONSOLE_URL:
      return action.payload;
    default:
      return state
  }

}

function serviceRecovery(state = {count:-1},action){
  switch (action.type){
    case Const.GET_ALL_SERVICE_RECOVERY:
          return action.payload;
    default:
          return state
  }
}

const rootReducer = combineReducers({
  token,
  dashboard,
  isSidebarOpen,
  sidebarActive,
  volumesList,
  serviceList,
  serviceDetail,
  monitorData,
  podList,
  repos,
  isLoading,
  imageList,
  imageRecommendList,
  platformImageList,
  imageDetail,
  user_info,
  breadcrumbList,
  authUrl,
  buildingImageList,
  buildingDetail,
  buildProjectsDetail,
  deployData,
  notifications,
  runtime,
  isBtnState,
  organizeList,
  organizeDetail,
  organizeUserList,
  userList,
  balance,
  buildHistory,
  buildBranchHistory,
  buildBranch,
  createBuildData,
  otherHistory,
  modalState,
  roleList,
  roleDetail,
  rechargeList,
  consume,
  oauth,
  serviceForImage,
  costs,
  levels,
  couponList,
  couponGiftList,
  limits,
  repeatName,
  recharges,
  switchRecharges,
  consoleUrl,
  certificateCon,
  serviceRecovery
});

export default rootReducer;
