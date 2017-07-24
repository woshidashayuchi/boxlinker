import UserCenter from './UserInfo'
import {connect} from 'react-redux'
import {setBreadcrumbAction} from '../../../actions/breadcumb'
import {fetchGetAuthURLLAction} from '../../../actions/building';
import * as funUser from '../../../actions/users';
import * as funOrganize from  '../../../actions/organize';

const mapStateToProps = (state) => {
  return {
    authUrl: state.authUrl,
    organizeList:state.organizeList,
    modalState:state.modalState,
    token:state.token,
    organizeDetail:state.organizeDetail,
    isBtnState:state.isBtnState,
    oauth:state.oauth,
    levels:state.levels,
    balance:state.balance,
    limits:state.limits,
    repeatName:state.repeatName,
    recharges:state.recharges,
    switchRecharges:state.switchRecharges
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    getAuthURL: (data) => {
      dispatch(fetchGetAuthURLLAction(data))
    },
    onRevisePassword:(passwordObj) =>{
      dispatch(funUser.fetchRevisePasswordAction(passwordObj))
    },
    createOrganize:(data,my) =>{
      dispatch(funOrganize.fetchCreateOrganize(data,my))
    },
    getOrganizeList:() =>{
      dispatch(funOrganize.fetchGetOrganizeListAction())
    },
    leaveOrganize:(data) =>{
      dispatch(funOrganize.fetchLeaveOrganizeAction(data))
    },
    deleteOrganize:(data) =>{
      dispatch(funOrganize.fetchDeleteOrganize(data))
    },
    relieveBinding:(data) =>{
      dispatch(funUser.fetchRelieveBindingAction(data))
    },
    getOrganizeDetail:(id) =>{
      dispatch(funOrganize.fetchGetOrganizeDetailAction(id))
    },
    getBalance:() =>{
      dispatch(funUser.fetchGetBalanceAction())
    },
    getLimits:() =>{
      dispatch(funUser.fetchGetLimitsAction())
    },
    onRepeatOrganizeName:(name)=>{
      dispatch(funOrganize.fetchRepeatOrganizeName(name))
    },
    getRecharge:(data) =>{
      dispatch(funUser.fetchGetRechargesAction(data))
    },
    getSwitchRecharges:(data) =>{
      dispatch(funUser.fetchSwitchRechargesAction(data))
    }

  }
};

const UserCenterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCenter);

export default UserCenterContainer
