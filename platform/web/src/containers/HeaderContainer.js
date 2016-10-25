
import {connect} from 'react-redux'
import {toggleSidebarAction} from '../actions/toggleSidebar'
import Header from '../components/Header'
import makeIsSidebarOpenSelector from '../selectors/isSidebarOpenSelector'
import makeIsLoadingSelector from '../selectors/isLoadingSelector'
import {goToUserCenter} from '../actions/header';

const mapStateToProps = (state) => {
  const isSidebarOpenSelector = makeIsSidebarOpenSelector();
  const isLoadingSelector = makeIsLoadingSelector();
  return {
    isSidebarOpen: isSidebarOpenSelector(state),
    isLoading: isLoadingSelector(state)
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onSidebarToggleClick: (flag) => {
      dispatch(toggleSidebarAction(flag))
    },
    goToUserCenter:() =>{
      dispatch(goToUserCenter())
    }
  }
};

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default SidebarContainer
