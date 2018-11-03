import { combineReducers } from 'redux'
import {TOGGLE_MENU, UPDATE_SMUP} from '../actions'
import * as shipList from '../Pages/shipList'
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

export default combineReducers({
  menu,
  [shipList.constants.NAME]: shipList.reducer
});