import types from './types';

const addProduct = product => ({
  type: types.ADD_PRODUCT,
  product,
});
const removeProduct = id => ({
  type: types.REMOVE_PRODUCT,
  id,
});
const editProduct = (id, updates) => ({
  type: types.EDIT_PRODUCT,
  id,
  updates,
});
const getProducts = products => ({
  type: types.GET_PRODUCTS,
  products,
});
export default {
  addProduct,
  removeProduct,
  editProduct,
  getProducts,
};
