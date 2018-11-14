import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageTemplate from 'Templates/PageTemplate';
import { operations } from 'controle-compras-frontend-redux/ducks/categories';
import Form from '../CategoryForm';

const Edit = (props) => {
  const {
    history, match, categories, editCategory,
  } = props;
  const categoryId = match.params.id;
  const category = categories.find(item => item.id === categoryId);
  let conteudo = <Typography>Categoria não encontrada</Typography>;
  if (category !== undefined) {
    conteudo = (
      <Form
        description={category.description}
        textoBotao="Alterar"
        onSubmit={(data) => {
          editCategory(categoryId, data);
          history.push('/category');
        }}
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
  editCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  categories: state.categories,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editCategory: operations.editCategory,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);
