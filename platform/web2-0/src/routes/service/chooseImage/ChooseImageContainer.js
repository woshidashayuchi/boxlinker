import ChooseImage from './ChooseImage';
import {connect} from 'react-redux';
import {goToConfigContainer,clearDeployData} from '../../../actions/deployService';
import {fetchImageListAction ,fetchPlatformList} from "../../../actions/imageList";
import {setBreadcrumbAction} from '../../../actions/breadcumb';

const mapStateToProps = (state) => {
  return {
    imageList :state.imageList,
    deployData:state.deployData,
    platformImageList:state.platformImageList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onImageListLoad : (data) => {
      dispatch(fetchImageListAction(data));
    },
    goToConfigContainer:(obj) => {
      dispatch(goToConfigContainer(obj))
    },
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    onPlatformImageListLoad:(data) =>{
      dispatch(fetchPlatformList(data))
    },
    onClearDeployDetail:() =>{
      dispatch(clearDeployData())
    }
  }
};

const ChooseImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseImage);

export default ChooseImageContainer
