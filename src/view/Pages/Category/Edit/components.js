import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/CategoryForm';
import { categories } from '../../../data';

const editCategory = (categoryId, history, valores) => {
  const category = categories.find(item => item.id === categoryId);
  category.description = valores.description;
  history.push('/category');
};

const Edit = (props) => {
  const { history, match } = props;
  const categoryId = parseInt(match.params.id, 10);
  const category = categories.find(item => item.id === categoryId);
  let conteudo = <Typography>Categoria não encontrada</Typography>;
  if (category !== undefined) {
    conteudo = (
      <Form
        description={category.description}
        textoBotao="Alterar"
        onSubmit={data => editCategory(categoryId, history, data)}
      />
    );
  }
  return (
    <PageTemplate titulo={`Categoria ${category ? category.description : ''}`}>
      {conteudo}
    </PageTemplate>
  );
};
Edit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default Edit;
