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
import { operations as operationsProducts } from 'controle-compras-frontend-redux/ducks/products';
import { operations as operationsProductsInStores } from 'controle-compras-frontend-redux/ducks/productsInStores';
import PaperListItem from 'Atoms/PaperListItem';
import { List } from '@material-ui/core';
import saveProductInStores from './saveProductInStores';

const removeProduct = async (uid, productId, allProductsInStores, operations) => {
  const { remove } = operations;
  const productInStores = [];
  await saveProductInStores(uid, productId, allProductsInStores, productInStores, operations);
  return remove(uid, productId);
};
const ProductList = (props) => {
  const {
    history,
    uid,
    products,
    productsInStores: allProductsInStores,
    remove,
    removeProductInStore,
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
                    () => removeProduct(uid, product.id, allProductsInStores, {
                      remove,
                      removeProductInStore,
                    }),
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
  productsInStores: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  remove: PropTypes.func.isRequired,
  removeProductInStore: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  products: state.products,
  productsInStores: state.productsInStores,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    remove: operationsProducts.remove,
    removeProductInStore: operationsProductsInStores.remove,
  },
  dispatch,
);
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ProductList);
