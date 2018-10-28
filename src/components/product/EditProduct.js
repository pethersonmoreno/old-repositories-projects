import React, {Component} from 'react';
import AppContent from '../AppContent';
import FormProduct from './FormProduct';

export default class EditProduct extends Component{
  adicionarProduto(event, valores){
    event.preventDefault();
    console.log(valores);
  }
  
  render(){
    return (
      <AppContent titulo="Controle de Compras - Editar Produto">
        <FormProduct textoBotao="Alterar" onSubmit={this.adicionarProduto.bind(this)} />
      </AppContent>
    );
  }
}