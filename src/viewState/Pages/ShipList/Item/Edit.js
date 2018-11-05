import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/ShipListItemForm';
import {shipListItems} from '../../../data';

class Edit extends Component{
  constructor(props){
    super(props);
    const { match } = props;
    this.state={
      shipListId: parseInt(match.params.shipListId),
      id: parseInt(match.params.id)
    }
  }
  edit(event, valores){
    const { history } = this.props;
    event.preventDefault();
    const shipListItem = shipListItems.find(shipListItem=>shipListItem.id === this.state.id);
    Object.assign(shipListItem, valores);
    history.push(`/shipList`);
  }
  
  render(){
    const shipListItem = shipListItems.find(shipListItem=>shipListItem.id === this.state.id);
    let conteudo = (<Typography>Item não encontrado</Typography>);
    if(shipListItem !== undefined){
      conteudo = (
        <Form item={shipListItem} 
          textoBotao="Alterar" 
          onSubmit={this.edit.bind(this)} />
      );
    }
    return (
      <PageTemplate titulo="Editar Item">
        {conteudo}
      </PageTemplate>
    );
  }
}
export default Edit;