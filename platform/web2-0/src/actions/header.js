
import {IS_LOADING} from '../constants';
import * as Const from "../constants";

export function isLoadingAction (flag){
  return {
    type : IS_LOADING,
    payload : flag
  }
}
export function isModalAction(type,flag){
  return{
    type:type,
    payload:flag
  }
}
