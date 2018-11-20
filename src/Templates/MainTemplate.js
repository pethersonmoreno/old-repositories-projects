import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NotificationSystem from 'react-notification-system';
import MenuResponsive from 'Organisms/MenuResponsive';
import { setNotificationSystem } from 'HOC/withNotification';

import { operations as operationsCategories } from 'controle-compras-frontend-redux/ducks/categories';
import { operations as operationsProductTypes } from 'controle-compras-frontend-redux/ducks/productTypes';
import { operations as operationsProducts } from 'controle-compras-frontend-redux/ducks/products';
import { operations as operationsShipLists } from 'controle-compras-frontend-redux/ducks/shipLists';

const styles = () => ({
  root: {
    display: 'flex',
    height: '100%',
  },
});

class MainTemplate extends Component {
  componentDidMount() {
    const {
      startListenCategories, getProductTypes, getProducts, getShipLists,
    } = this.props;
    startListenCategories();
    getProductTypes();
    getProducts();
    getShipLists();
  }

  componentWillUnmount() {
    const { stopListenCategories } = this.props;
    stopListenCategories();
  }

  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <MenuResponsive />
        {children}
        <NotificationSystem
          ref={(ref) => {
            setNotificationSystem(ref);
          }}
        />
      </div>
    );
  }
}

MainTemplate.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  startListenCategories: PropTypes.func.isRequired,
  stopListenCategories: PropTypes.func.isRequired,
  getProductTypes: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  getShipLists: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    startListenCategories: operationsCategories.startListenChanges,
    stopListenCategories: operationsCategories.stopListenChanges,
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
