import { combineReducers } from 'redux';
import types from './types';
/* State Shape
{
    shipLists: array,
    shipListIdSelected: number
}
*/
const shipListsReducer = (state = null, action) => {
  if (action.type === types.UPDATE_SHIPLIST) {
    return action.payload.shipLists;
  }
  return state;
};
const shipListIdSelectedReducer = (state = null, action) => {
  if (action.type === types.UPDATE_SHIPLIST_SELECTED) {
    return action.payload.shipListIdSelected;
  }
  return state;
};
const reducer = combineReducers({
  shipLists: shipListsReducer,
  shipListIdSelected: shipListIdSelectedReducer,
});
export default reducer;
