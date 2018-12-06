import { mapObjectToList } from "./utils";
import { getDatabaseUser } from "./user";
import createBasicRegistry from "./createBasicRegistry";

const path = "/shipLists";

const basicShipListApi = createBasicRegistry(path);

const newId = basicShipListApi.newId;
const add = basicShipListApi.add;
const edit = basicShipListApi.edit;
const remove = basicShipListApi.remove;

const getDatabaseAllShipLists = uid => getDatabaseUser(uid).child(path);
const getDatabaseShipList = (uid, shipListId) =>
  getDatabaseAllShipLists(uid).child(shipListId);

const mapItemsInShipListList = shipListList => {
  return shipListList.map(shipList => ({
    ...shipList,
    items: shipList.items ? mapObjectToList(shipList.items, "id") : []
  }));
};
const mapObjectShipListToList = object => {
  return mapItemsInShipListList(mapObjectToList(object, "id"));
};
const getAll = uid =>
  basicShipListApi
    .getAll(uid)
    .then(shipList => mapItemsInShipListList(shipList));
let dicListenChanges = {};
const startListenChanges = (uid, listenCallBack) => {
  if (!dicListenChanges[listenCallBack]) {
    const listenChanges = snapshot => {
      if (listenCallBack) {
        listenCallBack(mapObjectShipListToList(snapshot.val()));
      }
    };
    dicListenChanges[listenCallBack] = listenChanges;
    getDatabaseAllShipLists(uid).on("value", listenChanges);
  }
};
const stopListenChanges = (uid, listenCallBack) => {
  if (dicListenChanges[listenCallBack]) {
    const listenChanges = dicListenChanges[listenCallBack];
    getDatabaseAllShipLists(uid).off("value", listenChanges);
  }
};

const getDatabaseItems = (uid, shipListId) =>
  getDatabaseShipList(uid, shipListId).child("items");

const newIdItem = (uid, shipListId) =>
  getDatabaseItems(uid, shipListId).push().key;

const getItem = (uid, shipListId, idItem) =>
  getDatabaseItems(uid, shipListId).child(idItem);
const addItem = (uid, shipListId, idItem, item) =>
  getItem(uid, shipListId, idItem)
    .set(item)
    .then(() => ({
      ...item,
      id: idItem
    }));
const removeItem = (uid, shipListId, idItem) =>
  getItem(uid, shipListId, idItem)
    .remove()
    .then(() => ({ shipListId, id: idItem }));
const editItem = (uid, shipListId, idItem, { id: idField, ...otherFields }) =>
  getItem(uid, shipListId, idItem)
    .update(otherFields)
    .then(() => ({
      updates: otherFields,
      id: idItem
    }));

export default {
  newId,
  add,
  edit,
  remove,
  getAll,
  startListenChanges,
  stopListenChanges,
  newIdItem,
  addItem,
  removeItem,
  editItem
};
