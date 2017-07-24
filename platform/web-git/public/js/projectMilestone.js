$(function(){
  var csrf = $('meta[name=_csrf]').attr("content");
  $('.deleteMilestone').on('click', function(){//删除
    var id = $(this).attr("data-id");
    var $this = $(this);
    bootbox.confirm("删除该里程碑将会移除所有任务中相关的信息。是否继续？", function(result) {
      if (result) {
          $.ajax({
              type:"POST",
              url:$this.data('url'),
              data:{
                  "_csrf": csrf,
                  "id": $this.data("id")
              },
              success:function(data){
                  window.location.href = data.redirect;
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
      }
    });
  });
})
