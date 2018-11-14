import * as data from './data';

export const add = product => new Promise((resolve) => {
  const id = data.products.length + 1;
  const newProduct = { ...product, id };
  data.products.push(newProduct);
  resolve(newProduct);
});
export const remove = id => new Promise((resolve) => {
  const product = data.products.find(item => item.id === id);
  if (product !== undefined) {
    data.products.splice(data.products.indexOf(product), 1);
  }
  resolve(id);
});
export const edit = (id, updates) => new Promise((resolve) => {
  const product = data.products.find(item => item.id === id);
  if (product !== undefined) {
    data.products.splice(data.products.indexOf(product), 1, {
      ...product,
      updates,
    });
  }
  resolve({ id, updates });
});
export const getAll = () => new Promise((resolve) => {
  resolve(
    data.products.map(product => ({
      ...product,
      productType: data.productTypes.find(
        productType => productType.id === product.productTypeId,
      ),
    })),
  );
});
