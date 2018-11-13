import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/ProductForm';
import { products } from '../../../../data';

const addProduct = (history, valores) => {
  products.push({ id: products.length + 1, ...valores });
  history.push('/product');
};
const Add = ({ history }) => (
  <PageTemplate titulo="Novo Produto">
    <Form textoBotao="Adicionar" onSubmit={valores => addProduct(history, valores)} />
  </PageTemplate>
);
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Add;
