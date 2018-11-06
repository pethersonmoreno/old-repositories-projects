import React from 'react';
import Typography from '@material-ui/core/Typography';
import PageTemplate from '../../../../Templates/PageTemplate';
import Form from '../../../../Organisms/ShipListItemForm';
import {shipListItems} from '../../../../data';

const editShipListItem = (shipListItemId, history, valores)=>{
  const shipListItem = shipListItems.find(shipListItem=>shipListItem.id === shipListItemId);
  Object.assign(shipListItem, valores);
  history.push(`/shipList`);
};
const Edit = ({ history, match })=>{
  const shipListItemId = parseInt(match.params.id);
  const shipListItem = shipListItems.find(shipListItem=>shipListItem.id === shipListItemId);
  let conteudo = (<Typography>Item não encontrado</Typography>);
  if(shipListItem !== undefined){
    conteudo = (
      <Form item={shipListItem} 
        textoBotao="Alterar" 
        onSubmit={valores=>editShipListItem(shipListItemId, history, valores)} />
    );
  }
  return (
    <PageTemplate titulo="Editar Item">
      {conteudo}
    </PageTemplate>
  );
};
export default Edit;