$(function(){
    var csrf = $('meta[name=_csrf]').attr("content");
    var Setting = function(){
        this.init();
    };
    Setting.prototype = {
        init:function(){
          this.bindInit();
          this.searchUser();
        },
        bindInit:function(){
            $("#branch").select2();
            /*删除项目*/
            $(".del-rope").on("click",function(){//删除项目
                var id = $(this).data("id");
                var $this = $(this);
                var url = $(this).data("url");
                var name = $(this).data("name");
                var $form = (
                    '<form action='+url+' method="post" id="delete-rope-form">'+
                    '    <input type="hidden" name="action" value="delete">'+
                    '    <input  name="_csrf" type="hidden" value = '+csrf+' />'+
                    '    <div class = "form-group">'+
                    '       <label>请输入要删除的项目名称:</label>'+
                    '       <input type = "text" id = "rope_name_del" class = "form-control" name="repo_name" value = "" required  />'+
                    '       <small class = "help-block" id = "rope_name_tip"></small>'+
                    '    </div>'+
                    '</form>'
                );
                bootbox.dialog({
                    title: "确定删除吗?",
                    message:'<div class="row"> ' +
                    '<div class="col-md-12"> ' +
                    $form +
                    '</div> </div><script></script>',
                    buttons: {
                        success: {
                            label: "确定",
                            className: "btn-purple",
                            callback: function() {
                                var $rope_name = $("#rope_name_del");
                                var $rope_name_tip = $("#rope_name_tip");
                                var rope_name = $.trim($rope_name.val());
                                if(rope_name.length == 0){
                                    $rope_name.parent().addClass("has-error");
                                    $rope_name_tip.text(TIP.PROJECT.NULL);
                                    return false;
                                }
                                if(rope_name != name){
                                    $rope_name.parent().addClass("has-error");
                                    $rope_name_tip.text(TIP.PROJECT.DELETE);
                                    return false;
                                }
                                $rope_name.parent().removeClass("has-error");
                                $rope_name_tip.text("");
                                $("#delete-rope-form").submit();
                            }
                        },
                        button:{
                            label:"取消",

                        }
                    }
                });
            });
            /*删除协作者*/
            $(".delete-button-collaboration").on("click",function(){
                var id = $(this).data("id");
                var url = $(this).data("url");
                var $this = $(this);
                bootbox.confirm("确定删除此用户?",function(result){
                    if(result){
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: {
                                "_csrf": csrf,
                                "id": id
                            },
                            success: function (data) {
                                $.niftyNoty({
                                    type: 'success',
                                    icon: 'pli-like-2 icon-2x',
                                    message: '删除成功',
                                    container: 'floating',
                                    timer: 1000,
                                    onHide: function () {
                                        window.location.href = data.redirect;
                                    }
                                });
                            },
                            error: function () {
                                $.niftyNoty({
                                    type: 'danger',
                                    icon: 'pli-cross icon-2x',
                                    message: '删除失败,请重试',
                                    container: 'floating',
                                    timer: 3000
                                });
                            }
                        })
                    }else{

                    }
                })
            });
            /*设置协作者的权限*/
            $('.set-access-list .item').on("click",function () {
                var $menu = $(this).parent();
                var txt = $(this).find("a").text();
                $menu.siblings("button").find("span").text(txt);
                $.ajax({
                    type:"POST",
                    url:$menu.data('url'),
                    data:{
                        "_csrf": csrf,
                        "uid": $menu.data('uid'),
                        "mode": $(this).data('value')
                    },
                    success:function(){
                        $.niftyNoty({
                            type: 'success',
                            icon : 'pli-like-2 icon-2x',
                            message : '设置成功',
                            container : 'floating',
                            timer : 3000
                        });
                    },
                    error:function(){
                        $.niftyNoty({
                            type: 'danger',
                            icon : 'pli-like-2 icon-2x',
                            message : '设置失败',
                            container : 'floating',
                            timer : 3000
                        });
                    }
                });
            });
        },
        searchUser:function(){
            var chooseNumber = -1;
            var my = this;
            $("#setting-search-user").bind("blur",function(){
                var $this = $(this);
                var $ul = $this.siblings("ul");
                setTimeout(function(){
                    chooseNumber = -1;
                    $ul.hide();
                },300);
            });
            $("#setting-search-user").bind("input propertychange",function(){
                var $this = $(this);
                var $ul = $this.siblings("ul");
                var val = $.trim($(this).val());
                var type = $this.data("type");
                var url = type == "user"?AJAX_URL.GET_USER_LIST:AJAX_URL.GET_ORG_USER__LIST;
                if(val.length<=5) return;
                $.ajax({
                    type:"GET",
                    url:url+"?user_name="+val,
                    headers:{token:$.cookie("_at")},
                    success:function(res){
                        console.log(res);
                        if(res.status !=0) return;
                        var data = res.result.user_list;
                        $ul.show()
                            .html(my.returnUserList(data));
                        document.onkeydown = function(e){
                            if($ul.is(":hidden") == false) {
                                var max = data.length-1;
                                $ul.find("li").removeClass("active");
                                switch (e.keyCode) {
                                    case 38:
                                        if (chooseNumber == 0) {
                                            chooseNumber = 0;
                                        } else {
                                            chooseNumber--;
                                        }
                                        $ul.find("li").eq(chooseNumber).addClass("active");
                                        break;
                                    case 40:
                                        if(chooseNumber>=max){

                                        }else {
                                            chooseNumber++;
                                        }
                                        $ul.find("li").eq(chooseNumber).addClass("active");
                                        break;
                                    case 13:
                                        if(chooseNumber == -1){
                                            $ul.hide();
                                            chooseNumber = -1;
                                        }else {
                                            var txt = $ul.find("li").eq(chooseNumber).text();
                                            $this.val(txt == "暂无此用户"?"":txt);
                                            $ul.hide();
                                            chooseNumber = -1;
                                        }
                                        return false
                                        break;
                                    case 27:
                                        $ul.hide();
                                        chooseNumber = -1;
                                        break;
                                }
                            }else{
                                if(e.keyCode == 13){
                                    return false
                                }
                            }
                        }
                    }
                })
            });
            $("#setting-search-user").siblings("ul").on("click","li",function(){
                var txt = $(this).text();
                $("#setting-search-user").val(txt == "暂无此用户"?"":txt);
            })
        },
        returnUserList:function(data){
            if(!data.length) return '<li>暂无此用户</li>';
            var ul = "";
            for (var i in data){
                ul+='<li data-value = '+data[i].user_name+'>'+data[i].user_name+'</li>'
            }
            return ul;
        }
    };
    var setting = new Setting();
});
