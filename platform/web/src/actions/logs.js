
import {
  OPEN_LOG_XHR,
  ABORT_LOG_XHR,
  RECEIVE_LOG,
  FETCH_URL,
} from '../constants'

import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie'
// import {compare} from '../core/utils'

export function receiveLogs(data){
  return {
    type: RECEIVE_LOG,
    payload: data,
  }
}

export function openLogXHR(xhr){
  return {
    type: OPEN_LOG_XHR,
    payload: xhr,
  }
}

export function abortLogXHR(){
  return {
    type: ABORT_LOG_XHR
  }
}

function today(){
  let d = new Date();
  return `${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()}`
}
// var compare = function(a,b){
//   console.log(a,b)
//   let x = a.time;
//   let y = b.time;
//   if(x>y){
//     return 1
//   }
//   if(x<y){
//     return -1
//   }
//   if(x==y){
//     return 0
//   }
// };
//
// export function fetchLogs(logLabel = 'none'){
//   return dispatch => {
//     var xhr = new XMLHttpRequest()
//     xhr.open("get",`${FETCH_URL.LOGS}/${logLabel}`,true)
//     xhr.setRequestHeader("token", cookie.load("_at"))
//     var offset = 0;
//     xhr.onreadystatechange = function(){
//       if (xhr.readyState == 2){
//         dispatch(openLogXHR(xhr))
//       }
//       if (xhr.readyState == 3 && xhr.responseText) {
//         var s = xhr.responseText.substring(offset);
//         console.log('log string :> ',s);
//         if(s== "\n" || !s ) return
//         try{
//           var json = JSON.parse(s)
//           console.log('log :> ',json);
//           offset = xhr.responseText.length;
//           debugger
//           if (json.status == 0){
//
//             let data = json.result.logs_list;
//             data.sort(compare);
//             dispatch(receiveLogs(data))
//           }else {
//             console.error('fetch logs error: ',json)
//           }
//         } catch(e){
//           // console.error('fetch logs error: ',e)
//         }
//       }
//     };
//     xhr.onabort = function(){
//       console.error('fetch logs abort!!!!!!')
//       setTimeout(function(){
//         dispatch(fetchLogs(logLabel))
//       },100)
//     };
//
//     xhr.send(null);
//
//   }
// }
