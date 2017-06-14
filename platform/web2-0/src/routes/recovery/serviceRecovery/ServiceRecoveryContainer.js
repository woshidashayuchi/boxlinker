
import ServiceRecovery from './ServiceRecovery';
import {connect} from 'react-redux';
import * as fetchRecovery from '../../../actions/recovery';
import {setBreadcrumbAction} from '../../../actions/breadcumb';

const mapStateToProps = (state) =>{
  return {
    serviceRecoveryList: state.serviceRecovery,
    modalState:state.modalState
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    onServiceListLoad : (txt)=>{
      dispatch(fetchRecovery.fetchAllServicesAction(txt))
    },
    onDeleteServiceRecovery : (data,pageData) => {
      dispatch(fetchRecovery.deleteServiceRecoveryAction(data,pageData))
    },
    onReductionService:(data,type,pageData) => {
      dispatch(fetchRecovery.reductionStateAction(data,pageData))
    },
    onRefreshServiceList:() => {
      dispatch(fetchRecovery.refreshServiceList())
    }
  }
};

const ServiceRecoveryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceRecovery);

export default ServiceRecoveryContainer
