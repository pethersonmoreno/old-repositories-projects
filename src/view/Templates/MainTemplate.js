import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuResponsive from 'Organisms/MenuResponsive';
import { operations as operationsCategories } from 'state/ducks/categories';
import { operations as operationsProductTypes } from 'state/ducks/productTypes';
import { operations as operationsProducts } from 'state/ducks/products';
import { operations as operationsShipLists } from 'state/ducks/shipLists';

const styles = () => ({
  root: {
    display: 'flex',
    height: '100%',
  },
});

class MainTemplate extends Component {
  componentDidMount() {
    const {
      getCategories, getProductTypes, getProducts, getShipLists,
    } = this.props;
    getCategories();
    getProductTypes();
    getProducts();
    getShipLists();
  }

  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <MenuResponsive />
        {children}
      </div>
    );
  }
}

MainTemplate.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  getCategories: PropTypes.func.isRequired,
  getProductTypes: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  getShipLists: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCategories: operationsCategories.getCategories,
    getProductTypes: operationsProductTypes.getProductTypes,
    getProducts: operationsProducts.getProducts,
    getShipLists: operationsShipLists.getShipLists,
  },
  dispatch,
);
export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(MainTemplate);
