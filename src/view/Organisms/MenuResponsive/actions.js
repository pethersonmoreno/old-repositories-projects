import { TOGGLE_MENU, UPDATE_SMUP } from './actionTypes';

export const toggleMenu = () => dispatch => dispatch({ type: TOGGLE_MENU });
export const updateSmUp = smUp => dispatch => dispatch({ type: UPDATE_SMUP, smUp });
