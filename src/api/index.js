import * as data from './data';
import * as category from './category';
import * as productType from './productType';
import * as product from './product';
import * as shipList from './shipList';

export const getAllShipListItems = () => new Promise(resolve => resolve(data.shipListItems));

export {
  category, productType, product, shipList,
};
export default {
  category,
  productType,
  product,
  shipList,
  getAllShipListItems,
};
