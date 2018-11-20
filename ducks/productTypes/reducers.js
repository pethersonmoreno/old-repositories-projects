import { FULFILLED } from "redux-promise-middleware";
import typeToReducer from "type-to-reducer";
import types from "./types";

export default typeToReducer(
  {
    [types.ADD_PRODUCT_TYPE]: {
      [FULFILLED]: (state, action) => {
        if (!state.find(({ id }) => id === action.payload.id)) {
          return [...state, action.payload];
        }
        return state;
      }
    },
    [types.REMOVE_PRODUCT_TYPE]: {
      [FULFILLED]: (state, action) =>
        state.filter(({ id }) => id !== action.payload.id)
    },
    [types.EDIT_PRODUCT_TYPE]: {
      [FULFILLED]: (state, action) =>
        state.map(productType =>
          productType.id === action.payload.id
            ? {
                ...productType,
                ...action.payload.updates
              }
            : productType
        )
    },
    [types.GET_PRODUCT_TYPES]: {
      [FULFILLED]: (state, action) => action.payload
    }
  },
  []
);
