import { FULFILLED } from "redux-promise-middleware";
import types from "./types";

const add = payload => ({
  type: types.ADD_PRODUCT,
  payload
});
const remove = payload => ({
  type: types.REMOVE_PRODUCT,
  payload
});
const edit = payload => ({
  type: types.EDIT_PRODUCT,
  payload
});
const getAll = payload => ({
  type: types.GET_PRODUCTS,
  payload
});
const getAllFulfilled = payload => ({
  type: types.GET_PRODUCTS + "_" + FULFILLED,
  payload
});
export default {
  add,
  remove,
  edit,
  getAll,
  getAllFulfilled
};
