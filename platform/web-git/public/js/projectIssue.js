$(function(){
  var csrf = $('meta[name=_csrf]').attr("content");
  var issues = function(){
      this.init();
  };
  issues.prototype = {
    init:function(){
        this.bindInit();
    },
    bindInit:function(){
        /*删除任务*/
        $('.deleteIssue').on('click', function(){
            var url = $(this).data("url");
            bootbox.confirm("确定删除?", function(result) {
                if (result) {
                    $.ajax({
                        type:"POST",
                        url:url,
                        data:{
                            "_csrf": csrf
                        },
                        success:function(res){
                            window.location.href = res.redirect;
                        },
                        error:function(){
                            $.niftyNoty({
                                type: 'danger',
                                icon : 'pli-cross icon-2x',
                                message : '删除失败,请重试',
                                container : 'floating',
                                timer : 3000
                            });
                        }
                    });
                }else{

                };
            });
        });
        /*修改issue状态*/
        $(".issue-status-button").bind("click",function(){
            $(this).parents("form.issue-form").find(".csrf").val(csrf);
            $(this).parents("form.issue-form").find(".status").val($(this).data('status-val'));
            console.log($(this).data('status-val'),csrf)
            setTimeout(function(){
                $(this).parents("form.issue-form").submit();
            }.bind(this),100);
        });
    }
  };

  var issuesFun = new issues();
});
