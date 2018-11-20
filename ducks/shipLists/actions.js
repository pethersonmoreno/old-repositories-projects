import { FULFILLED } from "redux-promise-middleware";
import types from "./types";

const add = payload => ({
  type: types.ADD_SHIPLIST,
  payload
});
const remove = payload => ({
  type: types.REMOVE_SHIPLIST,
  payload
});
const edit = payload => ({
  type: types.EDIT_SHIPLIST,
  payload
});
const getAll = payload => ({
  type: types.GET_SHIPLISTS,
  payload
});
const getAllFulfilled = payload => ({
  type: types.GET_SHIPLISTS + "_" + FULFILLED,
  payload
});
const addItem = (meta, payload) => ({
  type: types.ADD_SHIPLIST_ITEM,
  meta,
  payload
});
const editItem = (meta, payload) => ({
  type: types.EDIT_SHIPLIST_ITEM,
  meta,
  payload
});
const updateShipListSelected = shipListIdSelected => ({
  type: types.UPDATE_SHIPLIST_SELECTED,
  shipListIdSelected
});
export default {
  add,
  remove,
  edit,
  getAll,
  getAllFulfilled,
  addItem,
  editItem,
  updateShipListSelected
};
