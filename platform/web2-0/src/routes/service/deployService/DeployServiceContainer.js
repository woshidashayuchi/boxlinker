
import DeployService from './DeployService';
import {connect} from 'react-redux';
import {
  fetchDeployServiceAction,
} from '../../../actions/deployService';
import  * as deployServiceFetch from '../../../actions/deployService'
import { fetchVolumesListAction } from '../../../actions/volumes';
import { getCertificateCon } from '../../../actions/certificate';
import {
  setBreadcrumbAction,
} from '../../../actions/breadcumb'

const mapStateToProps = (state) => {
  return {
    volumeList:state.volumesList,
    certificateCon: state.certificateCon,
    deployData:state.deployData,
    isSidebarOpen:state.isSidebarOpen,
    isBtnState:state.isBtnState,
    costs:state.costs,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeployService : (data) => {
      dispatch(fetchDeployServiceAction(data));
    },
    onDeploySenior :(data) =>{
      dispatch(deployServiceFetch.deploySeniorAction(data))
    },
    onVolumeListLoad:(data)=>{
      dispatch(fetchVolumesListAction(data))
    },
    getCertificate:()=>{
      dispatch(getCertificateCon())
    },
    onAddPort:(port) =>{
      dispatch(deployServiceFetch.addPortAction(port))
    },
    onDelPort:(port)=>{
      dispatch(deployServiceFetch.delPortAction(port))
    },
    onAddSave:() =>{
      dispatch(deployServiceFetch.addSaveAction())
    },
    onDelSave:(item)=>{
      dispatch(deployServiceFetch.delSaveAction(item))
    },
    onAddEnv:() =>{
      dispatch(deployServiceFetch.addEnvAction())
    },
    onDelEnv:(item) => {
      dispatch(deployServiceFetch.delEnvAction(item))
    },
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    onClearDeployDetail:() =>{
      dispatch(deployServiceFetch.clearDeployData())
    },


  }
};

const DeployServiceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeployService);

export default DeployServiceContainer
