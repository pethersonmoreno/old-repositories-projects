import { product as productApi } from 'api';
import actions from './actions';

const addProduct = newProduct => (dispatch, getState) => {
  productApi.add(newProduct).then((product) => {
    const { productTypes } = getState();
    const productWithProductType = {
      ...product,
      productType: productTypes.find(productType => productType.id === product.productTypeId),
    };
    dispatch(actions.addProduct(productWithProductType));
  });
};
const removeProduct = id => (dispatch) => {
  productApi.remove(id).then(() => {
    dispatch(actions.removeProduct(id));
  });
};
const editProduct = (id, updates) => (dispatch, getState) => {
  productApi.edit(id, updates).then(() => {
    const { productTypes } = getState();
    const updatesWithProductType = {
      ...updates,
      productType: productTypes.find(productType => productType.id === updates.productTypeId),
    };
    dispatch(actions.editProduct(id, updatesWithProductType));
  });
};
const getProducts = () => (dispatch) => {
  productApi.getAll().then((products) => {
    dispatch(actions.getProducts(products));
  });
};
export default {
  addProduct,
  removeProduct,
  editProduct,
  getProducts,
};
