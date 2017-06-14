
import ServiceDetail from './ServiceDetail';
import {connect} from 'react-redux';
import {fetchChangeStateAction,fetchDeleteServiceAction} from '../../../actions/services'
import * as serviceDetailFetch from '../../../actions/serviceDetail'
import { fetchVolumesListAction } from '../../../actions/volumes';
import { getCertificateCon } from '../../../actions/certificate';
import {setBreadcrumbAction} from '../../../actions/breadcumb';
import {fetchImageDetailAction,fetchServiceForImageAction} from '../../../actions/imageDetail';
import {clearDeployData} from "../../../actions/deployService";

const makeMapStateToProps = () => {
  const mapStateToProps = (state) => {
    return {
      serviceDetail : state.serviceDetail,
      volumeList:  state.volumesList,
      certificateCon: state.certificateCon,
      notifications:  state.notifications,
      podList: state.podList,
      isBtnState: state.isBtnState,
      imageDetail: state.imageDetail,
      modalState: state.modalState,
      serviceForImage:state.serviceForImage,
      repeatName:state.repeatName,
      consoleUrl:state.consoleUrl
    }
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onServiceDetailLoad : (uuid,state) => {
      dispatch(serviceDetailFetch.fetchServiceDetailAction(uuid,state));
    },
    onSavePort: (data) => {
      dispatch(serviceDetailFetch.fetchSavePortAction(data))
    },
    onSaveVolume:(data) => {
      dispatch(serviceDetailFetch.fetchSaveVolumeAction(data))
    },
    onModifyDescribe:(data) => {
      dispatch(serviceDetailFetch.fetchModifyVolumeAction(data))
    },
    onSaveEnvironment:(data) => {
      dispatch(serviceDetailFetch.fetchSaveEnvironmentAction(data))
    },
    onVolumeListLoad:(data)=>{
      dispatch(fetchVolumesListAction(data))
    },
    getCertificate:()=>{
      dispatch(getCertificateCon())
    },
    onSaveContainerDeploy:(data,my) =>{
      dispatch(serviceDetailFetch.fetchSaveContainerDeployAction(data,my))
    },
    onAddPort:(port) =>{
      dispatch(serviceDetailFetch.addPortAction(port))
    },
    onDelPort:(port)=>{
      dispatch(serviceDetailFetch.delPortAction(port))
    },
    onAddSave:() =>{
      dispatch(serviceDetailFetch.addSaveAction())
    },
    onDelSave:(item)=>{
      dispatch(serviceDetailFetch.delSaveAction(item))
    },
    onAddEnv:() =>{
      dispatch(serviceDetailFetch.addEnvAction())
    },
    onDelEnv:(item) => {
      dispatch(serviceDetailFetch.delEnvAction(item))
    },
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    onClearServiceDetail:() => {
      dispatch(serviceDetailFetch.clearServiceDetail())
    },
    onSavePods:(data) => {
      dispatch(serviceDetailFetch.onSavePodsAction(data))
    },
    onPodListLoad:(name) =>{
      dispatch(serviceDetailFetch.fetchOnPodListLoadAction(name))
    },
    onChangeState:(data) => {
      dispatch(fetchChangeStateAction(data))
    },
    onAutoStateUp:(data) => {
      dispatch(serviceDetailFetch.fetchAutoStateUp(data))
    },
    getImageDetail:(id) => {
      dispatch(fetchImageDetailAction(id))
    },
    onChangePolicy:(data) =>{
      dispatch(serviceDetailFetch.fetchChangePolicyAction(data))
    },
    onSaveCommand:(data) =>{
      dispatch(serviceDetailFetch.fetchSaveCommand(data))
    },
    onDeleteService : (data) => {
      dispatch(fetchDeleteServiceAction(data))
    },
    onSaveDomain:(data) =>{
      dispatch(serviceDetailFetch.fetchSaveDomain(data))
    },
    onClearDeployDetail:() =>{
      dispatch(clearDeployData())
    },
    getServiceForImage:(id) =>{
      dispatch(fetchServiceForImageAction(id))
    },
    onRepeatDomainName:(name) =>{
      dispatch(serviceDetailFetch.fetchRepeatDomainName(name))
    },
    getConsoleUrl:() =>{
      dispatch(serviceDetailFetch.fetchGetConsoleUrlAction())
    }
  }
};

const ServiceDetailContainer = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(ServiceDetail);

export default ServiceDetailContainer
