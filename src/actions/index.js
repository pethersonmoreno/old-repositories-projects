export const TOGGLE_MENU = 'TOGGLE_MENU';
export const UPDATE_SMUP = 'UPDATE_SMUP';

export function toggleMenu() {
  return { type: TOGGLE_MENU}
}
export function smUp(smUp) {
  return { type: UPDATE_SMUP, smUp}
}