import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { operations as operationsProducts } from 'controle-compras-frontend-redux/ducks/products';
import { operations as operationsProductsInStores } from 'controle-compras-frontend-redux/ducks/productsInStores';
import Form from '../ProductForm';
import saveProductInStores from '../saveProductInStores';

const backPath = '/product';
const save = async (uid, allProductsInStores, { product, productInStores }, operations) => {
  const { add } = operations;
  const result = await add(uid, product);
  await saveProductInStores(uid, result.value.id, allProductsInStores, productInStores, operations);
  return result;
};
const ProductAdd = ({
  history,
  uid,
  productsInStores: allProductsInStores,
  add,
  addProductInStore,
  editProductInStore,
  removeProductInStore,
}) => (
  <Form
    backPath={backPath}
    title="Novo Produto"
    save={data => save(uid, allProductsInStores, data, {
      add,
      addProductInStore,
      editProductInStore,
      removeProductInStore,
    })
    }
    onSaved={() => history.push(backPath)}
  />
);
ProductAdd.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  productsInStores: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  add: PropTypes.func.isRequired,
  addProductInStore: PropTypes.func.isRequired,
  editProductInStore: PropTypes.func.isRequired,
  removeProductInStore: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  productsInStores: state.productsInStores,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    add: operationsProducts.add,
    addProductInStore: operationsProductsInStores.add,
    editProductInStore: operationsProductsInStores.edit,
    removeProductInStore: operationsProductsInStores.remove,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductAdd);
