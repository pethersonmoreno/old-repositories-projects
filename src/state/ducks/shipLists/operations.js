import { shipList as shipListApi } from 'api';
import actions from './actions';

const addShipList = newShipList => (dispatch) => {
  shipListApi.add(newShipList).then((shipList) => {
    dispatch(actions.addShipList(shipList));
    dispatch(actions.updateShipListSelected(shipList.id));
  });
};
const removeShipList = id => (dispatch) => {
  shipListApi.remove(id).then(() => {
    dispatch(actions.removeShipList(id));
  });
};
const editShipList = (id, updates) => (dispatch) => {
  shipListApi.edit(id, updates).then(() => {
    dispatch(actions.editShipList(id, updates));
    dispatch(actions.updateShipListSelected(id));
  });
};
const getShipLists = () => (dispatch) => {
  shipListApi.getAll().then((shipLists) => {
    dispatch(actions.getShipLists(shipLists));
  });
};
const startShiplistSelection = () => (dispatch, getState) => {
  const {
    shipLists: { shipLists, shipListIdSelected },
  } = getState();
  if (shipListIdSelected === null) {
    if (shipLists.length > 0) {
      dispatch(actions.updateShipListSelected(shipLists[0].id));
    }
  }
};
const updateShipListSelected = shipListIdSelected => (dispatch) => {
  dispatch(actions.updateShipListSelected(shipListIdSelected));
};
const addShipListItem = (shipListId, item) => (dispatch) => {
  shipListApi.addItem(shipListId, item).then(({ id, shipList }) => {
    dispatch(actions.editShipList(shipListId, { items: shipList.items }));
    dispatch(actions.updateShipListSelected(id));
  });
};
const editShipListItem = (shipListId, idItem, updates) => (dispatch) => {
  shipListApi.editItem(shipListId, idItem, updates).then(({ id, shipList }) => {
    dispatch(actions.editShipList(shipListId, { items: shipList.items }));
    dispatch(actions.updateShipListSelected(id));
  });
};
export default {
  addShipList,
  removeShipList,
  editShipList,
  getShipLists,
  startShiplistSelection,
  updateShipListSelected,
  addShipListItem,
  editShipListItem,
};
