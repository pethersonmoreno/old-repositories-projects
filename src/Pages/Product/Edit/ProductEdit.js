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
    match: {
      params: { id: productId },
    },
    uid,
    products,
    edit,
  } = props;
  const product = products.find(item => item.id === productId);
  return (
    <Form
      editing
      backPath={backPath}
      title={`Produto ${product ? product.description : ''}`}
      product={product}
      textoBotao="Alterar"
      save={data => edit(uid, product.id, data)}
      onSaved={() => history.push(backPath)}
    />
  );
};
ProductEdit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  edit: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  products: state.products,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    edit: operations.edit,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductEdit);
