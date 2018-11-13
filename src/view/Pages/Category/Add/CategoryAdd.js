import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/CategoryForm';
import { operations } from 'state/ducks/categories';

const Add = (props) => {
  const { history, addCategory } = props;
  return (
    <PageTemplate titulo="Nova Categoria">
      <Form
        description=""
        textoBotao="Adicionar"
        onSubmit={(data) => {
          addCategory({ ...data });
          history.push('/category');
        }}
      />
    </PageTemplate>
  );
};
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  addCategory: PropTypes.func.isRequired,
};

const mapStateToProps = null;
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addCategory: operations.addCategory,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Add);
