

$(function () {
  var w_w=window.innerWidth;
  if(document.compatMode=="CSS1Compat"){
    w_w=document.documentElement.clientWidth;
  }else{
    w_w=document.body.clientWidth;
  }
  var _fod=w_w/6.4;
  document.getElementsByTagName("html")[0].style.fontSize=_fod+"px";
})
