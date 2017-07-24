$(function(){
    var csrf = $('meta[name=_csrf]').attr("content");
    for(var color in LABEL_COLOR.COLOR){
        var li = "<li><a href = 'javascript:;' data-bg = "+LABEL_COLOR.COLOR[color]+" style = 'background-color:"+LABEL_COLOR.COLOR[color]+"'></a></li>";
        $(".labelColor").append(li);
    }
    $("#new-label-title").bind("input propertychange",function(){
        var val = $.trim($(this).val());
        if(val.length ==0){
            $("#new-label-submit").prop("disabled",true);
        }else{
            $("#new-label-submit").prop("disabled",false);
        }
    });
    $(".labelColorEx").css({"background-color":LABEL_COLOR.COLOR[0]});
    $(".labelColorInput").val(LABEL_COLOR.COLOR[0]);
    $("body").on("click",".labelColor a",function(){
        var bg = $(this).attr("data-bg");
        $(this).parents(".input-group").find(".labelColorEx").css("background",bg);
        $(this).parents(".input-group").find(".labelColorInput").val(bg);
    });
    $('.deleteLabel').on('click', function(){//删除
        var id = $(this).data("id");
        var $this = $(this);
        bootbox.confirm("删除该标签将会移除所有任务中相关的信息。是否继续", function(result) {
            if (result) {
              $.ajax({
                  type:"POST",
                  url:$this.data("url"),
                  data:{
                      "_csrf": csrf,
                      "id": $this.data("id")
                  },
                  success:function(data){
                      window.location.href = data.redirect;
                  }
              });
            }
        });
    });
    $('.editLabel').on('click', function(){
        var id = $(this).data("id");
        var title = $(this).data("title");
        var color = $(this).data("color");
        var url = $(this).data("url");
        var $form = (
            '<form action='+url+' method="post" id="edit-form">'+
            '    <input  name="id" type="hidden" value = '+id+' />'+
            '    <input  name="_csrf" type="hidden" value = '+csrf+' />'+
            '    <div class = "col-sm-4">'+
            '       <input type = "text" class = "form-control" name="title" value = '+title+' required  />'+
            '    </div>'+
            '    <div class = "col-sm-4">'+
            '        <div class = "input-group">'+
            '           <span class = "input-group-addon project_label_color">'+
            '               <i  class = "labelColorEx" style = "background-color:'+color+'"></i>'+
            '           </span>'+
            '           <input class = "form-control dropdown-toggle labelColorInput" value = '+color+'  id = "edit-label-color" name="color" required type = "text" data-toggle="dropdown" aria-expanded="false" />'+
            '           <div class = "dropdown-menu project_label_color_menu">'+
            '               <ul class = "labelColor">'+
                                $(".labelColor").html()+
            '               </ul>'+
            '           </div>'+
            '        </div>'+
            '    </div>'+
            '</form>'
        );
        bootbox.dialog({
            title: "编辑标签",
            message:'<div class="row"> ' +
                        '<div class="col-md-12"> ' +
                            $form +
                        '</div> </div><script></script>',
            buttons: {
                success: {
                    label: "确定",
                    className: "btn-purple",
                    callback: function() {
                        $("#edit-form").submit();
                    }
                },
                button:{
                    label:"取消",

                }
            }
        });
        $(".demo-modal-radio").niftyCheck();
    });
});
