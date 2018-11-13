import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from 'Templates/PageTemplate';
import Form from 'Organisms/CategoryForm';

const editCategory = (categories, categoryId, history, valores) => {
  const category = categories.find(item => item.id === categoryId);
  category.description = valores.description;
  history.push('/category');
};

const Edit = (props) => {
  const { history, match, categories } = props;
  const categoryId = parseInt(match.params.id, 10);
  const category = categories.find(item => item.id === categoryId);
  let conteudo = <Typography>Categoria não encontrada</Typography>;
  if (category !== undefined) {
    conteudo = (
      <Form
        description={category.description}
        textoBotao="Alterar"
        onSubmit={data => editCategory(categories, categoryId, history, data)}
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
  categories: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default connect(
  state => ({ ...state.data }),
  null,
)(Edit);
