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
import { operations } from 'controle-compras-frontend-redux/ducks/categories';

const CategoryList = (props) => {
  const {
    history, uid, categories, remove,
  } = props;
  return (
    <PageTemplate titulo="Lista de Categorias">
      <Paper className="paper">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="colunaBotoes" padding="none" />
              <TableCell>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => (
              <TableRow key={category.id}>
                <TableCell padding="none">
                  <IconButton onClick={() => history.push(`/category/${category.id}`)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => asyncOperation(() => remove(uid, category.id), {
                      successMessage: `Sucesso ao remover Categoria ${category.description}`,
                      errorMessage: `Erro ao remover Categoria ${category.description}`,
                    })
                    }
                  >
                    <DeleteIcon color="primary" />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {category.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
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
  categories: state.categories,
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
