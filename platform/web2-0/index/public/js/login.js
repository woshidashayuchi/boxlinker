$(function(){
  var errorTip = tip;
  $("#login").click(function(){
    var $user = $("#userName"),
        $userTip = $("#userTip"),
        $userParents = $user.parents(".entryItem"),
        $password = $("#password"),
        $passwordTip = $("#passwordTip"),
        $passwordParents = $password.parents(".entryItem");
    var $my = $(this);
    if(!$user.val().length){
      $userParents.addClass("entryItemError");
      $userTip.text(errorTip.name.Null);
      return false
    }
    if(!$password.val().length){
      $passwordParents.addClass("entryItemError");
      $passwordTip.text(errorTip.password.Null);
      return false
    }
    var url = URL.url+"/ucenter/tokens";
    var data = JSON.stringify({
      user_name:$.trim($user.val()),
      password:$.trim($password.val())
    });
    $(this).text("登录中").prop("disabled",true);
    $.ajax({
      type:"POST",
      url:url,
      data:data,
      dataType: "json",
      contentType: "application/json",
      success:function(res){
        console.log(res);
        if(res.status == 0){
          var nowHref = window.location.href.split("300")[0];
          $userParents.removeClass("entryItemError");
          window.sessionStorage.setItem("at",res.result.user_token);
          if(nowHref == "http://localhost:"){
            $.cookie("_at",res.result.user_token,{path:'/',domain:'localhost'});
            $.cookie("isSidebarOpen","true",{path:'/',domain:'localhost'});
            window.location.href =  "http://localhost:3001";
          }else{
            var isGit = getUrlKey("form");
            console.log(isGit);
            $.cookie("_at",res.result.user_token,{path:'/',domain:'boxlinker.com'});
            $.cookie("isSidebarOpen","true",{path:'/',domain:'boxlinker.com'});
            if(isGit == "git"){
              window.location.href =  URL.git;
            }else{
              window.location.href =  URL.console;
            }
          }
        }else{
          $my.text("登录").prop("disabled",false);
          $userParents.addClass("entryItemError");
          $userTip.text(returnMsg(res.status));
        }
      },
      error:function(){
        $my.text("登录").prop("disabled",false);
        $userParents.addClass("entryItemError");
        $userTip.text("服务正忙,请稍后再试");
      }
    });
  });
  $("#userName").change(function(){
    $(this).parents(".entryItem").removeClass("entryItemError");
  });
  $("#password").change(function(){
    $(this).parents(".entryItem").removeClass("entryItemError");
  });
  document.onkeydown = function(e){
    if(e.keyCode == 13){
      $("#login").click();
    }
  }
});
