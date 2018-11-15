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
export const add = category =>
  edit(databaseCategories.push().key, category).then(({ id, updates }) => ({
    ...updates,
    id
  }));
export const getAll = () =>
  databaseCategories
    .once("value")
    .then(snapshot => mapObjectToList(snapshot.val(), "id"));
export const listenChanges = listenCallBack => {
  databaseCategories.on("value", snapshot => {
    if (listenCallBack) {
      listenCallBack(mapObjectToList(snapshot.val(), "id"));
    }
  });
};
