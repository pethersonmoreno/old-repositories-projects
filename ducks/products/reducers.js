import types from "./types";

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_PRODUCT:
      return [...state, action.product];
    case types.REMOVE_PRODUCT:
      return state.filter(({ id }) => id !== action.id);
    case types.EDIT_PRODUCT:
      return state.map(product => {
        if (product.id === action.id) {
          return {
            ...product,
            ...action.updates
          };
        }
        return product;
      });
    case types.GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
