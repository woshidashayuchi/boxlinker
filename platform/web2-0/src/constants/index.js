export const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
//sidebar
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const SIDEBAR_STATUS = {
  OPEN:true,
  CLOSE:false
};
export const SIDEBAR_ACTIVE = 'SIDEBAR_ACTIVE';
//volume
export const RECEIVE_VOLUMES_LIST = 'RECEIVE_VOLUMES_LIST';
export const CLEAR_VOLUMES_LIST = 'CLEAR_VOLUMES_LIST';
//certificate
export const CERTIFICATE_CREATE = 'CERTIFICATE_CREATE';
export const CERTIFICATE_LIST = 'CERTIFICATE_LIST';
//service
export const DEPLOY_SVC_IMAGE = "DEPLOY_SVC_IMAGE";
export const DEPLOY_SVC_CONTAINER = 'DEPLOY_SVC_CONTAINER';
export const DEPLOY_SVC_SENIOR = 'DEPLOY_SVC_SENIOR';
export const CLEAR_DEPLOY_DATA = 'CLEAR_DEPLOY_DATA';
export const GET_ALL_SERVICES = 'GET_ALL_SERVICES';
export const CLEAR_SERVICE_LIST = 'CLEAR_SERVICE_LIST';
export const REFRESH_LIST = 'REFRESH_LIST';
export const GET_SERVICE_DETAIL = 'GET_SERVICE_DETAIL';
export const ADD_PORT = 'ADD_PORT';
export const DEL_PORT = 'DEL_PORT';
export const ADD_SAVE = 'ADD_SAVE';
export const DEL_SAVE = 'DEL_SAVE';
export const ADD_ENV = 'ADD_ENV';
export const DEL_ENV = 'DEL_ENV';
export const CLEAR_SERVICE_DETAIL = 'CLEAR_SERVICE_DETAIL';
export const GET_POD_LIST = 'GET_POD_LIST';
export const SERVICE_STATE = {
  Running:'running',
  Pending:'pending',
  Stopping:'stopping'
};
export const GET_MONITOR_DATA = 'GET_MONITOR_DATA';
export const GET_DASHBOARD = 'GET_DASHBOARD';
//image
export const GET_IMAGE_LIST = 'GET_IMAGE_LIST';
export const GET_IMAGE_RECOMMEND_LIST = 'GET_IMAGE_RECOMMEND_LIST';
export const GET_PLATFORM_IMAGE_LIST = 'GET_PLATFORM_IMAGE_LIST';
export const CLEAR_IMAGE_LIST = 'CLEAR_IMAGE_LIST';
export const GET_IMAGE_DETAIL = 'GET_IMAGE_DETELE';
export const CLEAR_IMAGE_DETAIL = "CLEAR_IMAGE_DETAIL";
// building
export const GET_REPO_LIST = "GET_REPO_LIST";
export const IS_LOADING = "IS_LOADING";
export const GET_GITHUB_AUTH_URL = "GET_GITHUB_AUTH_URL";
export const GET_CODING_AUTH_URL = 'GET_CODING_AUTH_URL';
export const GET_BUILDING_IMAGE_LIST = "GET_BUILDING_IMAGE_LIST";
export const GET_BUILDING_DETAIL = 'GET_BUILDING_DETAIL';
export const GET_BUILD_HISTORY = 'GET_BUILD_HISTORY';
export const GET_BUILD_BRANCH_HISTORY = 'GET_BUILD_BRANCH_HISTORY';
export const GET_BUILD_BRANCH = 'GET_BUILD_BRANCH';
export const CLEAR_BUILD_BRANCH = 'CLEAR_BUILD_BRANCH';
export const CREATE_BUILD_DATA = 'CREATE_BUILD_DATA';
export const GET_BUILD_PROJECTS_DETAIL = 'GET_BUILD_PROJECTS_DETAIL';
export const RECEIVE_BUILD_BRANCH = 'RECEIVE_BUILD_BRANCH';
export const RECEIVE_CLEAR_BUILD_BRANCH_HISTORY = 'RECEIVE_CLEAR_BUILD_BRANCH_HISTORY';
export const ADD_HISTORY = 'ADD_HISTORY';
export const DEL_HISTORY = 'DEL_HISTORY';
export const CLEAR_BUILD_DETAIL = 'CLEAR_BUILD_DETAIL';
export const CLEAR_BUILD_PROJECT_DETAIL = 'CLEAR_BUILD_PROJECT_DETAIL';
// userinfo
export const RECEIVE_USER_INFO = "RECEIVE_USER_INFO";
export const GET_USER_LIST = 'GET_USER_LIST';
export const GET_BALANCE = 'GET_BALANCE';
// organize
export const GET_ORGANIZE_LIST = 'GET_ORGANIZE_LIST';
export const GET_ORGANIZE_DETAIL = 'GET_ORGANIZE_DETAIL';
export const GET_ORGANIZE_USER_LIST = 'GET_ORGANIZE_USER_LIST';
//recovery
export const GET_ALL_SERVICE_RECOVERY = 'GET_ALL_SERVICE_RECOVERY';
// breadcrumb
export const BREADCRUMB_LIST = "BREADCRUMB_LIST";
export const BREADCRUMB = {
  CONSOLE:{
    title:'控制台',
    link:'/'
  },
  CREATE_SERVICE:{
    title:'新建服务',
    link:'/chooseImage'
  },
  CHOSE_IMAGE:{
    title:"选择镜像",
    link:'/chooseImage'
  },
  CONFIG_CONTAINER:{
    title:"容器配置",
    link:'/configure'
  },
  DEPLOY_SERVICE:{
    title:'部署服务',
    link:'/deployService'
  },
  SERVICE_LIST:{
    title:'服务列表',
    link:'/serviceList'
  },
  SERVICE_DETAIL:{
    title:'服务详情',
    link:'/serviceList'
  },
  VOLUMES:{
    title:'存储卷',
    link:'/volumes'
  },
  CERTIFICATE:{
    title:'证书管理',
    link:'/certificate'
  },
  IMAGES_MY:{
    title:'我的镜像',
    link:'/myImage'
  },
  IMAGES_BOX_LINKER:{
    title:'平台镜像',
    link:'/platformImage'
  },
  BUILD_IMAGE:{
    title:'代码构建',
    link:'/building'
  },
  CREATE_IMAGE:{
    title:'新建镜像',
    link:'createImage'
  },
  BUILD_CREATE:{
    title:'构建镜像',
    link:'/create'
  },
  IMAGE_DETAIL:{
    title:'镜像详情',
    link:'/imageDetail'
  },
  USER_CONTAINER:{
    title:'个人中心',
    link:'/user'
  },
  ORGANIZE:{
    title:'组织中心',
    link:'/organize'
  },
  ERROR:{
    title:'出错了',
    link:'/error'
  }
};

export const RECEIVE_NOTIFICATION = "RECEIVE_NOTIFICATION";
export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";

let flag = true;        //true:线上。false:开发
let HTTP = "https";
let URL = HTTP+'://auth.boxlinker.com';
if(flag){

}else{

}
// 线上环境
// export const CONSOLE_LOG = true;
export const HOSTNAME = {
  INDEX: HTTP+'://boxlinker.com',
  CONSOLE: HTTP+'://console.boxlinker.com',
  COOKIE: '.boxlinker.com',
  LOGIN: HTTP+'://boxlinker.com/login'
};


// 本地开发
// export const CONSOLE_LOG = false;
// export const HOSTNAME = {
//   INDEX: 'http://localhost:3002',
//   CONSOLE: 'http://localhost:3001',
//   COOKIE: 'localhost',
//   LOGIN:"http://localhost:3002/login"
// };

export const FETCH_URL = {
  REPOS: URL+'/api/v2.0/oauths/repos',
  USER_INFO: URL+'/user/userinfo',
  REVISE_PASSWORD:URL+'/user/password',
  USER:URL+'/api/v1.0/usercenter',
  //new
  ORGANIZE:URL + '/api/v1.0/usercenter/orgs',
  TOKEN:URL + '/api/v1.0/usercenter/tokens',
  TOKEN_INTERNAL: HTTP+'://auth.boxlinker.svc:8080/api/v1.0/usercenter/tokens',
  AUTH_URL:URL + '/api/v2.0/oauths/oauthurl',
  OAUTH_URL:URL +'/api/v2.0/oauths/oauth',
  GET_IMAGE:URL + '/api/v1.0/repository',
  USER_INFO_INTERNAL: HTTP+'://auth:8080/user/userinfo',
  VOLUMES: HTTP+'://storage.boxlinker.com/api/v1.0/storage/volumes',
  AUTO_BUILD: HTTP+'://auto-build.boxlinker.com',
  GET_SERVICE_MONITOR: HTTP+'://monitor.boxlinker.com/api/v1/model/namespaces',
  DASHBOARD:HTTP+'://controller.boxlinker.com/api/v1/broad',

  LOGS: HTTP+'://log.boxlinker.com/api/v1.0/logs/polling/labels',
  SEARCH_LOGS:HTTP+"://log.boxlinker.com/api/v1.0/logs/labels",
  UCENTER:HTTP+"://ucenter.boxlinker.com/api/v1.0",
  BILLING:HTTP+"://ucenter.boxlinker.com/api/v1.0",
  IMAGE_AUTH:HTTP+"://imageauth.boxlinker.com/api/v1.0",
  SERVICE:HTTP+"://api.boxlinker.com/api/v1.0",
  MONITOR:HTTP+"://monitor.boxlinker.com/api/v1.0",
  UPLOAD:HTTP+"://imgstorage.boxlinker.com/api/v1.0/files/policy",
  GET_CONSOLE:HTTP+"://sshpods.boxlinker.com/api/v1.0/sshpods/pods",

  //recovery
  SERVICE_RECOVERY:HTTP+"://app-recover.boxlinker.com/api/v1.0",
  SERVICE_RECOVERY_DELETE:HTTP+"://app-recover.boxlinker.com/api/v1.0",
  SERVICE_REDUCTION:HTTP+"://app-recover.boxlinker.com/api/v1.0"

};
//certificate
export const CERTIFICATE_HOST = HTTP+'://api.boxlinker.com'+'/api/v1.0/application/certifies';
export const CERTIFICATE_CON = HTTP+'://api.boxlinker.com'+'/api/v1.0/application/certifies';
// endpoints
export const RECEIVE_ENDPOINTS = 'RECEIVE_ENDPOINTS';

export const INPUT_TIP = {
  service :{
    Null:"服务名称不能为空",
    Format:"5-20个字符,小写字母数字中划线组合,开头必须为字母",
    Repeat:"服务名称已存在"
  },
  describe:{
    Format:'字数不能超过五十字,请精简一下'
  },
  domain:{
    Null:"域名不能为空",
    Format:"域名格式不正确",
    Repeat:"域名已被占用"
  },
  image :{
    Null:"镜像名称不能为空",
    Format:"必须为小写字母数字下划线组合,开头必须为字母"
  },
  port:{
    Null:"端口不能为空",
    Format:"端口格式不正确",
    Repeat:"端口不能重复",
    Https:"如想使用HTTPS服务,请先到证书管理,进行证书绑定"
  },
  volumes:{
    Name:"名称不能为空",
    NameFormat:"5-20个字符,必须为小写字母数字下划线组合,开头必须为字母",
    Null:"容器路径不能为空",
    Format:"必须以/开头,后可加字母数字下划线",
    Repeat:"数据卷名称不能重复",
    Path:"同一目录下只能挂载一个数据卷"
  },
  env:{
    Null:"环境变量值不能为空",
    Format:"环境变量只能为字母数字下划线,并以字母开头",
    Repeat:"环境变量键值不能重复"
  },
  organize:{
    Name:"组织名称不能为空",
    Format:'5-20字符,必须为小写字母数字下划线组合,开头必须为字母',
    Desc:"组织描述不能为空",
    Repeat:"组织名称已存在"
  }

};

export const CPU = [
    {x:"1x",m:"256M",cpu:1},
    {x:"2x",m:"512M",cpu:1},
    {x:"4x",m:"1G",cpu:1},
    {x:"8x",m:"2G",cpu:1}

];

export const IS_BTN_STATE = {
  deploy:'IS_DEPLOY',
  building:'IS_BUILDING',
  createVolume:'IS_CREATE_VOLUME',
  autoStateUp:'IS_AUTO_STATE_UP',
  reviseBuilding:"REVISE_BUILDING",
  port:'IS_PORT',
  storage:'STORAGE',
  env:'ENV',
  command:'COMMAND',
  describe:'DWSCRIBE',
  pods:'PODS',
  setOrg:'SET_ORG',
  code:'SET_CODE',
  serviceState:"Pending",
  deleteIng:'DELETE_ING',
  createOrg:'CREATE_ORG',
  container:'CONTAINER',
  createCoupon:'CREATE_COUPON',
  activeCoupon:'ACTIVE_COUPON',
  createRole:'CREATE_ROLE',
  pay:"PAY"
};
export const MODAL_STATE = {
  MODAL_PROJECT_DELETE:'MODAL_PROJECT_DELETE',
  MODAL_PROJECT_CREATE:'MODAL_PROJECT_CREATE',
  MODAL_ORGANIZE_LEAVE:'MODAL_ORGANIZE_LEAVE',
  MODAL_ORGANIZE_DELETE:'MODAL_ORGANIZE_DELETE',
  MODAL_ORGANIZE_REMOVE:'MODAL_ORGANIZE_REMOVE',
  MODAL_SERVICE_DELETE:'MODAL_SERVICE_DELETE',
  MODAL_VOLUME_DELETE:'MODAL_VOLUME_DELETE',
  MODAL_IMAGE_DELETE:'MODAL_IMAGE_DELETE',
  MODAL_ROLE_DELETE:'MODAL_ROLE_DELETE',
  MODAL_SET_OWNER:'MODAL_SET_OWNER'
};
export const error = "服务正忙,请稍后再试";

export const returnMsg = function(code){
  switch(Number(code)){
    case 101 :
      return "参数错误,请刷新页面后重试";
    case 201 :
      setTimeout(function(){
        window.location.href = HOSTNAME.LOGIN;
      },3000);
      return "认证信息失效,请重新登录";
    case 202 :
      return "操作被拒绝";
    case 301 :
      return "名称已存在";
    case 302 :
      return "余额不足,请充值";
    case 303 :
      return "已达当前等级最大限制";
    default :
      return "服务正忙,请稍后再试";
  }
};

export const REGEXP_NAME = /^[a-z]{1}[a-z0-9-]{4,19}$/;
export const REGEXP_DOMAIN = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}/;

export const GET_USER_ID = 'GET_USER_ID';
export const GET_ORGANIZE_ID = 'GET_ORGANIZE_ID';
export const GET_ROLE_LIST = 'GET_ROLE_LIST';
export const GET_ROLE_DETAIL = 'GET_ROLE_DETAIL';
export const CLEAR_ROLE_DETAIL = 'CLEAR_ROLE_DETAIL';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_RECHARGE_LIST = 'GET_RECHARGE_LIST';
export const GET_CONSUME_LIST = 'GET_CONSUME_LIST';
export const GET_O_AUTH = 'GET_O_AUTH';
export const CLEAR_PLATFORM_IMAGE_LIST = 'CLEAR_PLATFORM_IMAGE_LIST';
export const GET_SERVICE_IMAGE = 'GET_SERVICE_IMAGE';
export const GET_COSTS = 'GET_COSTS';
export const GET_LEVELS = 'GET_LEVELS';
export const GET_COUPON_LIST = 'GET_COUPON_LIST';
export const GET_COUPON_GIFT_LIST = 'GET_COUPON_GIFT_LIST';
export const GET_LIMITS = 'GET_LIMITS';
export const REPEAT_NAME = {
  ORGANIZE:'REPEAT_ORGANIZE_NAME',
  SERVICE:'REPEAT_SERVICE_NAME',
  DOMAIN:'REPEAT_DOMAIN_NAME'
};
export const GET_RECHARGES = 'GET_RECHARGES';
export const CLEAR_RECHARGES = 'CLEAR_RECHARGES';
export const GET_SWITCH_RECHARGES = 'GET_SWITCH_RECHARGES';
export const CLEAR_SWITCH_RECHARGES = 'CLEAR_SWITCH_RECHARGES';
export const GET_CONSOLE_URL = 'GET_CONSOLE_URL';




