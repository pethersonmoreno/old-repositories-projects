import createUseSharedStateHook from './factories/createUseSharedStateHook';
import localStorage from '../../helpers/localStorage';

const LOCAL_STORAGE_NAME = 'auth';

const initialState = {
  loading: true,
  authenticated: false,
  userProfile: null,
  token: null,
  isValidEmail: false,
  showSidebar: false,
  pageTitle: '',
};
const propertiesName = Object.keys(initialState);

const currentState = {
  ...initialState,
  ...localStorage.getPartialItem(LOCAL_STORAGE_NAME, propertiesName)
};

const {
  getState,
  setState: setStateGenerated,
  useState: useAuthState,
} = createUseSharedStateHook(currentState);

const setState = data => {
  setStateGenerated(data);
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(getState()));
};

export {
  initialState,
  getState,
  setState,
};

export default useAuthState;
