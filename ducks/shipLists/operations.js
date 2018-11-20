import { shipList as shipListApi } from "../../api";
import actions from "./actions";

const add = newShipList =>
  actions.add(shipListApi.add(shipListApi.newId(), newShipList));
const remove = id => actions.remove(shipListApi.remove(id));
const edit = (id, updates) => actions.edit(shipListApi.edit(id, updates));
const getAll = () => actions.getAll(shipListApi.getAll());
let listenChangesCallback = null;
const startListenChanges = () => dispatch => {
  if (!listenChangesCallback) {
    listenChangesCallback = categories => {
      dispatch(actions.getAllFulfilled(categories));
    };
    shipListApi.startListenChanges(listenChangesCallback);
  }
};
const stopListenChanges = () => () => {
  if (listenChangesCallback) {
    shipListApi.stopListenChanges(listenChangesCallback);
    listenChangesCallback = null;
  }
};
const addItem = (shipListId, item) =>
  actions.addItem(
    { shipListId },
    shipListApi.addItem(shipListId, shipListApi.newIdItem(shipListId), item)
  );
const editItem = (shipListId, idItem, item) =>
  actions.editItem(
    { shipListId, idItem },
    shipListApi.editItem(shipListId, idItem, item)
  );
const startShiplistSelection = () => (dispatch, getState) => {
  const {
    shipLists: { shipLists, shipListIdSelected }
  } = getState();
  if (shipListIdSelected === null) {
    if (shipLists.length > 0) {
      dispatch(actions.updateShipListSelected(shipLists[0].id));
    }
  }
};
const updateShipListSelected = shipListIdSelected => dispatch => {
  dispatch(actions.updateShipListSelected(shipListIdSelected));
};
const updateShipListSelectedByIndex = shipListIndexSelected => (
  dispatch,
  getState
) => {
  const {
    shipLists: { shipLists }
  } = getState();
  let newShipListIdSelected = null;
  if (shipListIndexSelected > 0 && shipListIndexSelected < shipLists.length) {
    newShipListIdSelected = shipLists[shipListIndexSelected].id;
  } else if (shipLists.length > 0) {
    newShipListIdSelected = shipLists[0].id;
  }
  if (newShipListIdSelected) {
    dispatch(actions.updateShipListSelected(newShipListIdSelected));
  }
};
export default {
  add,
  remove,
  edit,
  getAll,
  startListenChanges,
  stopListenChanges,
  addItem,
  editItem,
  startShiplistSelection,
  updateShipListSelected,
  updateShipListSelectedByIndex
};
