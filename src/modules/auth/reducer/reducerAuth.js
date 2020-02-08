import { types } from '../constants';

const initialState = {
  loading: true,
  authenticated: false,
  userProfile: null,
  token: null,
  isValidEmail: false,
};

const reducerAuth = (state = initialState, action) => {
  if (action.type === types.UPDATE_USER_PROFILE) {
    return {
      ...state,
      loading: false,
      authenticated: !!action.payload.userProfile,
      userProfile: action.payload.userProfile,
      token: action.payload.token,
      isValidEmail: action.payload.isValidEmail,
    };
  }
  if (action.type === types.START_AUTH_LOADING) {
    return {
      ...state,
      loading: true,
    };
  }
  return state;
};

export default reducerAuth;
