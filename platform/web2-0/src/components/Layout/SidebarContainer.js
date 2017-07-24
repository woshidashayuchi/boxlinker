
import {connect} from 'react-redux'
import Sidebar from '../../components/Sidebar';
import {onChangeSidebarActiveAction} from '../../actions/toggleSidebar'
const mapStateToProps = (state) => {
  return {
    isSidebarOpen: state.isSidebarOpen,
    sidebarActive : state.sidebarActive,
    organizeDetail:state.organizeDetail
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSidebarActive:(url) => {
      dispatch(onChangeSidebarActiveAction(url))
    }
  }
};


const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

export default SidebarContainer
