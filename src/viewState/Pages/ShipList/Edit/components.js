import React from 'react';
import Typography from '@material-ui/core/Typography';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/ShipListForm';
import {shipLists} from '../../../data';

const editShipList = (shipListId, history, valores)=>{
  const shipList = shipLists.find(shipList=>shipList.id === shipListId);
  shipList.description = valores.description;
  history.push(`/shipList`);
};
const Edit = ({ history, match })=>{
  const shipListId = parseInt(match.params.id);
  const shipList = shipLists.find(shipList=>shipList.id === shipListId);
  let conteudo = (<Typography>Lista não encontrado</Typography>);
  if(shipList !== undefined){
    conteudo = (
      <Form shipList={shipList} 
        textoBotao="Alterar" 
        onSubmit={valores=>editShipList(shipListId, history, valores)} />
    );
  }
  return (
    <PageTemplate titulo="Editar Lista">
      {conteudo}
    </PageTemplate>
  );
};
export default Edit;