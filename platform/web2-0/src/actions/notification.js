
import {RECEIVE_NOTIFICATION,CLEAR_NOTIFICATION} from '../constants';

export const receiveNotification = (data) => {
  return {
    type: RECEIVE_NOTIFICATION,
    payload: data,
  }
};

export const clearNotification = ()=>{
  return {
    type: CLEAR_NOTIFICATION
  }
};

