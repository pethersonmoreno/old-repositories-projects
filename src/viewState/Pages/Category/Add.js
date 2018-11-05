import React, {Component} from 'react';
import PageTemplate from '../../Templates/PageTemplate';
import Form from './Form';
import {categories} from '../../data';

class Add extends Component{
  add(event, valores){
    const { history } = this.props;
    event.preventDefault();
    categories.push(Object.assign(
      {},
      {id:categories.length+1},
      valores,
    ));
    history.push(`/category`);
  }
  
  render(){
    return (
      <PageTemplate titulo="Nova Categoria">
        <Form description="" textoBotao="Adicionar" onSubmit={this.add.bind(this)} />
      </PageTemplate>
    );
  }
}
export default Add;