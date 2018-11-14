import { database } from "./firebase";
import { mapObjectToList } from "./utils";
const databaseProductTypes = database.ref("/productTypes");

export const remove = id =>
  new Promise((resolve, reject) => {
    databaseProductTypes
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
    databaseProductTypes
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
export const add = productType =>
  new Promise((resolve, reject) => {
    const id = databaseProductTypes.push().key;
    edit(id, productType)
      .then(({ id, updates }) => resolve({ ...updates, id }))
      .catch(error => reject(error));
  });
export const getAll = () =>
  new Promise((resolve, reject) => {
    databaseProductTypes
      .once("value")
      .then(snapshot => {
        resolve(mapObjectToList(snapshot.val(), "id"));
      })
      .catch(error => reject(error));
  });
export const listenChanges = listenCallBack => {
  databaseProductTypes.on("value", snapshot => {
    if (listenCallBack) {
      listenCallBack(mapObjectToList(snapshot.val(), "id"));
    }
  });
};
