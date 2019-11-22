import createUseSharedStateHook from './createUseSharedStateHook';

const startedAuth = JSON.parse(localStorage.getItem('startedAuth'));
const loading = JSON.parse(localStorage.getItem('loading'));
const userProfile = JSON.parse(localStorage.getItem('userProfile'));
const token = JSON.parse(localStorage.getItem('token'));
const isValidEmailBool = JSON.parse(localStorage.getItem('isValidEmail'));

const initialState = {
  startedAuth,
  loading,
  authenticated: !!userProfile,
  userProfile,
  token,
  isValidEmail: isValidEmailBool,
  showSidebar: false,
  pageTitle: '',
};

const {
  getState,
  setState,
  useState: useAuthState,
} = createUseSharedStateHook(initialState);

export {
  getState,
  setState,
};

export default useAuthState;
