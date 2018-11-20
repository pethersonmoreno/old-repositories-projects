import { database } from "./firebase";
import { mapObjectToList } from "./utils";
const databaseShipLists = database.ref("/shipLists");

export const newId = () => databaseShipLists.push().key;
const set = (id, values) => databaseShipLists.child(id).set(values);
export const add = (id, shipList) =>
  set(id, shipList).then(() => ({ ...shipList, id }));
export const edit = (id, { id: idField, ...otherFields }) =>
  set(id, otherFields).then(() => ({ updates: otherFields, id }));
export const remove = id =>
  databaseShipLists
    .child(id)
    .remove()
    .then(() => ({ id }));
const mapObjectShipListToList = object => {
  return mapObjectToList(object, "id").map(shipList => ({
    ...shipList,
    items: shipList.items ? mapObjectToList(shipList.items, "id") : []
  }));
};
export const getAll = () =>
  databaseShipLists
    .once("value")
    .then(snapshot => mapObjectShipListToList(snapshot.val()));
let dicListenChanges = {};
export const startListenChanges = listenCallBack => {
  if (!dicListenChanges[listenCallBack]) {
    const listenChanges = snapshot => {
      if (listenCallBack) {
        listenCallBack(mapObjectShipListToList(snapshot.val()));
      }
    };
    dicListenChanges[listenCallBack] = listenChanges;
    databaseShipLists.on("value", listenChanges);
  }
};
export const stopListenChanges = listenCallBack => {
  if (dicListenChanges[listenCallBack]) {
    const listenChanges = dicListenChanges[listenCallBack];
    databaseShipLists.off("value", listenChanges);
  }
};
const getDatabaseItems = shipListId =>
  databaseShipLists.child(shipListId).child("items");
export const newIdItem = () => getDatabaseItems().push().key;
const setItem = (shipListId, idItem, values) =>
  getDatabaseItems(shipListId)
    .child(idItem)
    .set(values);
export const addItem = (shipListId, idItem, item) =>
  setItem(shipListId, idItem, item).then(() => ({
    ...item,
    id
  }));
export const editItem = (shipListId, idItem, { id: idField, ...otherFields }) =>
  setItem(shipListId, idItem, otherFields).then(() => ({
    updates: otherFields,
    id: idItem
  }));
