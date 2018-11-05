import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import PageTemplate from '../../Templates/PageTemplate';
import {ButtonFabContainer, ButtonFab} from '../../Atoms';
import {withNavigateTo} from '../../helpers';
import {categories} from '../../data';

const List = ({navigateTo})=>
  (
    <PageTemplate titulo="Lista de Categorias">
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='colunaBotoes' padding="none"></TableCell>
              <TableCell numeric padding="none">ID</TableCell>
              <TableCell>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => {
              return (
                <TableRow key={category.id}>
                  <TableCell padding="none">
                    <IconButton onClick={()=>navigateTo(`/category/${category.id}`)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  </TableCell>
                  <TableCell numeric padding="none">{category.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {category.description}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      <ButtonFabContainer>
        <ButtonFab onClick={()=>navigateTo(`/category/new`)}><AddIcon /></ButtonFab>
      </ButtonFabContainer>
    </PageTemplate>
  );
export default withNavigateTo()(List)