import { mapObjectToList } from "./utils";
import { getDatabaseUser } from "./user";

const getDatabaseProducts = uid => getDatabaseUser(uid).child("/products");

export const newId = uid => getDatabaseProducts(uid).push().key;
const set = (uid, id, values) =>
  getDatabaseProducts(uid)
    .child(id)
    .set(values);
export const add = (uid, id, product) =>
  set(uid, id, product).then(() => ({
    ...product,
    id
  }));
export const edit = (uid, id, { id: idField, ...otherFields }) =>
  set(uid, id, otherFields).then(() => ({ updates: otherFields, id }));
export const remove = (uid, id) =>
  getDatabaseProducts(uid)
    .child(id)
    .remove()
    .then(() => id);
export const getAll = uid =>
  getDatabaseProducts(uid)
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
    getDatabaseProducts(uid).on("value", listenChanges);
  }
};
export const stopListenChanges = (uid, listenCallBack) => {
  if (dicListenChanges[listenCallBack]) {
    const listenChanges = dicListenChanges[listenCallBack];
    getDatabaseProducts(uid).off("value", listenChanges);
  }
};
