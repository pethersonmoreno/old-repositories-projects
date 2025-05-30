import { FULFILLED, REJECTED } from "redux-promise-middleware";
import typeToReducer from "type-to-reducer";
import types from "./types";

const initialState = {
  loggedIn: false,
  uid: null,
  email: null,
  emailVerified: false,
  loginInvalidated: false
};
export default typeToReducer(
  {
    [types.SIGN_IN]: {
      [FULFILLED]: (state, action) => ({
        ...state,
        loggedIn: true,
        uid: action.payload.uid,
        email: action.payload.email,
        emailVerified: action.payload.emailVerified,
        loginInvalidated: false
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
