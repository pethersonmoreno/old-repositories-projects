import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import AppContent from '../AppContent';
import Form from './Form';
import {shipLists, productTypes, sizes, brands} from '../dataApp';

class Edit extends Component{
  constructor(props){
    super(props);
    const { match } = props;
    this.state={
      id: parseInt(match.params.id)
    }
  }
  edit(event, valores){
    const { history } = this.props;
    event.preventDefault();
    const shipList = shipLists.find(shipList=>shipList.id === this.state.id);
    shipList.description = valores.description;
    history.push('/shipList');
  }
  
  render(){
    const shipList = shipLists.find(shipList=>shipList.id === this.state.id);
    let conteudo = (<Typography>Item não encontrado</Typography>);
    if(shipList !== undefined){
      conteudo = (
        <Form shipList={shipList} 
          textoBotao="Alterar" 
          onSubmit={this.edit.bind(this)} />
      );
    }
    return (
      <AppContent titulo="Editar Item">
        {conteudo}
      </AppContent>
    );
  }
}
export default Edit;