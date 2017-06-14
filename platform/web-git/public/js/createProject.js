$(function(){
	$("#projectUserSelect2,#addGitignore,#addLicense").select2();
	$("#projectName").bind('input propertychange',function(){
		var $projectName = $(this);
		var projectName = $.trim($projectName.val());
		var $projectNameTip = $("#projectNameTip");
        var $createProject = $("#createProject");
		if(projectName.length == 0){
			$projectName.parent().addClass("has-error");
			$projectNameTip.text(TIP.PROJECT.NULL);
            $createProject.prop("disabled",true);
            return false;
		}else if(!REX.NAME.test(projectName)){
			$projectName.parent().addClass("has-error");
			$projectNameTip.text(TIP.PROJECT.VALIDATE);
            $createProject.prop("disabled",true);
            return false;
		}else{
			$projectName.parent().removeClass("has-error");
			$projectNameTip.text("");
            $createProject.prop("disabled",false);
		}
	});

	// $("#createProject").click(function(){//创建项目
	// 	var $projectName = $("#projectName");
	// 	var projectName = $.trim($projectName.val());
	// 	var $projectNameTip = $("#projectNameTip");
	// 	if(projectName.length ==0){
	// 		$projectName.parent().addClass("has-error");
	// 		$projectNameTip.text(TIP.PROJECT.NULL);
   //          $projectName.focus();
   //          return false;
	// 	}else if(!REX.NAME.test(projectName)){
	// 		$projectName.parent().addClass("has-error");
	// 		$projectNameTip.text(TIP.PROJECT.VALIDATE);
   //          $projectName.focus();
   //          return false;
	// 	}else{
	// 		$projectName.parent().removeClass("has-error");
	// 		$projectNameTip.text("");
	// 	}
	// 	console.log("is ok");
	// })
});
