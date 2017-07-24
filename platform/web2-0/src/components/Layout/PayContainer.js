
import {connect} from 'react-redux';
import Pay from '../../components/Pay';
import * as funUser from  '../../actions/users';

const mapStateToProps = (state) => {
  return {
    isBtnState:state.isBtnState,
    recharges:state.recharges,
    switchRecharges:state.switchRecharges
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    getRecharge:(data) =>{
      dispatch(funUser.fetchGetRechargesAction(data))
    },
    getSwitchRecharges:(data) =>{
      dispatch(funUser.fetchSwitchRechargesAction(data))
    }
  }
};

const PayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pay);

export default PayContainer
