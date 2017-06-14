import {connect} from 'react-redux'
import BuildingCreate from './BuildingCreate'
import * as buildFetch from '../../../actions/building';
import {setBreadcrumbAction} from '../../../actions/breadcumb'

const mapStateToProps = (state) => {
  return {
    repos:state.repos,
    authUrl:state.authUrl,
    isBtnState:state.isBtnState,
    createBuildData:state.createBuildData,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReposLoad: (data,refresh) => {
      dispatch(buildFetch.fetchRepoListAction(data,refresh))
    },
    getAuthURL: (data) => {
      dispatch(buildFetch.fetchGetAuthURLLAction(data))
    },
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    }
  }
};

const BuildingCreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingCreate);

export default BuildingCreateContainer

