import { types } from '../constants';

const defaultState = {
  showMenu: false,
  pageTitle: '',
};

const reducerApp = (state = defaultState, action) => {
  if (action.type === types.SET_PAGE_TITLE) {
    return { ...state, pageTitle: action.payload.pageTitle };
  }
  if (action.type === types.TOGGLE_MENU) {
    return { ...state, showMenu: !state.showMenu };
  }
  if (action.type === types.HIDE_MENU) {
    return { ...state, showMenu: false };
  }
  return state;
};

export default reducerApp;
