import { useSelector } from 'react-redux';

export const useShowMenu = () => useSelector(state => state.app.showMenu);
export const usePageTitle = () => useSelector(state => state.app.pageTitle);
