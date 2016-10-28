import Organize from '../../components/Organize/Organize';
import {connect} from 'react-redux'
import {
  setBreadcrumbAction,
} from '../../actions/breadcumb';
import * as fun from '../../actions/organize';
import makeGetOrganizeDetail  from '../../selectors/organizeDetailSelector';
import makeGetOrganizeUserList from '../../selectors/organizeUserListSelector';
const mapStateToProps = (state) => {
  const getOrganizeDetail = makeGetOrganizeDetail();
  const getOrganizeUserList = makeGetOrganizeUserList();
  return {
    organizeDetail:getOrganizeDetail(state),
    organizeUserList:getOrganizeUserList(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb:(...arr) => {
      dispatch(setBreadcrumbAction(...arr))
    },
    getOrganizeDetail:(id) =>{
      dispatch(fun.fetchGetOrganizeDetailAction(id))
    },
    setOrganizeDetail:(data) => {
      dispatch(fun.fetchSetOrganizeDetailAction(data))
    },
    getOrganizeUserList:(id) =>{
      dispatch(fun.fetchGetOrganizeUserListAction(id))
    }
  }
};

const OrganizeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Organize);

export default OrganizeContainer
