import {
  getAllShipLists,
  getAllShipListItems,
  category,
  getAllProducts,
  getAllProductTypes,
  getAllSizes,
  getAllBrands,
} from 'api';
import actions from './actions';

const loadInitialData = () => (dispatch) => {
  getAllShipLists().then((shipLists) => {
    dispatch(actions.updateShiplists({ shipLists }));
  });
  getAllShipListItems().then((shipListItems) => {
    dispatch(actions.updateShiplistItems({ shipListItems }));
  });
  getAllProducts().then((products) => {
    dispatch(actions.updateProducts({ products }));
  });
  getAllProductTypes().then((productTypes) => {
    dispatch(actions.updateProductTypes({ productTypes }));
  });
  category.getAll().then((categories) => {
    dispatch(actions.updateCategories({ categories }));
  });
  getAllSizes().then((sizes) => {
    dispatch(actions.updateSizes({ sizes }));
  });
  getAllBrands().then((brands) => {
    dispatch(actions.updateBrands({ brands }));
  });
};
export default {
  loadInitialData,
};
