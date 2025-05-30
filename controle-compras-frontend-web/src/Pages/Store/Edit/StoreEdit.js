import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  operations,
  selectors as storesSelectors,
} from 'controle-compras-frontend-redux/ducks/stores';
import { selectors as productsInStoresSelectors } from 'controle-compras-frontend-redux/ducks/productsInStores';
import Form from '../StoreForm';
import { PREFIX_ROUTE as backPath } from '../constants';

const StoreEdit = (props) => {
  const {
    history,
    match: {
      params: { id: storeId },
    },
    uid,
    stores,
    productsInStores: allProductsInStores,
    editWithProductsInStore,
  } = props;
  const store = stores.find(item => item.id === storeId);
  const productsInStore = allProductsInStores
    .filter(p => p.storeId === storeId)
    .map(({ storeId: storeIdMap, ...otherFields }) => ({
      ...otherFields,
    }));
  return (
    <Form
      editing
      backPath={backPath}
      title={`Loja ${store ? store.name : ''}`}
      storeShop={store}
      productsInStore={productsInStore}
      save={data => editWithProductsInStore(uid, storeId, data.store, data.productsInStore)}
      onSaved={() => history.push(backPath)}
    />
  );
};
StoreEdit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  stores: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  productsInStores: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  editWithProductsInStore: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  stores: storesSelectors.getAllUndeleted(state),
  productsInStores: productsInStoresSelectors.getAllUndeleted(state),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editWithProductsInStore: operations.editWithProductsInStore,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreEdit);
