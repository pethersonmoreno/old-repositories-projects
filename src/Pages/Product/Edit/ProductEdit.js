import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { operations as operationsProducts } from 'controle-compras-frontend-redux/ducks/products';
import { operations as operationsProductsInStores } from 'controle-compras-frontend-redux/ducks/productsInStores';
import Form from '../ProductForm';
import saveProductInStores from '../saveProductInStores';

const backPath = '/product';
const save = async (
  uid,
  productId,
  allProductsInStores,
  { product, productInStores },
  operations,
) => {
  const { edit } = operations;
  const result = await edit(uid, productId, product);
  await saveProductInStores(uid, productId, allProductsInStores, productInStores, operations);
  return result;
};
const ProductEdit = (props) => {
  const {
    history,
    uid,
    match: {
      params: { id: productId },
    },
    products,
    productsInStores: allProductsInStores,
    edit,
    addProductInStore,
    editProductInStore,
    removeProductInStore,
  } = props;
  const product = products.find(item => item.id === productId);
  const productInStores = allProductsInStores
    .filter(p => p.productId === productId)
    .map(({ productId: productIdMap, ...otherFields }) => ({
      ...otherFields,
    }));
  return (
    <Form
      editing
      backPath={backPath}
      title={`Produto ${product ? product.description : ''}`}
      product={product}
      productInStores={productInStores}
      textoBotao="Alterar"
      save={data => save(uid, productId, allProductsInStores, data, {
        edit,
        addProductInStore,
        editProductInStore,
        removeProductInStore,
      })
      }
      onSaved={() => history.push(backPath)}
    />
  );
};
ProductEdit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  productsInStores: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  edit: PropTypes.func.isRequired,
  addProductInStore: PropTypes.func.isRequired,
  editProductInStore: PropTypes.func.isRequired,
  removeProductInStore: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  products: state.products,
  productsInStores: state.productsInStores,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    edit: operationsProducts.edit,
    addProductInStore: operationsProductsInStores.add,
    editProductInStore: operationsProductsInStores.edit,
    removeProductInStore: operationsProductsInStores.remove,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductEdit);
