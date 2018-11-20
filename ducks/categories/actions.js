import types from "./types";

const add = category => ({
  type: types.ADD_CATEGORY,
  payload: category
});
const remove = id => ({
  type: types.REMOVE_CATEGORY,
  payload: { id }
});
const edit = ({ id, updates }) => ({
  type: types.EDIT_CATEGORY,
  payload: { id, updates }
});
const getAll = categories => ({
  type: types.GET_CATEGORIES,
  payload: categories
});
export default {
  add,
  remove,
  edit,
  getAll
};
