import { database } from "./firebase";
import { mapObjectToList } from "./utils";
const databaseProducts = database.ref("/products");

export const remove = id =>
  databaseProducts
    .child(id)
    .remove()
    .then(() => id);
export const edit = (id, { id: idField, ...otherFields }) =>
  databaseProducts
    .child(id)
    .set({
      ...otherFields
    })
    .then(() => ({ id, updates: otherFields }));
export const add = product =>
  edit(databaseProducts.push().key, product).then(({ id, updates }) => ({
    ...updates,
    id
  }));
export const getAll = () =>
  databaseProducts
    .once("value")
    .then(snapshot => mapObjectToList(snapshot.val(), "id"));
export const listenChanges = listenCallBack => {
  databaseProducts.on("value", snapshot => {
    if (listenCallBack) {
      listenCallBack(mapObjectToList(snapshot.val(), "id"));
    }
  });
};
