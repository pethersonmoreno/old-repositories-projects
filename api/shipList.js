import * as data from './data';

export const add = shipList => new Promise((resolve) => {
  const id = data.shipLists.length + 1;
  const newShipList = { id, ...shipList, items: [] };
  data.shipLists.push(newShipList);
  resolve(newShipList);
});
export const remove = id => new Promise((resolve) => {
  const shipList = data.shipLists.find(cat => cat.id === id);
  if (shipList !== undefined) {
    data.shipLists.splice(data.shipLists.indexOf(shipList), 1);
  }
  resolve(id);
});
export const edit = (id, updates) => new Promise((resolve) => {
  const shipList = data.shipLists.find(cat => cat.id === id);
  if (shipList !== undefined) {
    data.shipLists.splice(data.shipLists.indexOf(shipList), 1, { ...shipList, updates });
  }
  resolve({ id, updates });
});
export const getAll = () => new Promise((resolve) => {
  resolve(
    data.shipLists.map(shipList => ({
      ...shipList,
      items: data.shipListItems.filter(shipListItem => shipListItem.shipListId === shipList.id),
    })),
  );
});
export const addItem = (shipListId, item) => new Promise((resolve) => {
  const shipList = data.shipLists.find(s => s.id === shipListId);
  if (shipList === undefined) return;
  const idItem = data.shipListItems.length + 1;
  const newShipListItem = { id: idItem, ...item, shipListId };
  data.shipListItems.push(newShipListItem);
  resolve({
    id: shipListId,
    shipList: {
      ...shipList,
      items: data.shipListItems.filter(shipListItem => shipListItem.shipListId === shipList.id),
    },
  });
});
export const editItem = (shipListId, idItem, updates) => new Promise((resolve) => {
  const shipList = data.shipLists.find(s => s.id === shipListId);
  if (shipList === undefined) return;

  const shipListItem = data.shipListItems.find(item => item.id === idItem);
  if (shipListItem !== undefined) {
    data.shipListItems.splice(data.shipListItems.indexOf(shipListItem), 1, {
      ...shipListItem,
      ...updates,
      shipListId,
    });
  }
  resolve({
    id: shipListId,
    shipList: {
      ...shipList,
      items: data.shipListItems.filter(item => item.shipListId === shipList.id),
    },
  });
});
