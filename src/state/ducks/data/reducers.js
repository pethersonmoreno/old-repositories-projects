import { combineReducers } from 'redux';
import types from './types';
/* State Shape
{
  shipLists: array,
  shipListItems: array,
}
*/
const shipLists = (state = [], action) => {
  if (action.type === types.UPDATE_SHIPLISTS) {
    return action.payload.shipLists;
  }
  return state;
};
const shipListItems = (state = [], action) => {
  if (action.type === types.UPDATE_SHIPLIST_ITEMS) {
    return action.payload.shipListItems;
  }
  return state;
};
const reducer = combineReducers({
  shipLists,
  shipListItems,
});
export default reducer;
