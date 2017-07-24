/**
 * Created by zhangsai on 2017/2/9.
 */
$(function(){
  var status = getUrlKey("ret_status");
  var number = 5;
  if(status == 0){
    setInterval(function(){
      if(number == 0){
        window.location.href = "/login";
      }else {
        number = number-1;
        $(".time").text(number);
      }
    },1000)
  }else{
    $(".activation").html('<p class = "danger icon-fail">激活失败,请重新注册</p><a href = "/signUp">立即注册</a>');
  }
});
