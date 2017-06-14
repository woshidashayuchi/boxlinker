$(function(){
    var csrf = $('meta[name=_csrf]').attr("content");
    var IssueInfo = function(){
        this.init();
    };
    IssueInfo.prototype = {
        init:function(){
            this.bindInit();
            this.issueLeftForm();/*左侧form提交*/
        },
        bindInit:function(){
            $(".summernoteBottom").summernote({
                height : '200px',
                placeholder:"请输入您的评论...",
                callbacks: {
                    onChange: function(contents, $editable) {
                        if(contents == '<p><br></p>'){
                            $("#issueEditorSave").prop("disabled",true);
                        }else{
                            $("#issueEditorSave").prop("disabled",false);
                        }
                    },
                    // onImageUpload:function(files){
                    //     console.log(files[0]);
                    //     var imgNode = "<img src = '' />";
                    //     $(".summernoteBottom").summernote('insertNode', imgNode);
                    // }
                }
            });
            $(".issueEditor").bind("click",function(){//编辑
                var $parent = $(this).parents(".issueItem");
                var $summernote = $parent.find(".summernote");
                var $summernoteBtn = $parent.find(".summernoteBtn");
                if($summernoteBtn.is(":hidden")){
                    $summernoteBtn.show();
                    $summernote.summernote({
                        height : '200px'
                    });
                }else{
                    $summernoteBtn.hide();
                    $summernote.summernote('destroy');
                }
            });
            $(".issueEditorCancel").bind("click",function(){//取消
                var $parent = $(this).parents(".issueItem");
                var $summernote = $parent.find(".summernote");
                var $summernoteBtn = $parent.find(".summernoteBtn");
                $summernoteBtn.hide();
                $summernote.summernote('destroy');
            });
            $(".issueEditorSave").bind("click",function(){//保存
                var url = $(this).data("url");
                var $parent = $(this).parents(".issueItem");
                var $summernote = $parent.find(".summernote");
                var content = $summernote.summernote('code');
                console.log(content);
                $.ajax({
                    type:"POST",
                    url:url,
                    data:{
                        "_csrf": csrf,
                        content:content
                    },
                    success:function(res){
                        $.niftyNoty({
                            type: 'success',
                            icon : 'pli-cross icon-2x',
                            message : '编辑成功。',
                            container : 'floating',
                            timer : 1000,
                            onHide:function(){
                                window.location.reload();
                            }
                        });
                    },
                    error:function(){
                        $.niftyNoty({
                            type: 'danger',
                            icon : 'pli-cross icon-2x',
                            message : '编辑失败,请重试',
                            container : 'floating',
                            timer : 3000
                        });
                    }
                });
                // $summernote.summernote('destroy');
            });

            /*删除评论*/
            $(".delete-comment").on("click",function(){
                var url = $(this).data("url");
                bootbox.confirm("确定删除此评论?", function(result) {
                    if (result) {
                        $.ajax({
                            type:"POST",
                            url:url,
                            data:{
                                "_csrf": csrf
                            },
                            success:function(res){
                                $.niftyNoty({
                                    type: 'success',
                                    icon : 'pli-cross icon-2x',
                                    message : '删除成功',
                                    container : 'floating',
                                    timer : 1000,
                                    onHide:function(){
                                        window.location.reload();
                                    }
                                });
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
            })
        },
        issueLeftForm:function(){/*左侧form提交*/
            var $labelMenu = $('.select-label .menu');
            var hasLabelUpdateAction = $labelMenu.data('action') == 'update';
            function updateIssueMeta(url, action, id) {
                $.ajax({
                    type:"POST",
                    url:url,
                    data: {
                        "_csrf": csrf,
                        "action": action,
                        "id": id
                    },
                    success:function(){
                        location.reload();
                    }
                });
            }
            $labelMenu.find('.item:not(.no-select)').click(function () {
                if ($(this).hasClass('checked')) {
                    $(this).removeClass('checked');
                    $(this).find('.octicon').removeClass('octicon-check').html('&nbsp;');
                    if (hasLabelUpdateAction) {
                        updateIssueMeta($labelMenu.data('update-url'), "detach", $(this).data('id'));
                    }
                } else {
                    $(this).addClass('checked');
                    $(this).find('.octicon').addClass('octicon-check').html('');
                    if (hasLabelUpdateAction) {
                        updateIssueMeta($labelMenu.data('update-url'), "attach", $(this).data('id'));
                    }
                }
                // var labelIds = "";
                // $(this).parent().find('.item').each(function () {
                //     if ($(this).hasClass('checked')) {
                //         labelIds += $(this).data('id') + ",";
                //         $($(this).data('id-selector')).removeClass('hide');
                //     } else {
                //         $($(this).data('id-selector')).addClass('hide');
                //     }
                // });
                // if (labelIds.length == 0) {
                //     $noSelect.removeClass('hide');
                // } else {
                //     $noSelect.addClass('hide');
                // }
                // $($(this).parent().data('id')).val(labelIds);
            });
            $labelMenu.find('.no-select.item').click(function () {
                if (hasLabelUpdateAction) {
                    updateIssueMeta($labelMenu.data('update-url'), "clear", '');
                }
            });

            function selectItem(select_id, input_id) {
                var $menu = $(select_id + ' .menu');
                var $list = $('.ui' + select_id + '.list');
                var hasUpdateAction = $menu.data('action') == 'update';

                $menu.find('.item:not(.no-select)').click(function () {
                    $(this).parent().find('.item').each(function () {
                        $(this).removeClass('selected active')
                    });

                    $(this).addClass('selected active');
                    if (hasUpdateAction) {
                        updateIssueMeta($menu.data('update-url'), '', $(this).data('id'));
                    }
                });
                $menu.find('.no-select.item').click(function () {
                    $(this).parent().find('.item:not(.no-select)').each(function () {
                        $(this).removeClass('selected active')
                    });
                    if (hasUpdateAction) {
                        updateIssueMeta($menu.data('update-url'), '', '');
                    }
                });
            }
            // Milestone and assignee and import and state
            selectItem('.select-milestone', '#milestone_id');
            selectItem('.select-assignee', '#assignee_id');
            selectItem('.select-import', '#assignee_id');
            selectItem('.select-state', '#assignee_id');
        },
        loadImageUrl:function(){

        }
    };
    var issueInfo = new IssueInfo();
});















