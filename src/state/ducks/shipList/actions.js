import types from './types';

const updateShiplist = shipLists => ({ type: types.UPDATE_SHIPLIST, payload: { shipLists } });
const updateShipListSelected = shipListIdSelected => ({
  type: types.UPDATE_SHIPLIST_SELECTED,
  payload: { shipListIdSelected },
});
export default {
  updateShiplist,
  updateShipListSelected,
};
