import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import PageTemplate from 'Templates/PageTemplate';
import ButtonFabContainer from 'Atoms/ButtonFabContainer';
import ButtonFab from 'Atoms/ButtonFab';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { operations } from 'controle-compras-frontend-redux/ducks/products';
import PaperListItem from 'Atoms/PaperListItem';
import { List } from '@material-ui/core';

const ProductList = (props) => {
  const {
    history,
    uid,
    products,
    removeWithProductInStores,
  } = props;
  return (
    <PageTemplate titulo="Produtos">
      <List disablePadding>
        {products.map(product => (
          <PaperListItem
            button
            key={product.id}
            onClick={() => history.push(`/product/${product.id}`)}
          >
            <div className="content">{product.description}</div>
            <div className="contentRight">
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  asyncOperation(
                    () => removeWithProductInStores(uid, product.id),
                    {
                      successMessage: 'Sucesso ao remover Produto',
                      errorMessage: 'Erro ao remover Produto',
                    },
                  );
                }}
              >
                <DeleteIcon color="primary" />
              </IconButton>
            </div>
          </PaperListItem>
        ))}
      </List>
      <ButtonFabContainer>
        <ButtonFab onClick={() => history.push('/product/new')}>
          <AddIcon />
        </ButtonFab>
      </ButtonFabContainer>
    </PageTemplate>
  );
};
ProductList.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  removeWithProductInStores: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  products: state.products,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    removeWithProductInStores: operations.removeWithProductInStores,
  },
  dispatch,
);
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ProductList);
