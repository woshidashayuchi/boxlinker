/**
 * Created by zhangsai on 2016/12/12.
 */
var tip = {
  error:"用户名或密码错误",
  name:{
    Null:"用户名不能为空",
    Format:"5-20个字符,字母数字下划线组合且以字母开头",
    Lengths:"用户名必须为5-20位以内",
    Repeat:"用户名已存在"
  },
  password:{
    Null:"密码不能为空",
    Format:"密码必须6-20位以内",
    Again:"两次密码不一致"
  },
  email:{
    Null:"邮箱不能为空",
    Format:"邮箱格式不正确",
    Repeat:"邮箱已存在"
  },
  code:{
    Null:"验证码不能为空",
    Format:"请输入四位验证码"
  }
};
var HTTP = "https";
var URL = {
  url:HTTP+"://ucenter.boxlinker.com/api/v1.0",
  code:HTTP+"://verify-code.boxlinker.com/code",
  console:HTTP+"://console.boxlinker.com",
  git:"http://git.boxlinker.com"
};
function getUrlKey(key){
  if(window.location.href.indexOf("?") ==-1){
    return false;
  }
  var values = window.location.href.split("?")[1];
  var valueArr = values.split("&");
  var obj = {};
  for(var i = 0;i<valueArr.length;i++){
    var value = valueArr[i].split("=");
    obj[value[0]] = value[1]
  }
  return obj[key];

}

function returnMsg(code){
  switch (code){
    case 715 :return "请到邮箱激活后再进行登录";
    case 201 :return "用户名或密码错误";
    case 805 :return "验证码错误";
    case 702 :return "用户名已存在";
    case 704 :return "该邮箱已被注册";
    default: return "用户名或密码错误"
  }
}
