import { FULFILLED } from "redux-promise-middleware";
import typeToReducer from "type-to-reducer";
import { combineReducers } from "redux";
import types from "./types";
/* State Shape
{
    shipLists: array,
    shipListIdSelected: number
}
*/
const shipLists = typeToReducer(
  {
    [types.ADD_SHIPLIST]: {
      [FULFILLED]: (state, action) => {
        if (!state.find(({ id }) => id === action.payload.id)) {
          return [...state, action.payload];
        }
        return state;
      }
    },
    [types.REMOVE_SHIPLIST]: {
      [FULFILLED]: (state, action) =>
        state.filter(({ id }) => id !== action.payload.id)
    },
    [types.EDIT_SHIPLIST]: {
      [FULFILLED]: (state, action) =>
        state.map(shipList =>
          shipList.id === action.payload.id
            ? {
                ...shipList,
                ...action.payload.updates
              }
            : shipList
        )
    },
    [types.GET_SHIPLISTS]: {
      [FULFILLED]: (state, action) => action.payload
    },
    [types.ADD_SHIPLIST_ITEM]: {
      [FULFILLED]: (state, action) =>
        state.map(shipList => {
          if (shipList.id === action.meta.shipListId) {
            if (
              !shipList.items ||
              !shipList.items.find(({ id }) => id === action.payload.id)
            ) {
              const newItems = shipList.items || [];
              newItems.push(action.payload);
              return { ...shipList, items: newItems };
            }
          }
          return shipList;
        })
    },
    [types.REMOVE_SHIPLIST_ITEM]: {
      [FULFILLED]: (state, action) =>
        state.map(shipList => {
          if (shipList.id === action.meta.shipListId) {
            return {
              ...shipList,
              items: shipList.items.filter(
                item => item.id !== action.payload.id
              )
            };
          }
          return shipList;
        })
    },
    [types.EDIT_SHIPLIST_ITEM]: {
      [FULFILLED]: (state, action) =>
        state.map(shipList => {
          if (shipList.id === action.meta.shipListId) {
            const newItems = (shipList.items || []).map(item =>
              item.id === action.payload.id
                ? {
                    ...item,
                    ...action.payload.updates
                  }
                : item
            );
            return { ...shipList, items: newItems };
          }
          return shipList;
        })
    }
  },
  []
);
const shipListIdSelected = (state = null, action) => {
  if (action.type === types.UPDATE_SHIPLIST_SELECTED) {
    return action.shipListIdSelected;
  }
  return state;
};
const reducer = combineReducers({
  shipLists,
  shipListIdSelected
});
export default reducer;
