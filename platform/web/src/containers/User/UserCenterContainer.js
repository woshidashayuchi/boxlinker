import UserCenter from '../../components/User/UserCenter'
import {connect} from 'react-redux'
import {
  setBreadcrumbAction,
} from '../../actions/breadcumb'
import {
  fetchGithubAuthURLAction,
} from '../../actions/building';
import {makeGetGithubAuthURLSelector} from '../../selectors/BuildingCreateSelector';
import {
  fetchRevisePasswordAction,
    fetchCreateOrganize,
    fetchGetOrganizeListAction
} from '../../actions/users';
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
      dispatch(fetchRevisePasswordAction(passwordObj))
    },
    createOrganize:(org_name) =>{
      dispatch(fetchCreateOrganize(org_name))
    },
    getOrganizeList:() =>{
      dispatch(fetchGetOrganizeListAction())
    }
  }
};

const UserCenterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCenter);

export default UserCenterContainer
