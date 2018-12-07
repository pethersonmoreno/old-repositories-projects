const saveProductInStores = (uid, productId, allProductsInStores, productInStores, operations) => {
  const { addProductInStore, editProductInStore, removeProductInStore } = operations;
  const currentProductInStores = allProductsInStores.filter(p => p.productId === productId);
  const promises = [
    ...currentProductInStores
      .filter(currentP => !productInStores.find(p => p.id === currentP.id))
      .map(({ id }) => removeProductInStore(uid, id)),
    ...productInStores
      .map(productInStore => ({ ...productInStore, productId }))
      .map(({ id, ...fields }) => {
        if (id) {
          return editProductInStore(uid, id, fields);
        }
        return addProductInStore(uid, fields);
      }),
  ];
  return Promise.all(promises);
};
export default saveProductInStores;
