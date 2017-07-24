
import {connect} from 'react-redux'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
const mapStateToProps = (state) => {
  return {
    breadcrumbList: state.breadcrumbList
  }
};
const BreadcrumbContainer = connect(
  mapStateToProps,
)(Breadcrumb);

export default BreadcrumbContainer
