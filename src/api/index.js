import * as data from './data';
import * as category from './category';
import * as productType from './productType';

export const getAllShipLists = () => new Promise(resolve => resolve(data.shipLists));
export const getAllShipListItems = () => new Promise(resolve => resolve(data.shipListItems));
export const getAllProducts = () => new Promise(resolve => resolve(data.products));
export const getAllProductTypes = () => new Promise(resolve => resolve(data.productTypes));
export const getAllSizes = () => new Promise(resolve => resolve(data.sizes));
export const getAllBrands = () => new Promise(resolve => resolve(data.brands));

export { category, productType };
export default {
  category,
  productType,
  getAllShipLists,
  getAllShipListItems,
  getAllProducts,
  getAllProductTypes,
  getAllSizes,
  getAllBrands,
};
