import {UPDATE_SHIPLIST_SELECTED} from './actionTypes';
const initialState = {shipListIdSelected: undefined};
export default (state = initialState, action)=>{
  if(action.type === UPDATE_SHIPLIST_SELECTED){
    return Object.assign(
      {},
      state,
      {shipListIdSelected:action.shipListIdSelected}
    );
  }
  return state;
}