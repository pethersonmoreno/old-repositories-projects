import { combineReducers } from 'redux'
import {TOGGLE_MENU} from '../actions'
export function menuOpen(state = false, action){
  if(action.type === TOGGLE_MENU){
    return !state;
  }
  return state
}
export default combineReducers({
  menuOpen
});