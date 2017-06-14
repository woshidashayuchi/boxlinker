/**
 * Created by zhangsai on 2016/12/12.
 */
function getUuid(){
  var len=32;//32长度
  var radix=16;//16进制
  var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid=[],i;radix=radix||chars.length;
  if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';
    uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
  return uuid.join('');
}
function changeImgCodeSrc(){
  $("#imgCode").attr({src:URL.code+"?uuid="+getUuid()});
}
$(function(){
  var uUser = false,uPassword = false,uPasswordAgain = false,uEmail = false,uCode = false;
  var errorTip = tip;
  var userRegExp = /^[a-zA-Z]{1}[a-zA-Z0-9_]{4,19}$/;
  var emailRegExp = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  changeImgCodeSrc();
  //
  $("#changeImgCode").click(function(){
    changeImgCodeSrc();
  });
  $("#userName").blur(function(){
    var $this = $(this);
    var value = $.trim($this.val());
    var $parent = $this.parents(".entryItem");
    var $tip = $("#userTip");
    var url = URL.url+"/ucenter/users?user_name="+value+"&name_check=true";
    if(value.length<5||value.length>20){
      $parent.addClass("entryItemError");
      $tip.text(errorTip.name.Lengths);
      return false;
    }else if(!userRegExp.test(value)){
      $parent.addClass("entryItemError");
      $tip.text(errorTip.name.Format);
      return false;
    }else{
      $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        success: function (res) {
          if (res.result != 0) {
            $parent.addClass("entryItemError");
            $tip.text(errorTip.name.Repeat);
            uUser = false;
          } else {
            $parent.removeClass("entryItemError");
            $tip.text("");
            uUser = true;
          }
        }
      });
    }
  });
  $("#password").change(function(){
    var $this = $(this);
    var value = $.trim($this.val());
    var $parent = $this.parents(".entryItem");
    var $tip = $("#passwordTip");
    if(value.length<6 ||value.length>20){
      $parent.addClass("entryItemError");
      $tip.text(errorTip.password.Format);
      return false;
    }else{
      $parent.removeClass("entryItemError");
      uPassword = true;
    }
  });
  $("#passwordAgain").change(function(){
    var $this = $(this);
    var value = $.trim($this.val());
    var $parent = $this.parents(".entryItem");
    var $tip = $("#passwordAgainTip");
    var $password = $("#password");
    if(value.length<6||value.length>20){
      $parent.addClass("entryItemError");
      $tip.text(errorTip.password.Format);
      return false;
    }else if(value!=$.trim($password.val())){
      $parent.addClass("entryItemError");
      $tip.text(errorTip.password.Again);
      return false;
    }else{
      $parent.removeClass("entryItemError");
      uPasswordAgain = true;
    }
  });
  $("#email").change(function(){
    var $this = $(this);
    var value = $.trim($this.val());
    var $parent = $this.parents(".entryItem");
    var $tip = $("#emailTip");
    var url = URL.url+"/ucenter/users?user_name="+value+"&name_check=true";
    if(!emailRegExp.test(value)){
      $parent.addClass("entryItemError");
      $tip.text(errorTip.email.Format)
    }else{
      $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        success: function (res) {
          if (res.result != 0) {
            $parent.addClass("entryItemError");
            $tip.text(errorTip.email.Repeat);
            uEmail = false;
          } else {
            $parent.removeClass("entryItemError");
            $tip.text("");
            uEmail = true;
          }
        }
      });
    }
  });
  $("#code").change(function(){
    var $this = $(this);
    var value = $.trim($this.val());
    var $parent = $this.parents(".entryItem");
    var $tip = $("#codeTip");
    if(value.length!=4){
      $parent.addClass("entryItemError");
      $tip.text(errorTip.code.Format);
      return false;
    }else{
      $parent.removeClass("entryItemError");
      uCode = true;
    }
  });
  $("#signUp").click(function(){
    var $user = $("#userName"),
        $userTip = $("#userTip"),
        $password = $("#password"),
        $passwordTip = $("#passwordTip"),
        $passwordAgain = $("#passwordAgain"),
        $passwordAgainTip = $("#passwordAgainTip"),
        $email = $("#email"),
        $emailTip = $("#emailTip"),
        $code = $("#code"),
        $codeTip = $("#codeTip"),
        codeId = $("#imgCode").attr("src").split("=")[1];
    var $my = $(this);
    if(!$user.val().length){
      $user.parents(".entryItem").addClass("entryItemError");
      $userTip.text(errorTip.name.Null);
      $user.focus();
      return false;
    }
    if(!$password.val().length){
      $password.parents(".entryItem").addClass("entryItemError");
      $passwordTip.text(errorTip.password.Null);
      return false;
    }
    if(!$passwordAgain.val().length){
      $passwordAgain.parents(".entryItem").addClass("entryItemError");
      $passwordAgainTip.text(errorTip.password.Null);
      return false;
    }
    if($password.val()!=$passwordAgain.val()){
      $passwordAgain.parents(".entryItem").addClass("entryItemError");
      $passwordAgainTip.text(errorTip.password.Again);
      return false;
    }
    if(!$email.val().length){
      $email.parents(".entryItem").addClass("entryItemError");
      $emailTip.text(errorTip.email.Null);
      return false;
    }
    if(!$code.val().length){
      $code.parents(".entryItem").addClass("entryItemError");
      $codeTip.text(errorTip.code.Null);
      return false;
    }
    if(uUser&&uPassword&&uPasswordAgain&&uEmail&&uCode) {
      var url = URL.url+"/ucenter/users";
      var data = JSON.stringify({
        user_name: $.trim($user.val()),
        password: $.trim($password.val()),
        email: $.trim($email.val()),
        code_str: $.trim($code.val()),
        code_id: codeId
      });
      $(this).text("注册中").prop("disabled",true);
      $.ajax({
        type: "POST",
        url: url,
        data: data,
        contentType: "application/json",
        success: function (res) {
          $my.text("注册").prop("disabled",false);
          if (res.status == 0) {
            $("body").append(
              '<div class="alert alert-success">注册成功,请到邮箱中激活后才可登录</div>'
            );
            $user.parents(".entryItem").removeClass("entryItemError");
            setTimeout(function(){
              window.location.href = "/login";
            },5000)
          } else {
            changeImgCodeSrc();
            switch (res.status){
              case 702 :$user.parents(".entryItem").addClass("entryItemError");
                        $userTip.text("用户名已存在");
                break;
              case 704 :$email.parents(".entryItem").addClass("entryItemError");
                        $emailTip.text("该邮箱已被注册");
                break;
              case 805 :$code.parents(".entryItem").addClass("entryItemError");
                        $codeTip.text("验证码错误");
                break;
              default :
                $user.parents(".entryItem").addClass("entryItemError");
                $userTip.text("系统繁忙,请稍后再试");
            }
          }
          console.log(res);
        }
      });
    }
  });
  document.onkeydown = function(e){
    if(e.keyCode == 13){
      $("#signUp").click();
    }
  }
});
