import UserCenter from '../../components/User/UserCenter'
import {connect} from 'react-redux'
import {
  setBreadcrumbAction,
} from '../../actions/breadcumb'
import {
  fetchGithubAuthURLAction,
} from '../../actions/building';
import {makeGetGithubAuthURLSelector} from '../../selectors/BuildingCreateSelector';
import * as funUser from '../../actions/users';
import * as funOrganize from  '../../actions/organize';
import makeGetOrganizeListSelector from '../../selectors/organizeListSelector';

const mapStateToProps = (state) => {
  const getGithubAuthURL = makeGetGithubAuthURLSelector();
  const getOrganizeList = makeGetOrganizeListSelector();
  return {
    githubAuthURL: getGithubAuthURL(state),
    organizeList:getOrganizeList(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    getGithubAuthURL: () => {
      dispatch(fetchGithubAuthURLAction())
    },
    onRevisePassword:(passwordObj) =>{
      dispatch(funUser.fetchRevisePasswordAction(passwordObj))
    },
    createOrganize:(org_name) =>{
      dispatch(funOrganize.fetchCreateOrganize(org_name))
    },
    getOrganizeList:() =>{
      dispatch(funOrganize.fetchGetOrganizeListAction())
    },
    leaveOrganize:(data) =>{
      dispatch(funOrganize.fetchLeaveOrganize(data))
    },
    deleteOrganize:(data) =>{
      dispatch(funOrganize.fetchDeleteOrganize(data))
    }
  }
};

const UserCenterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCenter);

export default UserCenterContainer
