$(function(){
	$("#chooseBranch").select2();
    $("#chooseBranch").bind("change",function(){
        var url = $(this).val();
        window.location.href = url;
    });
    $("#httpUrl").bind("click",function(){
        $(this).addClass("btn-primary");
        $("#sshUrl").removeClass("btn-primary");
        $("#url").val($(this).data("link"));
    });
    $("#sshUrl").bind("click",function(){
        $(this).addClass("btn-primary");
        $("#httpUrl").removeClass("btn-primary");
        $("#url").val($(this).data("link"));
    });
    $("#downloadTab").bind("click",function(event){
        event.stopPropagation();
    });
});
