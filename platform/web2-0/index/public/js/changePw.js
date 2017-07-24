/**
 * Created by zhangsai on 2016/12/21.
 */
$(function(){
  checkCode();
  $("#setPassword").click(function(){
    var $password = $("#password");
    var $passwordParent = $password.parents(".entryItem");
    var $passwordTip = $("#passwordTip");
    var $passwordAgain = $("#passwordAgain");
    var $passwordAgainParent = $passwordAgain.parents(".entryItem");
    var $passwordAgainTip = $("#passwordAgainTip");
    if($password.val().length == 0){
      $passwordParent.addClass("entryItemError");
      $passwordTip.text("密码不能为空");
      return false
    }
    if($passwordAgain.val().length == 0){
      $passwordAgainParent.addClass("entryItemError");
      $passwordAgainTip.text("密码不能为空");
      return false
    }
    var url = URL.url+"/ucenter/passwords/"+getUrlKey("id");
    var data = JSON.stringify({
      password:$password.val()
    });
    $.ajax({
      type:"PUT",
      url:url,
      beforeSend: function(request) {
        request.setRequestHeader("token", getUrlKey("token"));
      },
      data:data,
      contentType: "application/json",
      success:function(json){
        if(json.status == 0){
          $("body").append(
            '<div class="alert alert-success">修改成功</div>'
          );
          setTimeout(function(){
            window.location.href = "/login";
          },3000)
        }else{
          $passwordParent.addClass("entryItemError");
          $passwordTip.show().text(json.msg);
        }
      },
      error:function(){

      }
    })
  });
  $("#password").blur(function(){
    var $this = $(this);
    var $parents = $this.parents(".entryItem");
    var $thisTip = $("#passwordTip");
    if($this.val().length<6){
      $parents.addClass("entryItemError");
      $thisTip.text("密码必须6位以上");
    }else{
      $parents.removeClass("entryItemError");
    }
  });
  $("#passwordAgain").blur(function(){
    var $this = $(this);
    var $first = $("#password");
    var $parents = $this.parents(".entryItem");
    var $thisTip = $("#passwordAgainTip");
    if($this.val().length<6){
      $parents.addClass("entryItemError");
      $thisTip.text("密码必须6位以上");
    }else if($this.val() != $first.val()){
      $parents.addClass("entryItemError");
      $thisTip.text("两次密码不一致");
    }else{
      $parents.removeClass("entryItemError");
    }
  });
  $("#password,#passwordAgain").focus(function(){
    var $parents = $(this).parents(".entryItem");
    $parents.removeClass("entryItemError");
  });
  function checkCode(){
    var id = getUrlKey("id");
    var token = getUrlKey("token");
    if(id&&token){

    }else{
      window.location.href = "/forgetPw";
    }
  }
});
