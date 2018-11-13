import * as api from 'api';
import actions from './actions';

const addCategory = newCategory => (dispatch) => {
  api.addCategory(newCategory).then((category) => {
    dispatch(actions.addCategory(category));
  });
};
const removeCategory = id => (dispatch) => {
  api.removeCategory(id).then(() => {
    dispatch(actions.removeCategory(id));
  });
};
const editCategory = (id, updates) => (dispatch) => {
  api.editCategory(id, updates).then(() => {
    dispatch(actions.editCategory(id, updates));
  });
};
const getCategories = () => (dispatch) => {
  api.getAllCategories().then((categories) => {
    dispatch(actions.getCategories(categories));
  });
};
export default {
  addCategory,
  removeCategory,
  editCategory,
  getCategories,
};
