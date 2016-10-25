import UserCenter from '../../components/User/UserCenter'
import {connect} from 'react-redux'
import {
  setBreadcrumbAction,
} from '../../actions/breadcumb'
import {
  fetchGithubAuthURLAction,
} from '../../actions/building';
import {makeGetGithubAuthURLSelector} from '../../selectors/BuildingCreateSelector';
import {fetchRevisePasswordAction} from '../../actions/users'

const mapStateToProps = (state) => {
  const s1 = makeGetGithubAuthURLSelector();
  return {
    githubAuthURL: s1(state),
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
    }
  }
};

const UserCenterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCenter);

export default UserCenterContainer
