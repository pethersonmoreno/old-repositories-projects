import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { operations as operationsCategories } from 'state/ducks/categories';
import { operations as operationsProductTypes } from 'state/ducks/productTypes';
import { operations as operationsProducts } from 'state/ducks/products';
import { operations as operationsShipLists } from 'state/ducks/shipLists';
import MainTemplate from './MainTemplate';

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCategories: operationsCategories.getCategories,
    getProductTypes: operationsProductTypes.getProductTypes,
    getProducts: operationsProducts.getProducts,
    getShipLists: operationsShipLists.getShipLists,
  },
  dispatch,
);
const MainTemplateContainer = connect(
  null,
  mapDispatchToProps,
)(MainTemplate);
export default withRouter(MainTemplateContainer);
