import { shipList as shipListApi } from "../../api";
import actions from "./actions";

const add = (uid, newShipList) =>
  actions.add(shipListApi.add(uid, shipListApi.newId(uid), newShipList));
const remove = (uid, id) => actions.remove(shipListApi.remove(uid, id));
const edit = (uid, id, updates) =>
  actions.edit(shipListApi.edit(uid, id, updates));
const getAll = uid => actions.getAll(shipListApi.getAll(uid));
let listenChangesCallback = null;
const startListenChanges = uid => dispatch => {
  if (!listenChangesCallback) {
    listenChangesCallback = shipLists => {
      dispatch(actions.getAllFulfilled(shipLists));
    };
    return shipListApi.getAll(uid).then(shipLists => {
      listenChangesCallback(shipLists);
      shipListApi.startListenChanges(uid, listenChangesCallback);
      return shipLists;
    });
  }
  return Promise.reject("Listen alread started");
};
const stopListenChanges = uid => () => {
  if (listenChangesCallback) {
    shipListApi.stopListenChanges(uid, listenChangesCallback);
    listenChangesCallback = null;
  }
};
const addItem = (uid, shipListId, item) =>
  actions.addItem(
    { shipListId },
    shipListApi.addItem(
      uid,
      shipListId,
      shipListApi.newIdItem(uid, shipListId),
      item
    )
  );
const editItem = (uid, shipListId, idItem, item) =>
  actions.editItem(
    { shipListId, idItem },
    shipListApi.editItem(uid, shipListId, idItem, item)
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
