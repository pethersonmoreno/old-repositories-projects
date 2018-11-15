import { category as categoryApi } from "../../api";
import actions from "./actions";

const addCategory = newCategory => dispatch => {
  categoryApi.add(newCategory).then(category => {
    // Removed because is is using listenChanges
    // dispatch(actions.addCategory(category));
  });
};
const removeCategory = id => dispatch => {
  categoryApi.remove(id).then(() => {
    // Removed because is is using listenChanges
    // dispatch(actions.removeCategory(id));
  });
};
const editCategory = (id, updates) => dispatch => {
  categoryApi.edit(id, updates).then(() => {
    // Removed because is is using listenChanges
    // dispatch(actions.editCategory(id, updates));
  });
};

const getCategories = () => dispatch => {
  // categoryApi.getAll().then(categories => {
  //   dispatch(actions.getCategories(categories));
  // });
  categoryApi.listenChanges(categories => {
    dispatch(actions.getCategories(categories));
  });
};
export default {
  addCategory,
  removeCategory,
  editCategory,
  getCategories
};
