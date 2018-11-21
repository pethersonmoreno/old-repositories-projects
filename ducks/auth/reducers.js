import { FULFILLED, REJECTED } from "redux-promise-middleware";
import typeToReducer from "type-to-reducer";
import types from "./types";

export default typeToReducer(
  {
    [types.SIGN_IN]: {
      [FULFILLED]: (state, action) => ({
        loggedIn: true,
        email: action.payload.email
      }),
      [REJECTED]: (state, action) => ({
        loggedIn: false,
        email: null
      })
    },
    [types.SIGN_OUT]: {
      [FULFILLED]: (state, action) => ({
        loggedIn: false,
        email: null
      })
    }
  },
  {
    loggedIn: false,
    email: null
  }
);
