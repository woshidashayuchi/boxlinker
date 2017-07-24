
import ServiceList from './ServiceList'
import {connect} from 'react-redux'
import * as fetchService from '../../../actions/services';
import {setBreadcrumbAction} from '../../../actions/breadcumb';

const mapStateToProps = (state) => {
  return {
    serviceList: state.serviceList,
    modalState:state.modalState
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    onServiceListLoad : (txt)=>{
      dispatch(fetchService.fetchAllServicesAction(txt))
    },
    onDeleteService : (data,pageData) => {
      dispatch(fetchService.fetchDeleteServiceAction(data,pageData))
    },
    onChangeState:(data,type,pageData) => {
      dispatch(fetchService.fetchChangeStateAction(data,type,pageData))
    },
    onRefreshServiceList:() => {
      dispatch(fetchService.refreshServiceList())
    }
  }
};

const ServiceListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceList);

export default ServiceListContainer
