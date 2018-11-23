import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import { operations } from 'controle-compras-frontend-redux/ducks/productTypes';
import Form from '../ProductTypeForm';

const Add = (props) => {
  const { history, uid, add } = props;
  return (
    <PageTemplate titulo="Novo Tipo de Produto">
      <Form
        textoBotao="Adicionar"
        save={data => add(uid, data)}
        onSaved={() => history.push('/productType')}
      />
    </PageTemplate>
  );
};
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  add: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
});
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
