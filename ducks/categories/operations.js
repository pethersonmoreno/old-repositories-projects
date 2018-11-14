import { category as categoryApi } from "../../api";
import actions from "./actions";

const addCategory = newCategory => dispatch => {
  categoryApi.add(newCategory).then(category => {
    dispatch(actions.addCategory(category));
  });
};
const removeCategory = id => dispatch => {
  categoryApi.remove(id).then(() => {
    dispatch(actions.removeCategory(id));
  });
};
const editCategory = (id, updates) => dispatch => {
  categoryApi.edit(id, updates).then(() => {
    dispatch(actions.editCategory(id, updates));
  });
};
const getCategories = () => dispatch => {
  categoryApi.getAll().then(categories => {
    dispatch(actions.getCategories(categories));
  });
};
export default {
  addCategory,
  removeCategory,
  editCategory,
  getCategories
};
