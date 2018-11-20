import { productType as productTypeApi } from "../../api";
import actions from "./actions";

const addProductType = newProductType => dispatch => {
  productTypeApi
    .add(productTypeApi.newId(), newProductType)
    .then(productType => {
      // Removed because is is using listenChanges
      // dispatch(actions.addProductType(productType));
    });
};
const removeProductType = id => dispatch => {
  productTypeApi.remove(id).then(() => {
    // Removed because is is using listenChanges
    // dispatch(actions.removeProductType(id));
  });
};
const editProductType = (id, updates) => dispatch => {
  productTypeApi.edit(id, updates).then(() => {
    // Removed because is is using listenChanges
    // dispatch(actions.editProductType(id, updates));
  });
};
const getProductTypes = () => (dispatch, getState) => {
  productTypeApi.startListenChanges(productTypes => {
    dispatch(actions.getProductTypes(productTypes));
  });
};
export default {
  addProductType,
  removeProductType,
  editProductType,
  getProductTypes
};
