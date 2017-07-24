import MyImage from './MyImage';
import {connect} from 'react-redux';
import * as imageListFetch from '../../../actions/imageList';
import {setBreadcrumbAction} from '../../../actions/breadcumb';
import {goToConfigContainer} from '../../../actions/deployService';

const mapStateToProps = (state) => {
  return {
    imageList: state.imageList,
    imageRecommendList:state.imageRecommendList,
    modalState:state.modalState
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onImageList : (data)=>{
      dispatch(imageListFetch.fetchImageListAction(data))
    },
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    goToConfigContainer:(obj) =>{
      dispatch(goToConfigContainer(obj))
    },
    onDeleteImage:(data) =>{
      dispatch(imageListFetch.fetchDeleteImageAction(data))
    },
    getImageRecommendList:() =>{
      dispatch(imageListFetch.fetchImageRecommendList())
    },
  }
};

const MyImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyImage);

export default MyImageContainer
