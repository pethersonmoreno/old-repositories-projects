import { database } from "./firebase";
import { mapObjectToList } from "./utils";
const databaseProducts = database.ref("/products");

export const remove = id =>
  new Promise((resolve, reject) => {
    databaseProducts
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
    databaseProducts
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
export const add = product =>
  new Promise((resolve, reject) => {
    const id = databaseProducts.push().key;
    edit(id, product)
      .then(({ id, updates }) => resolve({ ...updates, id }))
      .catch(error => reject(error));
  });
export const getAll = () =>
  new Promise((resolve, reject) => {
    databaseProducts
      .once("value")
      .then(snapshot => {
        resolve(mapObjectToList(snapshot.val(), "id"));
      })
      .catch(error => reject(error));
  });
export const listenChanges = listenCallBack => {
  databaseProducts.on("value", snapshot => {
    if (listenCallBack) {
      listenCallBack(mapObjectToList(snapshot.val(), "id"));
    }
  });
};
