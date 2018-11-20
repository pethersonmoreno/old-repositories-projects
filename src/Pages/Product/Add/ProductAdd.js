import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import { operations } from 'controle-compras-frontend-redux/ducks/products';
import Form from '../ProductForm';

const Add = ({ history, add }) => (
  <PageTemplate titulo="Novo Produto">
    <Form textoBotao="Adicionar" save={add} onSaved={() => history.push('/product')} />
  </PageTemplate>
);
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  add: PropTypes.func.isRequired,
};
const mapStateToProps = null;
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    add: operations.add,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Add);
