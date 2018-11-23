import { productType as productTypeApi } from "../../api";
import actions from "./actions";

const add = (uid, newProductType) =>
  actions.add(
    productTypeApi.add(uid, productTypeApi.newId(uid), newProductType)
  );
const remove = (uid, id) => actions.remove(productTypeApi.remove(uid, id));
const edit = (uid, id, updates) =>
  actions.edit(productTypeApi.edit(uid, id, updates));
const getAll = uid => actions.getAll(productTypeApi.getAll(uid));
let listenChangesCallback = null;
const startListenChanges = uid => dispatch => {
  if (!listenChangesCallback) {
    listenChangesCallback = productTypes => {
      dispatch(actions.getAllFulfilled(productTypes));
    };
    return productTypeApi.getAll(uid).then(productTypes => {
      listenChangesCallback(productTypes);
      productTypeApi.startListenChanges(uid, listenChangesCallback);
      return productTypes;
    });
  }
  return Promise.reject("Listen alread started");
};
const stopListenChanges = uid => () => {
  if (listenChangesCallback) {
    productTypeApi.stopListenChanges(uid, listenChangesCallback);
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
