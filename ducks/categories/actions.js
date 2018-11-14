import types from './types';

const addCategory = category => ({
  type: types.ADD_CATEGORY,
  category,
});
const removeCategory = id => ({
  type: types.REMOVE_CATEGORY,
  id,
});
const editCategory = (id, updates) => ({
  type: types.EDIT_CATEGORY,
  id,
  updates,
});
const getCategories = categories => ({
  type: types.GET_CATEGORIES,
  categories,
});
export default {
  addCategory,
  removeCategory,
  editCategory,
  getCategories,
};
