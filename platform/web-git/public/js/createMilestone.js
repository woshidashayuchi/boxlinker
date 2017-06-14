$(function(){
    if(!$("#milestoneTime").length) return;
    laydate({
      elem: '#milestoneTime',
      event: 'click',
      format:"YYYY-MM-DD"
    });
	$("#milestoneName").bind("input propertychange",function(){
		var $milestoneName = $(this);
		var milestoneName = $.trim($milestoneName.val());
		var $milestoneNameTip = $("#milestoneNameTip");
		if(milestoneName.length ==0){
			$milestoneName.parent().addClass("has-error");
			$milestoneNameTip.text(TIP.MILESTONE.NULL);
            return;
		}else if(!REX.MILESTONE.test(milestoneName)){
			$milestoneName.parent().addClass("has-error");
			$milestoneNameTip.text(TIP.MILESTONE.VALIDATE);
            return;
		}else{
			$milestoneName.parent().removeClass("has-error");
			$milestoneNameTip.text("");
		}
		$("#createMilestone").prop("disabled",false);
	});
	$("#milestoneTime").bind("blur",function(){
		var my = $(this);
		setTimeout(function(){
			var $milestoneTime = my;
			var milestoneTime = $.trim($milestoneTime.val());
			var $milestoneTimeTip = $("#milestoneTimeTip");
			if(milestoneTime.length ==0){
				$milestoneTime.parent().addClass("has-error");
				$milestoneTimeTip.text(TIP.MILESTONE.TIME);
				return false
			}else{
				$milestoneTime.parent().removeClass("has-error");
				$milestoneTimeTip.text("");
			}
		},200);
        $("#createMilestone").prop("disabled",false);
	});
    $("#milestoneContent").bind("input propertychange",function(){
        $("#createMilestone").prop("disabled",false);
    });
	$("#createMilestone").click(function(){
		var $milestoneName = $("#milestoneName");
		var milestoneName = $.trim($milestoneName.val());
		var $milestoneNameTip = $("#milestoneNameTip");
		var $milestoneTime = $("#milestoneTime");
		var milestoneTime = $.trim($milestoneTime.val());
		var $milestoneTimeTip = $("#milestoneTimeTip");
		if(milestoneName.length ==0){
			$milestoneName.parent().addClass("has-error");
			$milestoneNameTip.text(TIP.MILESTONE.NULL);
			return false
		}else if(!REX.MILESTONE.test(milestoneName)){
			$milestoneName.parent().addClass("has-error");
			$milestoneNameTip.text(TIP.MILESTONE.VALIDATE);
			return false
		}else{
			$milestoneName.parent().removeClass("has-error");
			$milestoneNameTip.text("");
		}

		if(milestoneTime.length ==0){
			$milestoneTime.parent().addClass("has-error");
			$milestoneTimeTip.text(TIP.MILESTONE.TIME);
			return false
		}else{
			$milestoneTime.parent().removeClass("has-error");
			$milestoneTimeTip.text("");
		}
		console.log("is ok")
	})
});















