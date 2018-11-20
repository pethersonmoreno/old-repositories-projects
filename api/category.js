import { database } from "./firebase";
import { mapObjectToList } from "./utils";
const databaseCategories = database.ref("/categories");

export const remove = id =>
  databaseCategories
    .child(id)
    .remove()
    .then(() => id);
export const edit = (id, { id: idField, ...otherFields }) =>
  databaseCategories
    .child(id)
    .set({
      ...otherFields
    })
    .then(() => ({ id, updates: otherFields }));
export const newId = () => databaseCategories.push().key;
export const add = (id, category) =>
  edit(id, category).then(({ id, updates }) => ({
    ...updates,
    id
  }));
export const getAll = () =>
  databaseCategories
    .once("value")
    .then(snapshot => mapObjectToList(snapshot.val(), "id"));
let dicListenChanges = {};
export const startListenChanges = listenCallBack => {
  if (!dicListenChanges[listenCallBack]) {
    const listenChange = snapshot => {
      if (listenCallBack) {
        listenCallBack(mapObjectToList(snapshot.val(), "id"));
      }
    };
    dicListenChanges[listenCallBack] = listenChange;
    databaseCategories.on("value", listenChange);
  }
};
export const stopListenChanges = listenCallBack => {
  if (dicListenChanges[listenCallBack]) {
    const listenChange = dicListenChanges[listenCallBack];
    databaseCategories.off("value", listenChange);
  }
};
