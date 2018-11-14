import * as data from './data';

export const add = productType => new Promise((resolve) => {
  const id = data.productTypes.length + 1;
  const newProductType = { ...productType, id };
  data.productTypes.push(newProductType);
  resolve(newProductType);
});
export const remove = id => new Promise((resolve) => {
  const productType = data.productTypes.find(item => item.id === id);
  if (productType !== undefined) {
    data.productTypes.splice(data.productTypes.indexOf(productType), 1);
  }
  resolve(id);
});
export const edit = (id, updates) => new Promise((resolve) => {
  const productType = data.productTypes.find(item => item.id === id);
  if (productType !== undefined) {
    data.productTypes.splice(data.productTypes.indexOf(productType), 1, {
      ...productType,
      updates,
    });
  }
  resolve({ id, updates });
});
export const getAll = () => new Promise((resolve) => {
  resolve(data.productTypes.map(c => c));
});
