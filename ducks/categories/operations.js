import { category as categoryApi } from "../../api";
import actions from "./actions";

const add = newCategory =>
  actions.add(categoryApi.add(categoryApi.newId(), newCategory));
const remove = id => actions.remove(categoryApi.remove(id));
const edit = (id, updates) => actions.edit(categoryApi.edit(id, updates));
const getAll = () => actions.getAll(categoryApi.getAll());
let listenChangesCallback = null;
const startListenChanges = () => dispatch => {
  if (!listenChangesCallback) {
    listenChangesCallback = categories => {
      dispatch(actions.getAllFulfilled(categories));
    };
    return categoryApi.getAll().then(categories => {
      listenChangesCallback(categories);
      categoryApi.startListenChanges(listenChangesCallback);
      return categories;
    });
  }
  return Promise.reject("Listen alread started");
};
const stopListenChanges = () => () => {
  if (listenChangesCallback) {
    categoryApi.stopListenChanges(listenChangesCallback);
    listenChangesCallback = null;
  }
};
export default {
  add,
  remove,
  edit,
  getAll,
  startListenChanges,
  stopListenChanges
};
