import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import { operations } from 'controle-compras-frontend-redux/ducks/categories';
import Form from '../CategoryForm';

const Add = (props) => {
  const { history, add } = props;
  return (
    <PageTemplate titulo="Nova Categoria">
      <Form
        description=""
        textoBotao="Adicionar"
        save={add}
        onSaved={() => history.push('/category')}
      />
    </PageTemplate>
  );
};
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
