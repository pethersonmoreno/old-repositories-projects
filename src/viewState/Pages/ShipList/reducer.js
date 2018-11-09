import { START_SHIPLIST, UPDATE_SHIPLIST_SELECTED } from './actionTypes';
import { shipLists } from '../../data';

const initialState = { shipLists: undefined, shipListIdSelected: undefined };
export default (state = initialState, action) => {
  if (action.type === START_SHIPLIST) {
    if (state.shipLists === undefined) {
      let newShipListIdSelected = state.shipListIdSelected;
      if (shipLists.length > 0) {
        newShipListIdSelected = shipLists[0].id;
      }
      return { ...state, shipLists, shipListIdSelected: newShipListIdSelected };
    }
  }
  if (action.type === UPDATE_SHIPLIST_SELECTED) {
    return { ...state, shipListIdSelected: action.shipListIdSelected };
  }
  return state;
};
