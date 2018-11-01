import React, {Component} from 'react';
import AppContent from '../AppContent';
import Form from './Form';
import {shipLists} from '../dataApp';

class Add extends Component{
  add(event, valores){
    const { history } = this.props;
    event.preventDefault();
    shipLists.push(Object.assign(
      {},
      {id:shipLists.length+1},
      valores,
      {items: []}
    ));
    history.push('/shipList');
  }
  
  render(){
    return (
      <AppContent titulo="Nova Lista">
        <Form 
          textoBotao="Adicionar" 
          onSubmit={this.add.bind(this)} />
      </AppContent>
    );
  }
}
export default Add;