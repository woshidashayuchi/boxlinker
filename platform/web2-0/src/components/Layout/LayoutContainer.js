/**
 * Created by zhangsai on 2017/1/9.
 */

import {connect} from 'react-redux'
import Layout from './Layout';
import {toggleSidebarAction} from '../../actions/toggleSidebar'

const mapStateToProps = (state) => {
  return {
    isSidebarOpen: state.isSidebarOpen,
    notifications: state.notifications
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSidebarToggleClick: (flag) => {
      dispatch(toggleSidebarAction(flag))
    },
  }
};

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);

export default LayoutContainer
