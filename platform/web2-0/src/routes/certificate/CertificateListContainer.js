
import {connect} from 'react-redux';
import CertificateList from './CertificateList';
import * as certificateFetch from '../../actions/certificate';
import {
  setBreadcrumbAction,
} from '../../actions/breadcumb';
import {fetchGetCostsAction} from '../../actions/users';

const mapStateToProps = (state) => {
  return {
    isBtnState:state.isBtnState,
    modalState:state.modalState,
    certificateList:state.certificateCon,
    costs:state.costs
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    setBreadcrumb: (...arr)=>{
      dispatch(setBreadcrumbAction(...arr))
    },
    onGetCertificate: () => {
      dispatch(certificateFetch.getCertificateCon())
    },
    onCertificateCreate: (data,my) => {
      dispatch(certificateFetch.createCertificate(data,my))
    },
    onCertificateUp: (data,id) => {
      dispatch(certificateFetch.upCertificate(data,id))
    }
  }
};

const CertificateTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CertificateList);

export default CertificateTableContainer
