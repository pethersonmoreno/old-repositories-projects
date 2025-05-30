import { setState as setAppState } from '../hooks/useAppState';

const toggleMenu = () => {
  setAppState(prevState => ({ showMenu: !prevState.showMenu }));
};

const hideMenu = () => {
  setAppState({ showMenu: false });
};

const setPageTitle = pageTitle => {
  setAppState({ pageTitle });
};

export {
  toggleMenu,
  hideMenu,
  setPageTitle
};
