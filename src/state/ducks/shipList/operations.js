import actions from './actions';
import { shipLists } from '../../../data';

const startShiplist = () => (dispatch, getState) => {
  const {
    shipList: { shipLists: stateShipLists },
  } = getState();
  if (stateShipLists === null) {
    dispatch(actions.updateShiplist(shipLists));
    if (shipLists.length > 0) {
      dispatch(actions.updateShipListSelected(shipLists[0].id));
    }
  }
};
const updateShipListSelected = shipListIdSelected => (dispatch) => {
  dispatch(actions.updateShipListSelected(shipListIdSelected));
};
export default {
  startShiplist,
  updateShipListSelected,
};
