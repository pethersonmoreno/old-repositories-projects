import { types } from '../constants';

export const toggleMenu = () => ({
  type: types.TOGGLE_MENU,
});

export const hideMenu = () => ({
  type: types.HIDE_MENU,
});

export const setPageTitle = pageTitle => ({
  type: types.SET_PAGE_TITLE,
  payload: { pageTitle }
});
