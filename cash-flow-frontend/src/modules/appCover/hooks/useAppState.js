import createUseSharedStateHook from '../../utils/hookFactories/createUseSharedStateHook';
import localStorage from '../../utils/helpers/localStorage';

const LOCAL_STORAGE_NAME = 'app';

const initialState = {
  showMenu: false,
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
  useState: useAppState,
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

export default useAppState;
