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
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PageTemplate from 'Templates/PageTemplate';
import ButtonFabContainer from 'Atoms/ButtonFabContainer';
import ButtonFab from 'Atoms/ButtonFab';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { operations } from 'controle-compras-frontend-redux/ducks/productTypes';

const List = (props) => {
  const {
    history, uid, productTypes, remove,
  } = props;
  return (
    <PageTemplate titulo="Lista de Tipos de Produtos">
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="colunaBotoes" padding="none" />
              <TableCell>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productTypes.map(productType => (
              <TableRow key={productType.id}>
                <TableCell padding="none">
                  <IconButton onClick={() => history.push(`/productType/${productType.id}`)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => asyncOperation(() => remove(uid, productType.id), {
                      successMessage: `Sucesso ao remover Tipo de Produto ${
                        productType.description
                      }`,
                      errorMessage: `Erro ao remover Tipo de Produto ${productType.description}`,
                    })
                    }
                  >
                    <DeleteIcon color="primary" />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {productType.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <ButtonFabContainer>
        <ButtonFab onClick={() => history.push('/productType/new')}>
          <AddIcon />
        </ButtonFab>
      </ButtonFabContainer>
    </PageTemplate>
  );
};
List.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uid: PropTypes.string.isRequired,
  productTypes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  remove: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
};
const mapStateToProps = state => ({
  uid: state.user.auth.uid,
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
)(List);
