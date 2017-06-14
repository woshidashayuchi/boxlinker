
const MIN = 60*1000;
const HOUR = 60*MIN;
const DAY = 24*HOUR;
const MONTH = 31*DAY;
const YEAR = 365*DAY;


export function timeRange(date){
  if (!date) return "N/A"
  let _t = new Date().getTime() - new Date(date).getTime()
  if (!_t) return "N/A"
  if (_t < MIN) return "1分钟内"
  if (_t < HOUR) {
    return Math.ceil(_t/MIN)+"分钟前"
  }
  if (_t < DAY) return Math.ceil(_t/HOUR)+"小时前"
  if (_t < MONTH) return Math.ceil(_t/DAY)+"天前"
  if (_t < YEAR) return Math.ceil(_t/MONTH)+"月前"
  if (_t >= YEAR) return Math.ceil(_t/YEAR)+"年前"
}

export function timeFormat(times,flag){
  if (times == null) return "--";
  if (times == "") return "";
  let date = new Date(times)
  if (!date) return "N/A";
  let year = date.getFullYear();
  let month = (date.getMonth()+1)>=10?(date.getMonth()+1):"0"+(date.getMonth()+1);
  let today = date.getDate()>=10?date.getDate():"0"+date.getDate();
  let hours = date.getHours()>=10?date.getHours():"0"+date.getHours();
  let minutes = date.getMinutes()>=10?date.getMinutes():"0"+date.getMinutes();
  let seconds = date.getSeconds()>=10?date.getSeconds():"0"+date.getSeconds();
  switch (flag){
    case "hh:mm":
      return hours+":"+minutes;
      break;
    case "hh:mm:ss":
      return hours+":"+minutes+":"+seconds;
      break;
    default:
      return year+"-"+month+"-"+today+" "+hours+":"+minutes+":"+seconds
  }
}
export function timeSubtraction(stateTime,completTime){
  if(!stateTime || !completTime) return "--";
  let time1 = new Date(stateTime).getTime();
  let time2 = new Date(completTime).getTime();
  return Math.floor((time2 - time1)/1000);
}
export function offConsole(){
  window.console.log = function(str){
    return false;
  };
}

export function yesterdayTime(){
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth()+1>=10?today.getMonth()+1:"0"+(today.getMonth()+1);
  let date = today.getDate()>=10?today.getDate():"0"+today.getDate();
  let end = year+"-"+month+"-"+date;
  let yesTodayTime = new Date(end+" 00:00:00").getTime() - 24*60*60*1000;
  let yesToday = new Date(yesTodayTime);
  let prevDate = yesToday.getDate()>=10?yesToday.getDate():"0"+yesToday.getDate();
  let prevMonth = yesToday.getMonth()+1>=10?yesToday.getMonth()+1:"0"+(yesToday.getMonth()+1);
  let prevYear = yesToday.getFullYear();
  let start = prevYear+"-"+prevMonth+"-"+prevDate;
  let start_time = new Date(start+" 00:00:00").getTime()/1000;
  let end_time = (new Date(end+" 00:00:00").getTime()-1000)/1000;
  return {
    start_time:start_time,
    end_time:end_time,
    start:start
  }
}
