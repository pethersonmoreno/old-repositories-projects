import * as data from './data';

export const getAllShipLists = () => new Promise(resolve => resolve(data.shipLists));
export const getAllShipListItems = () => new Promise(resolve => resolve(data.shipListItems));
export const getAllProducts = () => new Promise(resolve => resolve(data.products));
export const getAllProductTypes = () => new Promise(resolve => resolve(data.productTypes));
export const getAllSizes = () => new Promise(resolve => resolve(data.sizes));
export const getAllBrands = () => new Promise(resolve => resolve(data.brands));
export const addCategory = category => new Promise((resolve) => {
  const id = data.categories.length + 1;
  const newCategory = { id, ...category };
  data.categories.push(newCategory);
  resolve(newCategory);
});
export const removeCategory = id => new Promise((resolve) => {
  const category = data.categories.find(cat => cat.id === id);
  if (category !== undefined) {
    data.categories.splice(data.categories.indexOf(category), 1);
  }
  resolve(id);
});
export const editCategory = (id, updates) => new Promise((resolve) => {
  const category = data.categories.find(cat => cat.id === id);
  if (category !== undefined) {
    data.categories.splice(data.categories.indexOf(category), 1, { ...category, updates });
  }
  resolve({ id, updates });
});
export const getAllCategories = () => new Promise((resolve) => {
  resolve(data.categories.map(c => c));
});

export default {
  getAllShipLists,
  getAllShipListItems,
  getAllCategories,
  getAllProducts,
  getAllProductTypes,
  getAllSizes,
  getAllBrands,
};
