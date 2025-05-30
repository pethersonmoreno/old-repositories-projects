import { PENDING, FULFILLED } from "redux-promise-middleware";
import typeToReducer from "type-to-reducer";

const createReducer = (types, name) => {
  const nameUpperCase = name.toUpperCase();
  return typeToReducer(
    {
      [types[`ADD_${nameUpperCase}`]]: {
        [FULFILLED]: (state, action) => {
          if (!state.find(({ id }) => id === action.payload.id)) {
            return [...state, action.payload];
          }
          return state;
        }
      },
      [types[`REMOVE_${nameUpperCase}`]]: {
        [PENDING]: (state, action) =>
          state.map(registry => {
            if (registry.id === action.meta.id) {
              return {
                id: registry.id,
                deleted: true
              };
            }
            return registry;
          })
      },
      [types[`REMOVE_COMPLETE_${nameUpperCase}`]]: {
        [PENDING]: (state, action) => {
          if (!state.find(({ id }) => id === action.meta.id)) {
            return [
              ...state,
              {
                id: action.meta.id,
                deleted: true,
                deletedPendingComplete: true
              }
            ];
          }
          return state;
        },
        [FULFILLED]: (state, action) =>
          state.filter(({ id }) => id !== action.payload.id)
      },
      [types[`EDIT_${nameUpperCase}`]]: {
        [FULFILLED]: (state, action) =>
          state.map(registry =>
            registry.id === action.payload.id
              ? {
                  ...registry,
                  ...action.payload.updates
                }
              : registry
          )
      },
      [types[`GET_${nameUpperCase}S`]]: {
        [FULFILLED]: (state, action) => action.payload
      }
    },
    []
  );
};
export default createReducer;
