import React, {Component} from 'react';
import AppContent from '../AppContent';
import FormProduct from './FormProduct';
import {produtos} from '../dataApp';

export default class AddProduct extends Component{
  adicionarProduto(event, valores){
    event.preventDefault();
    produtos.push(Object.assign(
      {},
      valores,
      {id:produtos.length+1}
    ));
  }
  
  render(){
    return (
      <AppContent titulo="Controle de Compras - Novo Produto">
        <FormProduct textoBotao="Adicionar" onSubmit={this.adicionarProduto.bind(this)} />
      </AppContent>
    );
  }
}