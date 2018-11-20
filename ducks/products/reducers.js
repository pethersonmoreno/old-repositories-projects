import { FULFILLED } from "redux-promise-middleware";
import typeToReducer from "type-to-reducer";
import types from "./types";

export default typeToReducer(
  {
    [types.ADD_PRODUCT]: {
      [FULFILLED]: (state, action) => {
        if (!state.find(({ id }) => id === action.payload.id)) {
          return [...state, action.payload];
        }
        return state;
      }
    },
    [types.REMOVE_PRODUCT]: {
      [FULFILLED]: (state, action) =>
        state.filter(({ id }) => id !== action.payload.id)
    },
    [types.EDIT_PRODUCT]: {
      [FULFILLED]: (state, action) =>
        state.map(product =>
          product.id === action.payload.id
            ? {
                ...product,
                ...action.payload.updates
              }
            : product
        )
    },
    [types.GET_PRODUCTS]: {
      [FULFILLED]: (state, action) => action.payload
    }
  },
  []
);
