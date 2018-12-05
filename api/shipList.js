import { mapObjectToList } from "./utils";
import { getDatabaseUser } from "./user";

const getDatabaseShipLists = uid => getDatabaseUser(uid).child("/shipLists");

export const newId = uid => getDatabaseShipLists(uid).push().key;
const set = (uid, id, values) =>
  getDatabaseShipLists(uid)
    .child(id)
    .set(values);
export const add = (uid, id, shipList) =>
  set(uid, id, shipList).then(() => ({ ...shipList, id }));
export const edit = (uid, id, { id: idField, ...otherFields }) =>
  set(uid, id, otherFields).then(() => ({ updates: otherFields, id }));
export const remove = (uid, id) =>
  getDatabaseShipLists(uid)
    .child(id)
    .remove()
    .then(() => ({ id }));
const mapObjectShipListToList = object => {
  return mapObjectToList(object, "id").map(shipList => ({
    ...shipList,
    items: shipList.items ? mapObjectToList(shipList.items, "id") : []
  }));
};
export const getAll = uid =>
  getDatabaseShipLists(uid)
    .once("value")
    .then(snapshot => mapObjectShipListToList(snapshot.val()));
let dicListenChanges = {};
export const startListenChanges = (uid, listenCallBack) => {
  if (!dicListenChanges[listenCallBack]) {
    const listenChanges = snapshot => {
      if (listenCallBack) {
        listenCallBack(mapObjectShipListToList(snapshot.val()));
      }
    };
    dicListenChanges[listenCallBack] = listenChanges;
    getDatabaseShipLists(uid).on("value", listenChanges);
  }
};
export const stopListenChanges = (uid, listenCallBack) => {
  if (dicListenChanges[listenCallBack]) {
    const listenChanges = dicListenChanges[listenCallBack];
    getDatabaseShipLists(uid).off("value", listenChanges);
  }
};
const getDatabaseItems = (uid, shipListId) =>
  getDatabaseShipLists(uid)
    .child(shipListId)
    .child("items");
export const newIdItem = (uid, shipListId) =>
  getDatabaseItems(uid, shipListId).push().key;

const getItem = (uid, shipListId, idItem) =>
  getDatabaseItems(uid, shipListId).child(idItem);
const setItem = (uid, shipListId, idItem, values) =>
  getItem(uid, shipListId, idItem).set(values);
export const addItem = (uid, shipListId, idItem, item) =>
  setItem(uid, shipListId, idItem, item).then(() => ({
    ...item,
    id: idItem
  }));
export const removeItem = (uid, shipListId, idItem) =>
  getItem(uid, shipListId, idItem)
    .remove()
    .then(() => ({ shipListId, id: idItem }));
export const editItem = (
  uid,
  shipListId,
  idItem,
  { id: idField, ...otherFields }
) =>
  setItem(uid, shipListId, idItem, otherFields).then(() => ({
    updates: otherFields,
    id: idItem
  }));
