import { combineReducers } from 'redux'
import {TOGGLE_MENU, UPDATE_SMUP} from '../actions'
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
      {smUp:!state.smUp}
    );
  }
  return state
}
export default combineReducers({
  menu
});