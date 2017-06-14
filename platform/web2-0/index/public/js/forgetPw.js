/**
 * Created by zhangsai on 2016/12/21.
 */
$(function(){
  $("#sendEmail").click(function(){
    var forgetInput = $.trim($("#forgetInput").val());
    var $forgetInputParent = $("#forgetInput").parents(".entryItem");
    var $forgetInputTip = $("#forgetInputTip");
    var my = $(this);
    if(forgetInput.length<5){
      $forgetInputParent.addClass("entryItemError");
      $forgetInputTip.show().text("请输入正确的邮箱/用户名");
      return false;
    }else{
      $forgetInputParent.removeClass("entryItemError");
    }
    var url = URL.url+"/ucenter/passwords/"+forgetInput;
    $(this).prop("disabled",true);
    $.ajax({
      type:"GET",
      url:url,
      data:{},
      contentType: "application/json",
      success:function(json){
        my.prop("disabled",false);
        if(json.status == 0){
          $("body").append(
            '<div class="alert alert-success">发送成功,请到邮箱查看</div>'
          );
          setTimeout(function(){
            $(".alert.alert-success").remove();
          },3000)
        }else{
          $forgetInputParent.addClass("entryItemError");
          $forgetInputTip.show().text(json.msg);
        }
      },
      error:function(){
        my.prop("disabled",false);
      }
    })
  });
});
