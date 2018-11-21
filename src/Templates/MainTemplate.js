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
import Loader from 'Molecules/Loader';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { operations as operationsCategories } from 'controle-compras-frontend-redux/ducks/categories';
import { operations as operationsProductTypes } from 'controle-compras-frontend-redux/ducks/productTypes';
import { operations as operationsProducts } from 'controle-compras-frontend-redux/ducks/products';
import { operations as operationsShipLists } from 'controle-compras-frontend-redux/ducks/shipLists';

const styles = () => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
});

class MainTemplate extends Component {
  componentDidMount() {
    const {
      startListenCategories,
      startListenProductTypes,
      startListenProducts,
      startListenShipLists,
    } = this.props;
    asyncOperation(
      Promise.all([
        startListenCategories(),
        startListenProductTypes(),
        startListenProducts(),
        startListenShipLists(),
      ]),
    );
  }

  componentWillUnmount() {
    const {
      stopListenCategories,
      stopListenProductTypes,
      stopListenProducts,
      stopListenShipLists,
    } = this.props;
    stopListenCategories();
    stopListenProductTypes();
    stopListenProducts();
    stopListenShipLists();
  }

  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.root}>
        <MenuResponsive />
        <CssBaseline />
        {children}
        <NotificationSystem
          ref={(ref) => {
            setNotificationSystem(ref);
          }}
        />
        <Loader />
      </div>
    );
  }
}

MainTemplate.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  startListenCategories: PropTypes.func.isRequired,
  stopListenCategories: PropTypes.func.isRequired,
  startListenProductTypes: PropTypes.func.isRequired,
  stopListenProductTypes: PropTypes.func.isRequired,
  startListenProducts: PropTypes.func.isRequired,
  stopListenProducts: PropTypes.func.isRequired,
  startListenShipLists: PropTypes.func.isRequired,
  stopListenShipLists: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    startListenCategories: operationsCategories.startListenChanges,
    stopListenCategories: operationsCategories.stopListenChanges,
    startListenProductTypes: operationsProductTypes.startListenChanges,
    stopListenProductTypes: operationsProductTypes.stopListenChanges,
    startListenProducts: operationsProducts.startListenChanges,
    stopListenProducts: operationsProducts.stopListenChanges,
    startListenShipLists: operationsShipLists.startListenChanges,
    stopListenShipLists: operationsShipLists.stopListenChanges,
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
