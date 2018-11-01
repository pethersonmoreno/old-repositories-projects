import React, {Component} from 'react';
import { withRouter } from 'react-router'
import AppContent from '../AppContent';
import Form from './Form';
import {categories} from '../dataApp';

class Add extends Component{
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
      <AppContent titulo="Nova Categoria">
        <Form description="" textoBotao="Adicionar" onSubmit={this.addCategory.bind(this)} />
      </AppContent>
    );
  }
}
export default withRouter(Add);