import React, {Component} from 'react';
import AppContent from '../AppContent';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { withRouter } from 'react-router'
import {categories} from '../dataApp';

class ListCategories extends Component{
  editCategory(category){
    const { history } = this.props;
    history.push('/category/'+category.id);
  }
  render(){
    return (
      <AppContent titulo="Controle de Compras - Lista de Produtos">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell numeric>ID</TableCell>
                <TableCell>Descrição</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(category => {
                return (
                  <TableRow key={category.id}>
                    <TableCell>
                      <IconButton onClick={this.editCategory.bind(this, category)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell numeric>{category.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {category.description}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </AppContent>
    );
  }
}
export default withRouter(ListCategories);