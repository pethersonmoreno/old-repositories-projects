import { database } from "./firebase";
import { mapObjectToList } from "./utils";
const databaseCategories = database.ref("/categories");

export const remove = id =>
  new Promise((resolve, reject) => {
    databaseCategories
      .child(id)
      .remove()
      .then(() => {
        resolve(id);
      })
      .catch(error => {
        reject(error);
      });
  });
export const edit = (id, updates) =>
  new Promise((resolve, reject) => {
    const { id: idField, ...otherFields } = updates;
    databaseCategories
      .child(id)
      .set({
        ...otherFields
      })
      .then(() => {
        resolve({ id, updates: otherFields });
      })
      .catch(error => {
        reject(error);
      });
  });
export const add = category =>
  new Promise((resolve, reject) => {
    const id = databaseCategories.push().key;
    edit(id, category)
      .then(({ id, updates }) => resolve({ ...updates, id }))
      .catch(error => reject(error));
  });
export const getAll = () =>
  new Promise((resolve, reject) => {
    databaseCategories
      .once("value")
      .then(snapshot => {
        resolve(mapObjectToList(snapshot.val(), "id"));
      })
      .catch(error => reject(error));
  });
export const listenChanges = listenCallBack => {
  databaseCategories.on("value", snapshot => {
    if (listenCallBack) {
      listenCallBack(mapObjectToList(snapshot.val(), "id"));
    }
  });
};
