import { store as storeApi } from "../api";
import createBasicDuckRegistry from "./createBasicDuckRegistry";
import { operations as operationsProductsInStores } from "./productsInStores";

const duckStores = createBasicDuckRegistry("store", storeApi);

const saveProductsInStore = (dispatch, getState) => (
  uid,
  storeId,
  productsInStore
) => {
  const { add, edit, remove } = operationsProductsInStores;
  const { productsInStores: allProductsInStores, products } = getState();
  const currentProductsInStore = allProductsInStores.filter(
    p => p.storeId === storeId
  );
  const productsInStorePrepared = productsInStore
    .filter(p => products.find(product => product.id === p.productId))
    .map(productInStore => ({
      ...productInStore,
      storeId
    }));
  const promises = [
    ...currentProductsInStore
      .filter(currentP => !productsInStore.find(p => p.id === currentP.id))
      .map(({ id }) => dispatch(remove(uid, id))),
    ...productsInStorePrepared
      .filter(p => p.id)
      .map(({ id, ...fields }) => dispatch(edit(uid, id, fields))),
    ...productsInStorePrepared
      .filter(p => !p.id)
      .map(({ id, ...fields }) => dispatch(add(uid, fields)))
  ];
  return Promise.all(promises);
};
const addWithProductsInStore = (uid, store, productsInStore) => async (
  dispatch,
  getState
) => {
  const { add } = duckStores.operations;
  const result = await dispatch(add(uid, store));
  await saveProductsInStore(dispatch, getState)(
    uid,
    result.value.id,
    productsInStore
  );
  return result;
};
const removeWithProductsInStore = (uid, storeId) => async (
  dispatch,
  getState
) => {
  const { remove } = duckStores.operations;
  const productsInStore = [];
  await saveProductsInStore(dispatch, getState)(uid, storeId, productsInStore);
  return dispatch(remove(uid, storeId));
};
const editWithProductsInStore = (
  uid,
  storeId,
  store,
  productsInStore
) => async (dispatch, getState) => {
  const { edit } = duckStores.operations;
  const result = await dispatch(edit(uid, storeId, store));
  await saveProductsInStore(dispatch, getState)(uid, storeId, productsInStore);
  return result;
};
const operations = {
  ...duckStores.operations,
  addWithProductsInStore,
  removeWithProductsInStore,
  editWithProductsInStore
};
export { operations };

export default duckStores.reducer;
