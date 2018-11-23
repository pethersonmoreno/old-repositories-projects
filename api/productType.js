import { mapObjectToList } from "./utils";
import { getDatabaseUser } from "./user";

const getDatabaseProductTypes = uid =>
  getDatabaseUser(uid).child("/productTypes");

export const newId = uid => getDatabaseProductTypes(uid).push().key;
const set = (uid, id, values) =>
  getDatabaseProductTypes(uid)
    .child(id)
    .set(values);
export const add = (uid, id, productType) =>
  set(uid, id, productType).then(() => ({ ...productType, id }));
export const edit = (uid, id, { id: idField, ...otherFields }) =>
  set(uid, id, otherFields).then(() => ({ updates: otherFields, id }));
export const remove = (uid, id) =>
  getDatabaseProductTypes(uid)
    .child(id)
    .remove()
    .then(() => ({ id }));
export const getAll = uid =>
  getDatabaseProductTypes(uid)
    .once("value")
    .then(snapshot => mapObjectToList(snapshot.val(), "id"));
let dicListenChanges = {};
export const startListenChanges = (uid, listenCallBack) => {
  if (!dicListenChanges[listenCallBack]) {
    const listenChange = snapshot => {
      if (listenCallBack) {
        listenCallBack(mapObjectToList(snapshot.val(), "id"));
      }
    };
    dicListenChanges[listenCallBack] = listenChange;
    getDatabaseProductTypes(uid).on("value", listenChange);
  }
};
export const stopListenChanges = (uid, listenCallBack) => {
  if (dicListenChanges[listenCallBack]) {
    const listenChange = dicListenChanges[listenCallBack];
    getDatabaseProductTypes(uid).off("value", listenChange);
  }
};
