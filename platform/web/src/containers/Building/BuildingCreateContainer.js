import {connect} from 'react-redux'
import BuildingCreate from '../../components/Building/BuildingCreate'
import {
  fetchRepoListAction,
  fetchGetAuthURLLAction,
  fetchBuildingAction
} from '../../actions/building'
import makeGetReposSelector,{makeGetAuthURLSelector} from '../../selectors/BuildingCreateSelector'
import {
  setBreadcrumbAction,
} from '../../actions/breadcumb'
import makeIsBtnStateSelector from '../../selectors/isBtnStateSelector';

const mapStateToProps = (state) => {
  const selector = makeGetReposSelector();
  const getAuthURL = makeGetAuthURLSelector();
  const isBtnStateSelector = makeIsBtnStateSelector();
  return {
    repos: selector(state),
    authUrl: getAuthURL(state),
    isBtnState:isBtnStateSelector(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onReposLoad: (key,refresh) => {
      dispatch(fetchRepoListAction(key,refresh))
    },
    getAuthURL: (data) => {
      dispatch(fetchGetAuthURLLAction(data))
    },
    onBuilding:(data) =>{
      dispatch(fetchBuildingAction(data))
    },
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    }
  }
}

const BuildingCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingCreate)

export default BuildingCreateContainer

