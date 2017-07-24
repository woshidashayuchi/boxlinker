import OrgInfo from './OrgInfo';
import {connect} from 'react-redux'
import {
  setBreadcrumbAction,
} from '../../../actions/breadcumb';
import {fetchGetAuthURLLAction} from '../../../actions/building';
import * as fun from '../../../actions/organize';
import * as funUser from "../../../actions/users";
const mapStateToProps = (state) => {
  return {
    organizeDetail:state.organizeDetail,
    organizeUserList:state.organizeUserList,
    userList:state.userList,
    isBtnState:state.isBtnState,
    modalState:state.modalState,
    token:state.token,
    roleList:state.roleList,
    roleDetail:state.roleDetail,
    organizeList:state.organizeList,
    oauth:state.oauth,
    authUrl: state.authUrl,
    balance:state.balance,
    levels:state.levels
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    getOrganizeDetail:(id) =>{
      dispatch(fun.fetchGetOrganizeDetailAction(id))
    },
    setOrganizeDetail:(data) => {
      dispatch(fun.fetchSetOrganizeDetailAction(data))
    },
    getOrganizeUserList:(data) =>{
      dispatch(fun.fetchGetOrganizeUserListAction(data))
    },
    getUserList:(name) =>{
      dispatch(fun.fetchGetUserListAction(name))
    },
    inviteUser:(data,pageData) =>{
      dispatch(fun.fetchInviteUser(data,pageData))
    },
    changeUserRole:(data,pageData) =>{
      dispatch(fun.fetchChangeUserRoleAction(data,pageData))
    },
    changeOrganizeOwner:(data) =>{
      dispatch(fun.fetchChangeOrganizeOwnerAction(data))
    },
    deleteOrganize:(data) =>{
      dispatch(fun.fetchDeleteOrganize(data))
    },
    leaveOrganize:(data,pageData) =>{
      dispatch(fun.fetchLeaveOrganizeAction(data,pageData))
    },
    getRoleList:() =>{
      dispatch(fun.fetchGetRoleList())
    },
    onCreateRole:(data,my) =>{
      dispatch(fun.fetchCreateRole(data,my))
    },
    onDeleteRole:(id) =>{
      dispatch(fun.fetchDeleteRole(id))
    },
    onSetRole:(obj,my) =>{
      dispatch(fun.fetchSetRole(obj,my))
    },
    onGetRoleDetail:(id) =>{
      dispatch(fun.fetchGetRoleDetail(id))
    },
    clearRoleDetail:()=>{
      dispatch(fun.clearRoleDetail())
    },
    getOrganizeList:() =>{
      dispatch(fun.fetchGetOrganizeListAction())
    },
    getAuthURL: (data) => {
      dispatch(fetchGetAuthURLLAction(data))
    },
    relieveBinding:(data) =>{
      dispatch(funUser.fetchRelieveBindingAction(data))
    },
    getBalance:() =>{
      dispatch(funUser.fetchGetBalanceAction())
    }
  }
};

const OrgInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrgInfo);

export default OrgInfoContainer
