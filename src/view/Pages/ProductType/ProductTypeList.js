import React from 'react';
import { connect } from 'react-redux';
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
import PageTemplate from 'Templates/PageTemplate';
import ButtonFabContainer from 'Atoms/ButtonFabContainer';
import ButtonFab from 'Atoms/ButtonFab';

const List = ({ history, productTypes }) => (
  <PageTemplate titulo="Lista de Tipos de Produtos">
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="colunaBotoes" padding="none" />
            <TableCell numeric padding="none">
              ID
            </TableCell>
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
              </TableCell>
              <TableCell numeric padding="none">
                {productType.id}
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
List.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  productTypes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default connect(
  state => ({ ...state.data }),
  null,
)(List);
