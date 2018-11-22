import { FULFILLED, REJECTED } from "redux-promise-middleware";
import typeToReducer from "type-to-reducer";
import types from "./types";

export default typeToReducer(
  {
    [types.SIGN_IN]: {
      [FULFILLED]: (state, action) => ({
        ...state,
        loginInvalidated: false,
        loggedIn: true,
        email: action.payload.email
      }),
      [REJECTED]: (state, action) => ({
        ...state,
        loggedIn: false,
        email: null
      })
    },
    [types.SIGN_OUT]: {
      [FULFILLED]: (state, action) => ({
        ...state,
        loginInvalidated: false,
        loggedIn: false,
        email: null
      })
    },
    [types.LOGIN_INVALIDATED]: (state, action) => ({
      ...state,
      loggedIn: false,
      email: null,
      loginInvalidated: true
    })
  },
  {
    loggedIn: false,
    email: null,
    loginInvalidated: false
  }
);
