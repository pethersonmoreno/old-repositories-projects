import types from './types';

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_PRODUCT_TYPE:
      return [...state, action.productType];
    case types.REMOVE_PRODUCT_TYPE:
      return state.filter(({ id }) => id !== action.id);
    case types.EDIT_PRODUCT_TYPE:
      return state.map((productType) => {
        if (productType.id === action.id) {
          return {
            ...productType,
            ...action.updates,
          };
        }
        return productType;
      });
    case types.GET_PRODUCT_TYPES:
      return action.productTypes;
    default:
      return state;
  }
};
