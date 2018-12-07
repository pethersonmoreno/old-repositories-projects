import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { operations } from 'controle-compras-frontend-redux/ducks/products';
import Form from '../ProductForm';

const backPath = '/product';
const ProductEdit = (props) => {
  const {
    history,
    uid,
    match: {
      params: { id: productId },
    },
    products,
    productsInStores: allProductsInStores,
    editWithProductInStores,
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
      save={data => editWithProductInStores(uid, productId, data.product, data.productInStores)}
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
  editWithProductInStores: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  products: state.products,
  productsInStores: state.productsInStores,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editWithProductInStores: operations.editWithProductInStores,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductEdit);
