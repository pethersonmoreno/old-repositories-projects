import { productType as productTypeApi } from "../../api";
import actions from "./actions";

const add = newProductType =>
  actions.add(productTypeApi.add(productTypeApi.newId(), newProductType));
const remove = id => actions.remove(productTypeApi.remove(id));
const edit = (id, updates) => actions.edit(productTypeApi.edit(id, updates));
const getAll = () => actions.getAll(productTypeApi.getAll());
let listenChangesCallback = null;
const startListenChanges = () => dispatch => {
  if (!listenChangesCallback) {
    listenChangesCallback = productTypes => {
      dispatch(actions.getAllFulfilled(productTypes));
    };
    return productTypeApi.getAll().then(productTypes => {
      listenChangesCallback(productTypes);
      productTypeApi.startListenChanges(listenChangesCallback);
      return productTypes;
    });
  }
  return Promise.reject("Listen alread started");
};
const stopListenChanges = () => () => {
  if (listenChangesCallback) {
    productTypeApi.stopListenChanges(listenChangesCallback);
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
