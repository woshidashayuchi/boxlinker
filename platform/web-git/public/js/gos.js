$(function(){
    var csrf = $('meta[name=_csrf]').attr("content");
    var Gogs = function(){
        this.init();
    };
    Gogs.prototype = {
        init:function(){
            /*移除提示信息*/
            if($(".floating-container").length){
                setTimeout(function(){
                    $(".floating-container").remove();
                },3000)
            }
            this.bindEvent();
        },
        bindEvent:function(){
            var _this = this;
            /*循环查询feeds*/
            // this.getFeeds();
            /*退出*/
            $(".logout").on("click",function(){
                $.ajax({
                    type:"delete",
                    url:AJAX_URL.LOG_OUT_LIST,
                    headers:{token:$.cookie("_at")},
                    success:function(res){
                        if(res.status == 0){
                            $.removeCookie("_at",{path:'/', domain:".boxlinker.com"});
                            window.location.href = "/"
                        }
                    },
                    error:function(){
                        console.log("退出失败")
                    }
                })
            });
            /*复制链接*/
            $(".clipboard").on("click",function(){
                $("#url").select();
                console.log($(this).data("success"),">>")
                $(this).attr("title",$(this).data("success"));
                $(".tooltip").find(".tooltip-inner").text($(this).data("success"));
                document.execCommand("Copy");
            });
            /*dashboard动态-点击图片放大*/
            $(".time_line_label_content").on("click","img",function(){
                var url = $(this).attr("src");
                var img = '<img src = '+url+' style = "margin:0 auto;display:block;">';
                bootbox.dialog({
                    title:"预览",
                    message:img
                })
            });
            /*issue评论-点击图片放大*/
            $(".summernote").on("click","img",function(){
                var url = $(this).attr("src");
                var img = '<img src = '+url+' style = "margin:0 auto;display:block;">';
                bootbox.dialog({
                    title:"预览",
                    message:img
                })
            });
            $("#content_type").select2();
            /*获取feeds 暂时不做*/
            $("#pullaction").on("click",function(){
                var time = (new Date().getTime()/1000).toFixed();
                var $form = $("#PullTime");
                var $newFeed = $(".newFeed");
                var $feedList = $newFeed.find(".newFeedList");
                var $icon = $newFeed.find(".feedIcon");
                $.ajax({
                    type:'POST',
                    url :$form.attr("action"),
                    data:{
                        "_csrf": csrf,
                        PullTime:Number(time)
                    },
                    success:function(res){
                        console.log(res,"获取feeds");
                        var data = res[0]||{};
                        if(!data.OpType) return;
                        $icon.addClass("ion-chatbubble-working text-danger");
                        $feedList.find(".no-message").remove();
                        $feedList.append(_this.returnFeed(data));
                    }
                });
            })
        },
        returnFeed:function(data){
            switch(data.OpType){
                case 13 :
                    return '<li class = "message"><a href = "javascript:;">'+data.ActUserName+'更新了项目'+data.RepoName+'</a></li>';
                default :
                    return '<li class = "message"><a href = "javascript:;">'+data.ActUserName+'更新了'+data.RepoName+'</a></li>';
            }

        },
        getFeeds:function(){
            var _this = this;
            setInterval(function(){
                var time = (new Date().getTime()/1000).toFixed();
                var $form = $("#PullTime");
                var $newFeed = $(".newFeed");
                var $feedList = $newFeed.find(".newFeedList");
                var $icon = $newFeed.find(".feedIcon");
                $.ajax({
                    type:'POST',
                    url :$form.attr("action"),
                    data:{
                        "_csrf": csrf,
                        PullTime:Number(time)
                    },
                    success:function(res){
                        console.log(res,"获取feeds");
                        var data = res[0]||{};
                        if(!data.OpType) return;
                        $icon.addClass("ion-chatbubble-working text-danger");
                        $feedList.find(".no-message").remove();
                        $feedList.append(_this.returnFeed(data));
                    }
                });
            },3000)
        }
    };
    var gogs = new Gogs();
});
