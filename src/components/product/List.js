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
import {products, productTypes, brands, sizes} from '../dataApp';

export default class List extends Component{
  edit(productType){
    const { history } = this.props;
    history.push('/product/'+productType.id);
  }
  add(){
    const { history } = this.props;
    history.push('/product/new');
  }
  render(){
    return (
      <AppContent titulo="Lista de Produtos">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='colunaBotoes' padding="none"></TableCell>
                <TableCell numeric padding="none">ID</TableCell>
                <TableCell>Produto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(product => {
                const productType = productTypes.find(productType=>productType.id === product.productTypeId);
                const brand = brands.find(brand=>brand.id === product.brandId);
                const size = sizes.find(size=>size.id === product.sizeId);
                const productDescription = productType.description+' '+brand.description+' '+size.description;
                return (
                  <TableRow key={product.id}>
                    <TableCell padding="none">
                      <IconButton onClick={this.edit.bind(this, product)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell numeric padding="none">{product.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {productDescription}
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