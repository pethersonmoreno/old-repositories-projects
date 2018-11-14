import types from './types';

const addProductType = productType => ({
  type: types.ADD_PRODUCT_TYPE,
  productType,
});
const removeProductType = id => ({
  type: types.REMOVE_PRODUCT_TYPE,
  id,
});
const editProductType = (id, updates) => ({
  type: types.EDIT_PRODUCT_TYPE,
  id,
  updates,
});
const getProductTypes = productTypes => ({
  type: types.GET_PRODUCT_TYPES,
  productTypes,
});
export default {
  addProductType,
  removeProductType,
  editProductType,
  getProductTypes,
};
