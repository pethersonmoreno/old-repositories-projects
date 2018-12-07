import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { operations } from 'controle-compras-frontend-redux/ducks/products';
import Form from '../ProductForm';

const backPath = '/product';
const ProductAdd = ({ history, uid, addWithProductInStores }) => (
  <Form
    backPath={backPath}
    title="Novo Produto"
    save={data => addWithProductInStores(uid, data.product, data.productInStores)}
    onSaved={() => history.push(backPath)}
  />
);
ProductAdd.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  addWithProductInStores: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addWithProductInStores: operations.addWithProductInStores,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductAdd);
