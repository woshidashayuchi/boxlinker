$(function(){
  // 退出
  $('#quit').click(function(){
    $.removeCookie('_at', { path: '/' , domain: location.hostname});
    location.reload()
  })
})
