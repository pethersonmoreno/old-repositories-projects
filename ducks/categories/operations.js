import { category as categoryApi } from "../../api";
import actions from "./actions";

const add = (uid, newCategory) =>
  actions.add(categoryApi.add(uid, categoryApi.newId(uid), newCategory));
const remove = (uid, id) => actions.remove(categoryApi.remove(uid, id));
const edit = (uid, id, updates) =>
  actions.edit(categoryApi.edit(uid, id, updates));
const getAll = uid => actions.getAll(categoryApi.getAll(uid));
let listenChangesCallback = null;
const startListenChanges = uid => dispatch => {
  if (!listenChangesCallback) {
    listenChangesCallback = categories => {
      dispatch(actions.getAllFulfilled(categories));
    };
    return categoryApi.getAll(uid).then(categories => {
      listenChangesCallback(categories);
      categoryApi.startListenChanges(uid, listenChangesCallback);
      return categories;
    });
  }
  return Promise.reject("Listen alread started");
};
const stopListenChanges = uid => () => {
  if (listenChangesCallback) {
    categoryApi.stopListenChanges(uid, listenChangesCallback);
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
