import types from './types';

const updateShiplists = ({ shipLists }) => ({
  type: types.UPDATE_SHIPLISTS,
  payload: { shipLists },
});
const updateShiplistItems = ({ shipListItems }) => ({
  type: types.UPDATE_SHIPLIST_ITEMS,
  payload: { shipListItems },
});
export default {
  updateShiplists,
  updateShiplistItems,
};
