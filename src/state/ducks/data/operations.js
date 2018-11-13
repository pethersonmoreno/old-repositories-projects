import {
  getAllShipLists,
  getAllShipListItems,
  getAllCategories,
  getAllProducts,
  getAllProductTypes,
  getAllSizes,
  getAllBrands,
} from 'api';
import actions from './actions';

const loadInitialData = () => (dispatch) => {
  const shipLists = getAllShipLists();
  const shipListItems = getAllShipListItems();
  const categories = getAllCategories();
  const products = getAllProducts();
  const productTypes = getAllProductTypes();
  const sizes = getAllSizes();
  const brands = getAllBrands();
  dispatch(actions.updateShiplists({ shipLists }));
  dispatch(actions.updateShiplistItems({ shipListItems }));
  dispatch(actions.updateProducts({ products }));
  dispatch(actions.updateProductTypes({ productTypes }));
  dispatch(actions.updateCategories({ categories }));
  dispatch(actions.updateSizes({ sizes }));
  dispatch(actions.updateBrands({ brands }));
};
export default {
  loadInitialData,
};
