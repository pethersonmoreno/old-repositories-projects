import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/CategoryForm';

const addCategory = (categories, history, valores) => {
  categories.push({ id: categories.length + 1, ...valores });
  history.push('/category');
};
const Add = (props) => {
  const { history, categories } = props;
  return (
    <PageTemplate titulo="Nova Categoria">
      <Form
        description=""
        textoBotao="Adicionar"
        onSubmit={valores => addCategory(categories, history, valores)}
      />
    </PageTemplate>
  );
};
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  categories: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default connect(
  state => ({ ...state.data }),
  null,
)(Add);
