import React, {Component} from 'react';
import AppContent from '../AppContent';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import {categories} from '../dataApp';

class List extends Component{
  editCategory(category){
    const { history } = this.props;
    history.push('/category/'+category.id);
  }
  add(){
    const { history } = this.props;
    history.push('/category/new');
  }
  render(){
    return (
      <AppContent titulo="Lista de Categorias">
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
                      <IconButton onClick={this.editCategory.bind(this, category)}>
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
        <div className='fabContainer'>
          <Button variant="fab" className='fab' color='primary'
            onClick={this.add.bind(this)}>
            <AddIcon />
          </Button>
        </div>
      </AppContent>
    );
  }
}
export default List;