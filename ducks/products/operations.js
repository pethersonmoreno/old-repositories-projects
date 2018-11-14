import {
  product as productApi,
  productType as productTypeApi
} from "../../api";
import actions from "./actions";

const sameProductWithProductTypeUpdated = (product, productTypes) => {
  return {
    ...product,
    productType: productTypes.find(
      productType => productType.id === product.productTypeId
    )
  };
};
const addProduct = newProduct => (dispatch, getState) => {
  productApi.add(newProduct).then(product => {
    // Removed because is is using listenChanges
    // const { productTypes } = getState();
    // dispatch(
    //   actions.addProduct(
    //     sameProductWithProductTypeUpdated(product, productTypes)
    //   )
    // );
  });
};
const removeProduct = id => dispatch => {
  productApi.remove(id).then(() => {
    // Removed because is is using listenChanges
    // dispatch(actions.removeProduct(id));
  });
};
const editProduct = (id, updates) => (dispatch, getState) => {
  productApi.edit(id, updates).then(() => {
    // Removed because is is using listenChanges
    // const { productTypes } = getState();
    // dispatch(
    //   actions.editProduct(
    //     id,
    //     sameProductWithProductTypeUpdated(updates, productTypes)
    //   )
    // );
  });
};
const updateProductsState = (dispatch, products, productTypes) => {
  dispatch(
    actions.getProducts(
      products.map(product =>
        sameProductWithProductTypeUpdated(product, productTypes)
      )
    )
  );
};
const getProducts = () => (dispatch, getState) => {
  productApi.listenChanges(products => {
    const { productTypes } = getState();
    updateProductsState(dispatch, products, productTypes);
  });
  productTypeApi.listenChanges(productTypes => {
    const { products } = getState();
    updateProductsState(dispatch, products, productTypes);
  }, "to-products-update");
};
export default {
  addProduct,
  removeProduct,
  editProduct,
  getProducts
};
