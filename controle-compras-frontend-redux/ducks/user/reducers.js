import { combineReducers } from "redux";
import { FULFILLED } from "redux-promise-middleware";
import typeToReducer from "type-to-reducer";
import authReducer from "./auth";
import types from "./types";

const userInfo = typeToReducer(
  {
    [types.EDIT_USER_INFO]: {
      [FULFILLED]: (state, action) => ({ ...state, ...action.payload })
    },
    [types.SEND_EMAIL_VERIFICATION]: {
      [FULFILLED]: (state, action) => ({
        ...state,
        sentEmailVerification: action.payload.sentEmailVerification
      })
    },
    [types.GET_USER_INFO]: {
      [FULFILLED]: (state, action) => ({ ...state, ...action.payload })
    }
  },
  {
    sentEmailVerification: false
  }
);
const userConfig = typeToReducer(
  {
    [types.EDIT_USER_CONFIG]: {
      [FULFILLED]: (state, action) => ({ ...state, ...action.payload })
    },
    [types.GET_USER_CONFIG]: {
      [FULFILLED]: (state, action) => ({ ...state, ...action.payload })
    }
  },
  {}
);

export default combineReducers({
  info: userInfo,
  config: userConfig,
  auth: authReducer
});
