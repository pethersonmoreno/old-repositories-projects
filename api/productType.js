import { database } from "./firebase";
import { mapObjectToList } from "./utils";
const databaseProductTypes = database.ref("/productTypes");

export const newId = () => databaseProductTypes.push().key;
const set = (id, values) => databaseProductTypes.child(id).set(values);
export const add = (id, productType) =>
  set(id, productType).then(() => ({ ...productType, id }));
export const edit = (id, { id: idField, ...otherFields }) =>
  set(id, otherFields).then(() => ({ updates: otherFields, id }));
export const remove = id =>
  databaseProductTypes
    .child(id)
    .remove()
    .then(() => ({ id }));
export const getAll = () =>
  databaseProductTypes
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
    databaseProductTypes.on("value", listenChange);
  }
};
export const stopListenChanges = listenCallBack => {
  if (dicListenChanges[listenCallBack]) {
    const listenChange = dicListenChanges[listenCallBack];
    databaseProductTypes.off("value", listenChange);
  }
};
