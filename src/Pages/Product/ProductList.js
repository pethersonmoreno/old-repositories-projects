import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import PageTemplate from 'Templates/PageTemplate';
import ButtonFabContainer from 'Atoms/ButtonFabContainer';
import ButtonFab from 'Atoms/ButtonFab';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { operations } from 'controle-compras-frontend-redux/ducks/products';

const ProductList = (props) => {
  const {
    history, uid, products, productTypes, remove,
  } = props;
  return (
    <PageTemplate titulo="Lista de Produtos">
      <Paper className="paper">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="colunaBotoes" padding="none" />
              <TableCell>Produto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const productType = productTypes.find(item => item.id === product.productTypeId);
              const productTypeDescription = (productType && productType.description) || '';
              const brand = product.brand || '';
              const size = product.size || '';
              const productDescription = `${productTypeDescription} ${brand} ${size}`;
              return (
                <TableRow key={product.id}>
                  <TableCell padding="none">
                    <IconButton onClick={() => history.push(`/product/${product.id}`)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={() => asyncOperation(() => remove(uid, product.id), {
                        successMessage: 'Sucesso ao remover Produto',
                        errorMessage: 'Erro ao remover Produto',
                      })
                      }
                    >
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {productDescription}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
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
  productTypes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
  remove: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
  products: state.products,
  productTypes: state.productTypes,
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
)(ProductList);
