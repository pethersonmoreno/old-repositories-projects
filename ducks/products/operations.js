import {
  product as productApi,
  productType as productTypeApi
} from "../../api";
import actions from "./actions";

const add = newCategory =>
  actions.add(productApi.add(productApi.newId(), newCategory));
const remove = id => actions.remove(productApi.remove(id));
const edit = (id, updates) => actions.edit(productApi.edit(id, updates));
const getAll = () => actions.getAll(productApi.getAll());
let listenChangesCallback = null;
const startListenChanges = () => dispatch => {
  if (!listenChangesCallback) {
    listenChangesCallback = products => {
      dispatch(actions.getAllFulfilled(products));
    };
    productApi.startListenChanges(listenChangesCallback);
  }
};
const stopListenChanges = () => () => {
  if (listenChangesCallback) {
    productApi.stopListenChanges(listenChangesCallback);
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
