import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { operations } from 'state/ducks/data';
import { operations as operationsCategories } from 'state/ducks/categories';
import { operations as operationsProductTypes } from 'state/ducks/productTypes';
import { operations as operationsProducts } from 'state/ducks/products';
import MainTemplate from './MainTemplate';

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadInitialData: operations.loadInitialData,
    getCategories: operationsCategories.getCategories,
    getProductTypes: operationsProductTypes.getProductTypes,
    getProducts: operationsProducts.getProducts,
  },
  dispatch,
);
const MainTemplateContainer = connect(
  null,
  mapDispatchToProps,
)(MainTemplate);
export default withRouter(MainTemplateContainer);
