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
// new Promise(resolve => {
//   const shipList = data.shipLists.find(s => s.id === shipListId);
//   if (shipList === undefined) return;

//   const shipListItem = data.shipListItems.find(item => item.id === idItem);
//   if (shipListItem !== undefined) {
//     data.shipListItems.splice(data.shipListItems.indexOf(shipListItem), 1, {
//       ...shipListItem,
//       ...updates,
//       shipListId
//     });
//   }
//   resolve({
//     id: shipListId,
//     shipList: {
//       ...shipList,
//       items: data.shipListItems.filter(
//         item => item.shipListId === shipList.id
//       )
//     }
//   });
// });

export const addItem = (shipListId, item) =>
  editItem(shipListId, getDatabaseItems(shipListId).push().key, item).then(
    ({ id, updates }) => ({
      ...updates,
      id
    })
  );
// new Promise(resolve => {
//   const shipList = data.shipLists.find(s => s.id === shipListId);
//   if (shipList === undefined) return;
//   const idItem = data.shipListItems.length + 1;
//   const newShipListItem = { id: idItem, ...item, shipListId };
//   data.shipListItems.push(newShipListItem);
//   resolve({
//     id: shipListId,
//     shipList: {
//       ...shipList,
//       items: data.shipListItems.filter(
//         shipListItem => shipListItem.shipListId === shipList.id
//       )
//     }
//   });
// });
