import { mapObjectToList } from "./utils";
import { getDatabaseUser } from "./user";

const getDatabaseCategories = uid => getDatabaseUser(uid).child("/categories");

export const newId = uid => getDatabaseCategories(uid).push().key;
const set = (uid, id, values) =>
  getDatabaseCategories(uid)
    .child(id)
    .set(values);
export const add = (uid, id, category) =>
  set(uid, id, category).then(() => ({ ...category, id }));
export const edit = (uid, id, { id: idField, ...otherFields }) =>
  set(uid, id, otherFields).then(() => ({ updates: otherFields, id }));
export const remove = (uid, id) =>
  getDatabaseCategories(uid)
    .child(id)
    .remove()
    .then(() => ({ id }));
export const getAll = uid =>
  getDatabaseCategories(uid)
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
    getDatabaseCategories(uid).on("value", listenChanges);
  }
};
export const stopListenChanges = (uid, listenCallBack) => {
  if (dicListenChanges[listenCallBack]) {
    const listenChanges = dicListenChanges[listenCallBack];
    getDatabaseCategories(uid).off("value", listenChanges);
  }
};
