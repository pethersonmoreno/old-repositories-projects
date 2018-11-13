import { productType as productTypeApi } from 'api';
import actions from './actions';

const addProductType = newProductType => (dispatch) => {
  productTypeApi.add(newProductType).then((productType) => {
    dispatch(actions.addProductType(productType));
  });
};
const removeProductType = id => (dispatch) => {
  productTypeApi.remove(id).then(() => {
    dispatch(actions.removeProductType(id));
  });
};
const editProductType = (id, updates) => (dispatch) => {
  productTypeApi.edit(id, updates).then(() => {
    dispatch(actions.editProductType(id, updates));
  });
};
const getProductTypes = () => (dispatch) => {
  productTypeApi.getAll().then((productTypes) => {
    dispatch(actions.getProductTypes(productTypes));
  });
};
export default {
  addProductType,
  removeProductType,
  editProductType,
  getProductTypes,
};
