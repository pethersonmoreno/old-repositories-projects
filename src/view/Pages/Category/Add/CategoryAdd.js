import React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/CategoryForm';
import { categories } from '../../../../data';

const addCategory = (history, valores) => {
  categories.push({ id: categories.length + 1, ...valores });
  history.push('/category');
};
const Add = (props) => {
  const { history } = props;
  return (
    <PageTemplate titulo="Nova Categoria">
      <Form
        description=""
        textoBotao="Adicionar"
        onSubmit={valores => addCategory(history, valores)}
      />
    </PageTemplate>
  );
};
Add.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Add;
