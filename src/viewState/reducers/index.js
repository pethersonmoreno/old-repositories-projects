import { combineReducers } from 'redux'
import {TOGGLE_MENU, UPDATE_SMUP, UPDATE_SHIPLIST_SELECTED} from '../actions'
export function menu(state = {menuOpen:false,smUp:false}, action){
  if(action.type === TOGGLE_MENU){
    return Object.assign(
      {},
      state,
      {menuOpen:!state.menuOpen}
    );
  }
  if(action.type === UPDATE_SMUP){
    return Object.assign(
      {},
      state,
      {smUp:action.smUp}
    );
  }
  return state;
}
export function shipList(state = {shipListIdSelected: undefined}, action){
  if(action.type === UPDATE_SHIPLIST_SELECTED){
    return Object.assign(
      {},
      state,
      {shipListIdSelected:action.shipListIdSelected}
    );
  }
  return state;
}
export default combineReducers({
  menu,
  shipList
});