export const TOGGLE_MENU = 'TOGGLE_MENU';
export const UPDATE_SMUP = 'UPDATE_SMUP';
export const UPDATE_SHIPLIST_SELECTED = 'UPDATE_SHIPLIST_SELECTED';

export function toggleMenu() {
  return { type: TOGGLE_MENU}
}
export function smUp(smUp) {
  return { type: UPDATE_SMUP, smUp}
}
export function updateShipListSelected(shipListIdSelected) {
  return { type: UPDATE_SHIPLIST_SELECTED, shipListIdSelected}
}