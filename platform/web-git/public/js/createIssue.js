$(function(){
    var CreateIssue = function(){
        this.init();
    };
    CreateIssue.prototype = {
        init:function(){
            this.bindEvents();
            $(".dome_select2").select2({
                // templateResult: this.formatState
            });
        },
        formatState:function(state){
            var backgroundColor = $(state.element).data("background-color");
            if (!state.id) { return state.text; }
            var $state = $(
                '<span class="label color" style="background-color:'+backgroundColor+'">' + state.text + '</span>'
            );
            return $state;
        },
        bindEvents:function(){
            $("#urgency,#milestone,#appoint").select2();
            /*任务名称on input*/
            $("#issueName").bind("input propertychange",function(){
                var $issueName = $(this);
                var issueName = $.trim($issueName.val());
                var $issueNameTip = $("#issueNameTip");
                if(issueName.length == 0){
                    $issueName.parent().addClass("has-error");
                    $issueNameTip.text(TIP.ISSUE.NULL);
                }else{
                    $issueName.parent().removeClass("has-error");
                    $issueNameTip.text("");
                }
            });
            /*创建任务*/
            $("#createIssue").click(function(){
                var $issueName = $("#issueName");
                var issueName = $.trim($issueName.val());
                var $issueNameTip = $("#issueNameTip");
                if(issueName.length == 0){
                    $issueName.parent().addClass("has-error");
                    $issueNameTip.text(TIP.ISSUE.NULL);
                    $issueName.focus();
                    return false;
                }else{
                    $issueName.parent().removeClass("has-error");
                    $issueNameTip.text("");
                }
            })
        }
    };
    var createIssue = new CreateIssue();
});















