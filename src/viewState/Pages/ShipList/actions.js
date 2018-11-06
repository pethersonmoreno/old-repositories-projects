import {START_SHIPLIST, UPDATE_SHIPLIST_SELECTED} from './actionTypes';
export const startShiplist = 
  ()=>
    dispatch=>
      dispatch({ type: START_SHIPLIST});
export const updateShipListSelected = 
  shipListIdSelected=>
    dispatch=>
      dispatch({ type: UPDATE_SHIPLIST_SELECTED, shipListIdSelected});