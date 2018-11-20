import { FULFILLED } from "redux-promise-middleware";
import types from "./types";

const add = payload => ({
  type: types.ADD_CATEGORY,
  payload
});
const remove = payload => ({
  type: types.REMOVE_CATEGORY,
  payload
});
const edit = payload => ({
  type: types.EDIT_CATEGORY,
  payload
});
const getAll = payload => ({
  type: types.GET_CATEGORIES,
  payload
});
const getAllFulfilled = payload => ({
  type: types.GET_CATEGORIES + "_" + FULFILLED,
  payload
});
export default {
  add,
  remove,
  edit,
  getAll,
  getAllFulfilled
};
