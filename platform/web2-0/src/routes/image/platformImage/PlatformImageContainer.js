import PlatformImage from './PlatformImage'
import {connect} from 'react-redux'
import * as imageListFetch from '../../../actions/imageList'
import {setBreadcrumbAction} from '../../../actions/breadcumb'
import {goToConfigContainer} from '../../../actions/deployService';


const mapStateToProps = (state) => {
  return {
    imageRecommendList:state.imageRecommendList,
    platformImageList:state.platformImageList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    goToConfigContainer:(obj) => {
      dispatch(goToConfigContainer(obj))
    },
    getPlatformImageList:(data) =>{
      dispatch(imageListFetch.fetchPlatformList(data))
    },
    getImageRecommendList:(page) =>{
      dispatch(imageListFetch.fetchImageRecommendList(page))
    },
    clearPlatformImageList:() =>{
      dispatch(imageListFetch.clearPlatformImageList())
    }
  }
};

const PlatformImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlatformImage);

export default PlatformImageContainer
