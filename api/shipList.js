import { database } from "./firebase";
import { mapObjectToList } from "./utils";
const databaseShipLists = database.ref("/shipLists");

export const remove = id =>
  databaseShipLists
    .child(id)
    .remove()
    .then(() => id);
export const edit = (id, { id: idField, ...otherFields }) =>
  databaseShipLists
    .child(id)
    .set({
      ...otherFields
    })
    .then(() => ({ id, updates: otherFields }));
export const add = shipList =>
  edit(databaseShipLists.push().key, shipList).then(({ id, updates }) => ({
    ...updates,
    id
  }));
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
export const listenChanges = listenCallBack => {
  databaseShipLists.on("value", snapshot => {
    if (listenCallBack) {
      listenCallBack(mapObjectShipListToList(snapshot.val()));
    }
  });
};

const getDatabaseItems = shipListId =>
  databaseShipLists.child(shipListId).child("items");
export const editItem = (shipListId, idItem, { id: idField, ...otherFields }) =>
  getDatabaseItems(shipListId)
    .child(idItem)
    .set({
      ...otherFields
    })
    .then(() => ({ id: idItem, updates: otherFields }));
export const addItem = (shipListId, item) =>
  editItem(shipListId, getDatabaseItems(shipListId).push().key, item).then(
    ({ id, updates }) => ({
      ...updates,
      id
    })
  );
