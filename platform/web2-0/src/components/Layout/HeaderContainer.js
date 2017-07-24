
import {connect} from 'react-redux'
import {toggleSidebarAction} from '../../actions/toggleSidebar'
import Header from '../../components/Header';
import * as funOrganize from  '../../actions/organize';
import {cancel} from "../../actions/users";
import {fetchGetBalanceAction,fetchGetLevelsAction} from "../../actions/users";

const mapStateToProps = (state) => {
  return {
    isSidebarOpen:state.isSidebarOpen,
    isLoading: state.isLoading,
    organizeList:state.organizeList,
    user_info:state.user_info,
    token:state.token,
    organizeDetail:state.organizeDetail,
    balance:state.balance,
    levels:state.levels
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    onSidebarToggleClick: (flag) => {
      dispatch(toggleSidebarAction(flag))
    },
    getOrganizeList:() =>{
      dispatch(funOrganize.fetchGetOrganizeListAction())
    },
    changeAccount:(obj) =>{
      dispatch(funOrganize.fetchChangeAccountAction(obj))
    },
    onCancel:()=>{
      dispatch(cancel())
    },
    getOrganizeDetail:(id) =>{
      dispatch(funOrganize.fetchGetOrganizeDetailAction(id))
    },
    getBalance:() =>{
      dispatch(fetchGetBalanceAction())
    },
    getLevels:() =>{
      dispatch(fetchGetLevelsAction())
    }


  }
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer
