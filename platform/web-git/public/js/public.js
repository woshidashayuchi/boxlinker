var TIP = {
	PROJECT:{
		NULL:"项目名称不能为空",
		VALIDATE:"字母数字下划线中划线,字母开头,最少 5 位",
        DELETE:"请输入正确的项目名称"
	},
	MILESTONE:{
		NULL:"里程碑名称不能为空",
		VALIDATE:"字母数字下划线汉字,字母或汉字开头最少 5 位",
		TIME:"截止时间不能为空"
	},
	ISSUE:{
		NULL:"任务名称不能为空",
	}
};
var AJAX_URL = {
    GET_USER_LIST:"https://ucenter.boxlinker.com/api/v1.0/ucenter/users",
    GET_ORG_USER__LIST:"https://ucenter.boxlinker.com/api/v1.0/ucenter/users",
    LOG_OUT_LIST:"https://ucenter.boxlinker.com/api/v1.0/ucenter/tokens"
};
var LABEL_COLOR = {
    COLOR:["#b60205"
    ,"#d93f0b","#fbca04","#0e8a16","#006b75","#1d76db","#0052cc","#5319e7",
        "#e99695","#f9d0c4","#fef2c0","#c2e0c6","#bfdadc","#c5def5","#bfd4f2","#d4c5f9"]
};
var REX = {
	NAME:/^[a-zA-Z]{1}[A-Za-z0-9_-]{4,19}$/,
    MILESTONE:/^[a-zA-Z]|[\u4e00-\u9fa5]{1}[A-Za-z0-9_]|[\u4e00-\u9fa5]{4,19}$/
};
