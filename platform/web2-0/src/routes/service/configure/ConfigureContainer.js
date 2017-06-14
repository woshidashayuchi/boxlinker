
import Configure from './Configure';
import {connect} from 'react-redux';
import {deployContainerAction,goToService,fetchRepeatServiceName} from '../../../actions/deployService';
import {setBreadcrumbAction} from '../../../actions/breadcumb';
import {fetchImageDetailAction} from '../../../actions/imageDetail';
import {fetchGetCostsAction} from '../../../actions/users';

const mapStateToProps = (state) => {
  return {
    deployData:state.deployData,
    isSidebarOpen:state.isSidebarOpen,
    imageDetail:state.imageDetail,
    costs:state.costs,
    repeatName:state.repeatName
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deployContainer:(data) =>{
      dispatch(deployContainerAction(data))
    },
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    onGoToService:() =>{
      dispatch(goToService())
    },
    getImageDetail:(id) => {
      dispatch(fetchImageDetailAction(id))
    },
    getCosts:(data) =>{
      dispatch(fetchGetCostsAction(data))
    },
    onRepeatServiceName:(name) =>{
      dispatch(fetchRepeatServiceName(name))
    }
  }
};

const ConfigureContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Configure);

export default ConfigureContainer
