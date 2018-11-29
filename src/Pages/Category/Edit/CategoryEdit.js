import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PageWithBackButtonTemplate from 'Templates/PageWithBackButtonTemplate';
import { operations } from 'controle-compras-frontend-redux/ducks/categories';
import Form from '../CategoryForm';

const backPath = '/category';
const Edit = (props) => {
  const {
    history, match, uid, categories, edit,
  } = props;
  const categoryId = match.params.id;
  const category = categories.find(item => item.id === categoryId);
  let conteudo = <Typography>Categoria não encontrada</Typography>;
  if (category !== undefined) {
    conteudo = (
      <Form
        description={category.description}
        textoBotao="Alterar"
        save={data => edit(uid, categoryId, data)}
        onSaved={() => history.push(backPath)}
      />
    );
  }
  return (
    <PageWithBackButtonTemplate
      backPath={backPath}
      titulo={`Categoria ${category ? category.description : ''}`}
    >
      {conteudo}
    </PageWithBackButtonTemplate>
  );
};
Edit.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  edit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  categories: state.categories,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    edit: operations.edit,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);
