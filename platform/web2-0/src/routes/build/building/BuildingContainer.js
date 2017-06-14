import Building from './Building'
import {connect} from 'react-redux'
import * as fetchBuild from '../../../actions/building';
import {setBreadcrumbAction} from '../../../actions/breadcumb';

const mapStateToProps = (state) => {
  return {
    repos: state.repos,
    authUrl:state.authUrl,
    buildingImageList: state.buildingImageList,
    isBtnState:state.isBtnState,
    modalState:state.modalState,
    oauth:state.oauth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onImageList: (data)=>{
      dispatch(fetchBuild.fetchBuildProjectsListAction(data))
    },
    onFastBuilding:(data,flag) => {
      dispatch(fetchBuild.fetchOnBuildingAction(data,flag));
    },
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    onClearImageList:() => {
      dispatch(fetchBuild.refreshBuildingList())
    },
    onDeleteBuild:(data,my) =>{
      dispatch(fetchBuild.fetchDeleteProjectAction(data,my))
    },
    onReposLoad: (data,refresh) => {
      dispatch(fetchBuild.fetchRepoListAction(data,refresh))
    },
    getAuthURL: (data) => {
      dispatch(fetchBuild.fetchGetAuthURLLAction(data))
    },
    buildProjects:(data,page,my) =>{
      dispatch(fetchBuild.fetchBuildProjectsAction(data,page,my))
    },
    setCreateBuildData:(data) =>{
      dispatch(fetchBuild.setCreateBuildDataAction(data))
    },
    getBuildBranch:(id) =>{
      dispatch(fetchBuild.fetchGetBuildBranchAction(id))
    }
  }
};

const BuildingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Building);

export default BuildingContainer
