import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/ProductForm';

const addProduct = (products, history, valores) => {
  products.push({ id: products.length + 1, ...valores });
  history.push('/product');
};
const Add = ({ history, products }) => (
  <PageTemplate titulo="Novo Produto">
    <Form textoBotao="Adicionar" onSubmit={valores => addProduct(products, history, valores)} />
  </PageTemplate>
);
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default connect(
  state => ({ ...state.data }),
  null,
)(Add);
