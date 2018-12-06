import { mapObjectToList } from "./utils";
import { getDatabaseUser } from "./user";

const getDatabaseAllCategories = uid =>
  getDatabaseUser(uid).child("/categories");
const getDatabaseCategory = (uid, id) =>
  getDatabaseAllCategories(uid).child(id);

export const newId = uid => getDatabaseAllCategories(uid).push().key;
export const add = (uid, id, category) =>
  getDatabaseCategory(uid, id)
    .set(category)
    .then(() => ({ ...category, id }));
export const edit = (uid, id, { id: idField, ...otherFields }) =>
  getDatabaseCategory(uid, id)
    .update(otherFields)
    .then(() => ({ updates: otherFields, id }));
export const remove = (uid, id) =>
  getDatabaseCategory(uid, id)
    .remove()
    .then(() => ({ id }));
export const getAll = uid =>
  getDatabaseAllCategories(uid)
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
    getDatabaseAllCategories(uid).on("value", listenChanges);
  }
};
export const stopListenChanges = (uid, listenCallBack) => {
  if (dicListenChanges[listenCallBack]) {
    const listenChanges = dicListenChanges[listenCallBack];
    getDatabaseAllCategories(uid).off("value", listenChanges);
  }
};
