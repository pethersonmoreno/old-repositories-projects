import React, {Component} from 'react';
import AppContent from '../AppContent';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {produtos} from '../dataApp';

export default class EditProduct extends Component{
  adicionarProduto(event, valores){
    event.preventDefault();
    console.log(valores);
  }
  
  render(){
    return (
      <AppContent titulo="Controle de Compras - Lista de Produtos">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell numeric>ID</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Unidade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.map(product => {
                return (
                  <TableRow key={product.id}>
                    <TableCell numeric>{product.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {product.titulo}
                    </TableCell>
                    <TableCell numeric>{product.unidade}</TableCell>
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