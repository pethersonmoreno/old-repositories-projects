import types from './types';

const addShipList = shipList => ({
  type: types.ADD_SHIPLIST,
  shipList,
});
const removeShipList = id => ({
  type: types.REMOVE_SHIPLIST,
  id,
});
const editShipList = (id, updates) => ({
  type: types.EDIT_SHIPLIST,
  id,
  updates,
});
const getShipLists = shipLists => ({
  type: types.GET_SHIPLISTS,
  shipLists,
});
const updateShipListSelected = shipListIdSelected => ({
  type: types.UPDATE_SHIPLIST_SELECTED,
  shipListIdSelected,
});
export default {
  addShipList,
  removeShipList,
  editShipList,
  getShipLists,
  updateShipListSelected,
};
