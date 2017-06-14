import BuildingDetail from './BuildingDetail'
import {connect} from 'react-redux'
import {
  setBreadcrumbAction,
} from '../../../actions/breadcumb';
import * as fetchBuild from '../../../actions/building';

const mapStateToProps = (state) => {
  return {
    isBtnState:state.isBtnState,
    buildHistory:state.buildHistory,
    buildBranchHistory:state.buildBranchHistory,
    buildProjectsDetail:state.buildProjectsDetail,
    buildBranch:state.buildBranch,
    buildingDetail:state.buildingDetail,
    otherHistory:state.otherHistory,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    getBuildProjectsDetail:(id) => {
      dispatch(fetchBuild.fetchBuildProjectsDetail(id))
    },
    getBuildHistory:(data) =>{
      dispatch(fetchBuild.fetchBuildHistoryAction(data))
    },
    getBuildBranchHistory:(data) =>{
      dispatch(fetchBuild.fetchBuildBranchHistoryAction(data))
    },
    getBuildBranch:(id) =>{
      dispatch(fetchBuild.fetchGetBuildBranchAction(id))
    },
    getBuildingDetail:(id) =>{
      dispatch(fetchBuild.fetchBuildDetail(id))
    }
  }
};

const BuildingDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingDetail);

export default BuildingDetailContainer
