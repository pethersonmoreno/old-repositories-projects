import types from './types';

const updateShiplists = ({ shipLists }) => ({
  type: types.UPDATE_SHIPLISTS,
  payload: { shipLists },
});
const updateShiplistItems = ({ shipListItems }) => ({
  type: types.UPDATE_SHIPLIST_ITEMS,
  payload: { shipListItems },
});
const updateProducts = ({ products }) => ({
  type: types.UPDATE_PRODUCTS,
  payload: { products },
});
const updateProductTypes = ({ productTypes }) => ({
  type: types.UPDATE_PRODUCT_TYPES,
  payload: { productTypes },
});
const updateCategories = ({ categories }) => ({
  type: types.UPDATE_CATEGORIES,
  payload: { categories },
});
const updateSizes = ({ sizes }) => ({
  type: types.UPDATE_SIZES,
  payload: { sizes },
});
const updateBrands = ({ brands }) => ({
  type: types.UPDATE_BRANDS,
  payload: { brands },
});
export default {
  updateShiplists,
  updateShiplistItems,
  updateProducts,
  updateProductTypes,
  updateCategories,
  updateSizes,
  updateBrands,
};
