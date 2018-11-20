import { FULFILLED } from "redux-promise-middleware";
import typeToReducer from "type-to-reducer";
import types from "./types";

export default typeToReducer(
  {
    [types.ADD_CATEGORY]: {
      [FULFILLED]: (state, action) => {
        if (!state.find(({ id }) => id === action.payload.id)) {
          return [...state, action.payload];
        }
        return state;
      }
    },
    [types.REMOVE_CATEGORY]: {
      [FULFILLED]: (state, action) =>
        state.filter(({ id }) => id !== action.payload.id)
    },
    [types.EDIT_CATEGORY]: {
      [FULFILLED]: (state, action) =>
        state.map(category =>
          category.id === action.payload.id
            ? {
                ...category,
                ...action.payload.updates
              }
            : category
        )
    },
    [types.GET_CATEGORIES]: (state, action) => action.payload
  },
  []
);
