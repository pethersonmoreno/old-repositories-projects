import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/ProductForm';
import { operations } from 'state/ducks/products';

const Add = ({ history, addProduct }) => (
  <PageTemplate titulo="Novo Produto">
    <Form
      textoBotao="Adicionar"
      onSubmit={(data) => {
        addProduct({ ...data });
        history.push('/product');
      }}
    />
  </PageTemplate>
);
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  addProduct: PropTypes.func.isRequired,
};
const mapStateToProps = null;
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addProduct: operations.addProduct,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Add);
