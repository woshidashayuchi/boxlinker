
import {connect} from 'react-redux';
import VolumeList from './VolumeList';
import * as volumeFetch from '../../actions/volumes';
import {
  setBreadcrumbAction,
} from '../../actions/breadcumb';
import {fetchGetCostsAction} from '../../actions/users';

const mapStateToProps = (state) => {
  return {
    volumesList:state.volumesList,
    isBtnState:state.isBtnState,
    modalState:state.modalState,
    costs:state.costs
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    setBreadcrumb: (...arr)=>{
      dispatch(setBreadcrumbAction(...arr))
    },
    onVolumesListLoad: (data) => {
      dispatch(volumeFetch.fetchVolumesListAction(data))
    },
    onVolumeCreate: (data,my,pageData) => {
      dispatch(volumeFetch.createVolume(data,my,pageData))
    },
    onVolumeDelete: (volumeId,pageData) => {
      dispatch(volumeFetch.deleteVolume(volumeId,pageData))
    },
    onVolumeScale: (data,my,pageData) => {
      dispatch(volumeFetch.scaleVolume(data,my,pageData))
    },
    onClearVolumesList:() => {
      dispatch(volumeFetch.refreshVolumeList())
    },
    getCosts: (data)=>{
      dispatch(fetchGetCostsAction(data))
    }

  }
};

const VolumeTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VolumeList);

export default VolumeTableContainer
