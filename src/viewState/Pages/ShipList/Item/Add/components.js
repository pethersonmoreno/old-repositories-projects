import React from 'react';
import PageTemplate from '../../../../Templates/PageTemplate';
import Form from '../../../../Organisms/ShipListItemForm';
import {shipListItems} from '../../../../data';

const addShipListItem = (shipListId, history, valores)=>{
  shipListItems.push(
    {id:shipListItems.length+1, shipListId, ...valores}
  );
  history.push(`/shipList`);
};
const Add = ({ history, match })=>{
  const shipListId = parseInt(match.params.shipListId);
  return (
    <PageTemplate titulo="Novo Item">
      <Form textoBotao="Adicionar" onSubmit={valores=>addShipListItem(shipListId, history, valores)} />
    </PageTemplate>
  );
};
export default Add;