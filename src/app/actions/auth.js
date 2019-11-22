import { signInGoogleWithRedirect } from '../../api/auth';
import { setState } from '../states/useAuthState';

const updateLoading = loading => {
  localStorage.setItem('loading', JSON.stringify(loading));
  return setState({ loading });
};

const signIn = async () => {
  updateLoading(true);
  signInGoogleWithRedirect();
};


const toggleSideBar = () => {
  setState(prevState => ({ showSidebar: !prevState.showSidebar }));
};

const hideSideBar = () => {
  setState({ showSidebar: false });
};

const setPageTitle = pageTitle => {
  setState({ pageTitle });
};

export {
  updateLoading,
  signIn,
  toggleSideBar,
  hideSideBar,
  setPageTitle
};
