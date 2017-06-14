import ImageDetail from "./ImageDetail";
import {connect} from 'react-redux';
import * as imageFetch from '../../../actions/imageDetail';
import {fetchDeleteImageAction} from '../../../actions/imageList';
import {setBreadcrumbAction} from '../../../actions/breadcumb';
import {goToConfigContainer} from '../../../actions/deployService';

const mapStateToProps = (state) => {
  return {
    imageDetail:state.imageDetail,
    isBtnState:state.isBtnState,
    modalState:state.modalState,
    token:state.token
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getImageDetail : (id)=>{
      dispatch(imageFetch.fetchImageDetailAction(id))
    },
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    onDeleteImage:(data) =>{
      dispatch(fetchDeleteImageAction(data))
    },
    goToConfigContainer:(obj) =>{
      dispatch(goToConfigContainer(obj))
    },
    setImageDetail:(data,fn) =>{
      dispatch(imageFetch.fetchSetImageDetailAction(data,fn))
    },
    clearImageDetail:() =>{
      dispatch(imageFetch.receiveClearImageDetail())
    }
  }
};

const ImageDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageDetail);

export default ImageDetailContainer
