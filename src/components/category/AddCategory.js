import React, {Component} from 'react';
import { withRouter } from 'react-router'
import AppContent from '../AppContent';
import FormCategory from './FormCategory';
import {categories} from '../dataApp';

class AddCategory extends Component{
  addCategory(event, valores){
    const { history } = this.props;
    event.preventDefault();
    categories.push(Object.assign(
      {},
      {id:categories.length+1},
      valores,
    ));
    history.push('/category');
  }
  
  render(){
    return (
      <AppContent titulo="Controle de Compras - Nova Categoria">
        <FormCategory description="" textoBotao="Adicionar" onSubmit={this.addCategory.bind(this)} />
      </AppContent>
    );
  }
}
export default withRouter(AddCategory);