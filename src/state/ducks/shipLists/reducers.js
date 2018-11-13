import { combineReducers } from 'redux';
import types from './types';
/* State Shape
{
    shipLists: array,
    shipListIdSelected: number
}
*/
const shipLists = (state = [], action) => {
  switch (action.type) {
    case types.ADD_SHIPLIST:
      return [...state, action.shipList];
    case types.REMOVE_SHIPLIST:
      return state.filter(({ id }) => id !== action.id);
    case types.EDIT_SHIPLIST:
      return state.map((shipList) => {
        if (shipList.id === action.id) {
          return {
            ...shipList,
            ...action.updates,
          };
        }
        return shipList;
      });
    case types.GET_SHIPLISTS:
      return action.shipLists;
    default:
      return state;
  }
};
const shipListIdSelected = (state = null, action) => {
  if (action.type === types.UPDATE_SHIPLIST_SELECTED) {
    return action.shipListIdSelected;
  }
  return state;
};
const reducer = combineReducers({
  shipLists,
  shipListIdSelected,
});
export default reducer;
