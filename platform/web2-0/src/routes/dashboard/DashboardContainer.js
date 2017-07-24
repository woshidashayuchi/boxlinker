import Dashboard from './Dashboard'
import {connect} from 'react-redux'
import {setBreadcrumbAction} from '../../actions/breadcumb'
import {fetchAllServicesAction} from '../../actions/services';
import {fetchImageListAction } from "../../actions/imageList";
import {fetchVolumesListAction} from '../../actions/volumes';
import {fetchGetDashboardAction} from "../../actions/dashboard";

const mapStateToProps = (state) => {
  return {
    serviceList:state.serviceList,
    imageList :state.imageList,
    volumesList: state.volumesList,
    dashboard:state.dashboard,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onServiceListLoad : (txt)=>{
      dispatch(fetchAllServicesAction(txt))
    },
    onImageListLoad : (data) => {
      dispatch(fetchImageListAction(data));
    },
    onVolumesListLoad: (data) => {
      dispatch(fetchVolumesListAction(data))
    },
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    onDashboardLoad:() =>{
      dispatch(fetchGetDashboardAction())
    }
  }
};

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer
