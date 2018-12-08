import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PageTemplate from 'Templates/PageTemplate';
import ButtonFabContainer from 'Atoms/ButtonFabContainer';
import ButtonFab from 'Atoms/ButtonFab';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { operations, selectors } from 'controle-compras-frontend-redux/ducks/categories';
import { List } from '@material-ui/core';
import PaperListItem from 'Atoms/PaperListItem';

const CategoryList = (props) => {
  const {
    history, uid, categories, remove,
  } = props;
  return (
    <PageTemplate titulo="Categorias">
      <List disablePadding>
        {categories.map(category => (
          <PaperListItem
            button
            key={category.id}
            onClick={() => history.push(`/category/${category.id}`)}
          >
            <div className="content">
              {category.description}
            </div>
            <div className="contentRight">
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  asyncOperation(() => remove(uid, category.id), {
                    successMessage: `Sucesso ao remover Categoria ${category.description}`,
                    errorMessage: `Erro ao remover Categoria ${category.description}`,
                  });
                }}
              >
                <DeleteIcon color="primary" />
              </IconButton>
            </div>
          </PaperListItem>
        ))}
      </List>
      <ButtonFabContainer>
        <ButtonFab onClick={() => history.push('/category/new')}>
          <AddIcon />
        </ButtonFab>
      </ButtonFabContainer>
    </PageTemplate>
  );
};
CategoryList.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  remove: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  categories: selectors.getAllUndeleted(state),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    remove: operations.remove,
  },
  dispatch,
);
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(CategoryList);
