import React, {Component} from 'react';
import AppContent from '../AppContent';
import Form from './Form';
import {shipListItems} from '../dataApp';

class Add extends Component{
  constructor(props){
    super(props);
    const { match } = props;
    this.state={
      shipListId: parseInt(match.params.shipListId)
    }
  }
  add(event, valores){
    const { history } = this.props;
    event.preventDefault();
    shipListItems.push(Object.assign(
      {},
      {id:shipListItems.length+1},
      {shipListId:this.state.shipListId},
      valores,
    ));
    history.push('/shipList');
  }
  
  render(){
    return (
      <AppContent titulo="Novo Item">
        <Form textoBotao="Adicionar" onSubmit={this.add.bind(this)} />
      </AppContent>
    );
  }
}
export default Add;