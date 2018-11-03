import {UPDATE_SHIPLIST_SELECTED} from './actionTypes';
export const updateShipListSelected = 
  shipListIdSelected=>
    dispatch=>
      dispatch({ type: UPDATE_SHIPLIST_SELECTED, shipListIdSelected});