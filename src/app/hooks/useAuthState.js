import createUseSharedStateHook from './factories/createUseSharedStateHook';

const initialState = {
  startedAuth: null,
  loading: null,
  authenticated: false,
  userProfile: null,
  token: null,
  isValidEmail: null,
  showSidebar: false,
  pageTitle: '',
};

const currentState = {
  ...initialState,
  ...JSON.parse(localStorage.getItem('auth'))
};


const {
  getState,
  setState: setStateGenerated,
  useState: useAuthState,
} = createUseSharedStateHook(currentState);

const setState = data => {
  setStateGenerated(data);
  localStorage.setItem('auth', JSON.stringify(getState()));
};

export {
  initialState,
  getState,
  setState,
};

export default useAuthState;
