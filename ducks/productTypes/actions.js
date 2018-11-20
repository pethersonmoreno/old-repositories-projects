import { FULFILLED } from "redux-promise-middleware";
import types from "./types";

const add = payload => ({
  type: types.ADD_PRODUCT_TYPE,
  payload
});
const remove = payload => ({
  type: types.REMOVE_PRODUCT_TYPE,
  payload
});
const edit = payload => ({
  type: types.EDIT_PRODUCT_TYPE,
  payload
});
const getAll = payload => ({
  type: types.GET_PRODUCT_TYPES,
  payload
});
const getAllFulfilled = payload => ({
  type: types.GET_PRODUCT_TYPES + "_" + FULFILLED,
  payload
});
export default {
  add,
  remove,
  edit,
  getAll,
  getAllFulfilled
};
