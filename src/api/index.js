import * as data from './data';

export const getAllShipLists = () => data.shipLists;
export const getAllShipListItems = () => data.shipListItems;
export const getAllCategories = () => data.categories;
export const getAllProducts = () => data.products;
export const getAllProductTypes = () => data.productTypes;
export const getAllSizes = () => data.sizes;
export const getAllBrands = () => data.brands;
export default {
  getAllShipLists,
  getAllShipListItems,
  getAllCategories,
  getAllProducts,
  getAllProductTypes,
  getAllSizes,
  getAllBrands,
};
