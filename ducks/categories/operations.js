import { category as categoryApi } from "../../api";
import actions from "./actions";

const addCategory = newCategory => dispatch => {
  categoryApi
    .add(newCategory)
    .then(category => {
      // dispatch(actions.addCategory(category));
    })
    .catch(error => console.log("error na action: ", error));
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
  categoryApi.listenChanges(categories => {
    dispatch(actions.getCategories(categories));
  });
  // categoryApi.getAll().then(categories => {
  //   dispatch(actions.getCategories(categories));
  // });
};
export default {
  addCategory,
  removeCategory,
  editCategory,
  getCategories
};
