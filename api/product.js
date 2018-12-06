import { mapObjectToList } from "./utils";
import { getDatabaseUser } from "./user";

const getDatabaseAllProducts = uid => getDatabaseUser(uid).child("/products");
const getDatabaseProduct = (uid, id) => getDatabaseAllProducts(uid).child(id);

export const newId = uid => getDatabaseAllProducts(uid).push().key;
export const add = (uid, id, product) =>
  getDatabaseProduct(uid, id)
    .set(product)
    .then(() => ({
      ...product,
      id
    }));
export const edit = (uid, id, { id: idField, ...otherFields }) =>
  getDatabaseProduct(uid, id)
    .update(otherFields)
    .then(() => ({ updates: otherFields, id }));
export const remove = (uid, id) =>
  getDatabaseProduct(uid, id)
    .remove()
    .then(() => id);
export const getAll = uid =>
  getDatabaseAllProducts(uid)
    .once("value")
    .then(snapshot => mapObjectToList(snapshot.val(), "id"));
let dicListenChanges = {};
export const startListenChanges = (uid, listenCallBack) => {
  if (!dicListenChanges[listenCallBack]) {
    const listenChanges = snapshot => {
      if (listenCallBack) {
        listenCallBack(mapObjectToList(snapshot.val(), "id"));
      }
    };
    dicListenChanges[listenCallBack] = listenChanges;
    getDatabaseAllProducts(uid).on("value", listenChanges);
  }
};
export const stopListenChanges = (uid, listenCallBack) => {
  if (dicListenChanges[listenCallBack]) {
    const listenChanges = dicListenChanges[listenCallBack];
    getDatabaseAllProducts(uid).off("value", listenChanges);
  }
};
