import { product as productApi } from "../api";
import createBasicDuckRegistry from "./createBasicDuckRegistry";
import { operations as operationsProductsInStores } from "./productsInStores";

const duckProducts = createBasicDuckRegistry("product", productApi);

const saveProductInStores = (dispatch, getState) => (
  uid,
  productId,
  productInStores
) => {
  const { add, edit, remove } = operationsProductsInStores;
  const { productsInStores: allProductsInStores } = getState();
  const currentProductInStores = allProductsInStores.filter(
    p => p.productId === productId
  );
  const promises = [
    ...currentProductInStores
      .filter(currentP => !productInStores.find(p => p.id === currentP.id))
      .map(({ id }) => dispatch(remove(uid, id))),
    ...productInStores
      .map(productInStore => ({ ...productInStore, productId }))
      .map(({ id, ...fields }) => {
        if (id) {
          return dispatch(edit(uid, id, fields));
        }
        return dispatch(add(uid, fields));
      })
  ];
  return Promise.all(promises);
};
const addWithProductInStores = (uid, product, productInStores) => async (
  dispatch,
  getState
) => {
  const { add } = duckProducts.operations;
  const result = await dispatch(add(uid, product));
  await saveProductInStores(dispatch, getState)(
    uid,
    result.value.id,
    productInStores
  );
  return result;
};
const removeWithProductInStores = (uid, productId) => async (
  dispatch,
  getState
) => {
  const { remove } = duckProducts.operations;
  const productInStores = [];
  await saveProductInStores(dispatch, getState)(
    uid,
    productId,
    productInStores
  );
  return dispatch(remove(uid, productId));
};
const editWithProductInStores = (
  uid,
  productId,
  product,
  productInStores
) => async (dispatch, getState) => {
  const { edit } = duckProducts.operations;
  const result = await dispatch(edit(uid, productId, product));
  await saveProductInStores(dispatch, getState)(
    uid,
    productId,
    productInStores
  );
  return result;
};
const operations = {
  ...duckProducts.operations,
  addWithProductInStores,
  removeWithProductInStores,
  editWithProductInStores
};
export { operations };

export default duckProducts.reducer;
