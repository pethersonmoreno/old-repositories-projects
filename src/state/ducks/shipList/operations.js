import actions from './actions';

const startShiplistSelection = () => (dispatch, getState) => {
  const {
    data: { shipLists },
    shipList: { shipListIdSelected: stateShipListIdSelected },
  } = getState();
  if (stateShipListIdSelected === null) {
    if (shipLists.length > 0) {
      dispatch(actions.updateShipListSelected(shipLists[0].id));
    }
  }
};
const updateShipListSelected = shipListIdSelected => (dispatch) => {
  dispatch(actions.updateShipListSelected(shipListIdSelected));
};
export default {
  startShiplistSelection,
  updateShipListSelected,
};
