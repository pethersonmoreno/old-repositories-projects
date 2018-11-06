import {TOGGLE_MENU, UPDATE_SMUP} from './actionTypes';
const initialState = {menuOpen:false,smUp:false};
export default (state = initialState, action)=>{
  if(action.type === TOGGLE_MENU){
    return {...state, menuOpen:!state.menuOpen};
  }
  if(action.type === UPDATE_SMUP){
    if(state.smUp !== action.smUp){
      return {...state, smUp:action.smUp};
    }
  }
  return state;
}