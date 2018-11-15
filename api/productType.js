import { database } from "./firebase";
import { mapObjectToList } from "./utils";
const databaseProductTypes = database.ref("/productTypes");

export const remove = id =>
  databaseProductTypes
    .child(id)
    .remove()
    .then(() => id);
export const edit = (id, { id: idField, ...otherFields }) =>
  databaseProductTypes
    .child(id)
    .set({
      ...otherFields
    })
    .then(() => ({ id, updates: otherFields }));
export const add = productType =>
  edit(databaseProductTypes.push().key, productType).then(
    ({ id, updates }) => ({ ...updates, id })
  );
export const getAll = () =>
  databaseProductTypes
    .once("value")
    .then(snapshot => mapObjectToList(snapshot.val(), "id"));
export const listenChanges = listenCallBack => {
  databaseProductTypes.on("value", snapshot => {
    const productTypes = mapObjectToList(snapshot.val(), "id");
    if (listenCallBack) {
      listenCallBack(productTypes);
    }
  });
};
