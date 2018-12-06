import { product as productApi } from "../../api";
import actions from "./actions";

const add = (uid, newCategory) =>
  actions.add(productApi.add(uid, productApi.newId(uid), newCategory));
const remove = (uid, id) => actions.remove(productApi.remove(uid, id));
const edit = (uid, id, updates) =>
  actions.edit(productApi.edit(uid, id, updates));
const getAll = uid => actions.getAll(productApi.getAll(uid));
let listenChangesCallback = null;
const startListenChanges = uid => dispatch => {
  if (!listenChangesCallback) {
    listenChangesCallback = products => {
      dispatch(actions.getAllFulfilled(products));
    };
    return productApi.getAll(uid).then(products => {
      listenChangesCallback(products);
      productApi.startListenChanges(uid, listenChangesCallback);
      return products;
    });
  }
  return Promise.reject("Listen alread started");
};
const stopListenChanges = uid => () => {
  if (listenChangesCallback) {
    productApi.stopListenChanges(uid, listenChangesCallback);
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
