import { combineReducers } from 'redux';
import types from './types';
/* State Shape
{
  shipLists: array,
  shipListItems: array,
  products: array,
  productTypes: array,
  categories: array,
  sizes: array,
  brands: array,
}
*/
const shipLists = (state = [], action) => {
  if (action.type === types.UPDATE_SHIPLISTS) {
    return action.payload.shipLists;
  }
  return state;
};
const shipListItems = (state = [], action) => {
  if (action.type === types.UPDATE_SHIPLIST_ITEMS) {
    return action.payload.shipListItems;
  }
  return state;
};
const products = (state = [], action) => {
  if (action.type === types.UPDATE_PRODUCTS) {
    return action.payload.products;
  }
  return state;
};
const productTypes = (state = [], action) => {
  if (action.type === types.UPDATE_PRODUCT_TYPES) {
    return action.payload.productTypes;
  }
  return state;
};
const categories = (state = [], action) => {
  if (action.type === types.UPDATE_CATEGORIES) {
    return action.payload.categories;
  }
  return state;
};
const sizes = (state = [], action) => {
  if (action.type === types.UPDATE_SIZES) {
    return action.payload.sizes;
  }
  return state;
};
const brands = (state = [], action) => {
  if (action.type === types.UPDATE_BRANDS) {
    return action.payload.brands;
  }
  return state;
};
const reducer = combineReducers({
  shipLists,
  shipListItems,
  products,
  productTypes,
  categories,
  sizes,
  brands,
});
export default reducer;
