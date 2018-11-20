import { database } from "./firebase";
import { mapObjectToList } from "./utils";
const databaseProducts = database.ref("/products");

export const newId = () => databaseProducts.push().key;
const set = (id, values) => databaseProducts.child(id).set(values);
export const add = (id, product) =>
  set(id, product).then(() => ({
    ...product,
    id
  }));
export const edit = (id, { id: idField, ...otherFields }) =>
  set(id, otherFields).then(() => ({ updates: otherFields, id }));
export const remove = id =>
  databaseProducts
    .child(id)
    .remove()
    .then(() => id);
export const getAll = () =>
  databaseProducts
    .once("value")
    .then(snapshot => mapObjectToList(snapshot.val(), "id"));
let dicListenChanges = {};
export const startListenChanges = listenCallBack => {
  if (!dicListenChanges[listenCallBack]) {
    const listenChanges = snapshot => {
      if (listenCallBack) {
        listenCallBack(mapObjectToList(snapshot.val(), "id"));
      }
    };
    dicListenChanges[listenCallBack] = listenChanges;
    databaseProducts.on("value", listenChanges);
  }
};
export const stopListenChanges = listenCallBack => {
  if (dicListenChanges[listenCallBack]) {
    const listenChanges = dicListenChanges[listenCallBack];
    databaseProducts.off("value", listenChanges);
  }
};
