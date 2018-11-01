import React, {Component} from 'react';
import AppContent from '../AppContent';
import Form from './Form';
import {products} from '../dataApp';

class Add extends Component{
  adicionarProduto(event, valores){
    const { history } = this.props;
    event.preventDefault();
    products.push(Object.assign(
      {},
      {id:products.length+1},
      valores,
    ));
    history.push('/product');
  }
  
  render(){
    return (
      <AppContent titulo="Novo Produto">
        <Form textoBotao="Adicionar" onSubmit={this.adicionarProduto.bind(this)} />
      </AppContent>
    );
  }
}
export default Add;