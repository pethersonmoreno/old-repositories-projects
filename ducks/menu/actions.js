import types from './types';

const toggleMenu = () => dispatch => dispatch({ type: types.TOGGLE_MENU });
const updateSmUp = smUp => dispatch => dispatch({ type: types.UPDATE_SMUP, payload: { smUp } });
export default { toggleMenu, updateSmUp };
