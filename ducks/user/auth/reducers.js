import { FULFILLED, REJECTED } from "redux-promise-middleware";
import typeToReducer from "type-to-reducer";
import types from "./types";

const initialState = {
  loggedIn: false,
  email: null,
  loginInvalidated: false,
  emailVerified: false
};
export default typeToReducer(
  {
    [types.SIGN_IN]: {
      [FULFILLED]: (state, action) => ({
        ...state,
        loginInvalidated: false,
        loggedIn: true,
        email: action.payload.email,
        emailVerified: action.payload.emailVerified
      }),
      [REJECTED]: (state, action) => initialState
    },
    [types.SIGN_OUT]: {
      [FULFILLED]: (state, action) => initialState
    },
    [types.LOGIN_INVALIDATED]: (state, action) => ({
      ...initialState,
      loginInvalidated: true
    })
  },
  initialState
);
