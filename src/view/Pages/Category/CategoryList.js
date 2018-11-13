import React from 'react';
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
import { categories } from '../../../data';

const List = ({ history }) => (
  <PageTemplate titulo="Lista de Categorias">
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
          {categories.map(category => (
            <TableRow key={category.id}>
              <TableCell padding="none">
                <IconButton onClick={() => history.push(`/category/${category.id}`)}>
                  <EditIcon color="primary" />
                </IconButton>
              </TableCell>
              <TableCell numeric padding="none">
                {category.id}
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
List.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default List;
