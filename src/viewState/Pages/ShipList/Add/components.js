import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/ShipListForm';
import {updateShipListSelected} from '../actions'
import {shipLists} from '../../../data';

const addShipList = (history, valores, updateShipListSelected)=>{
  const shipListId = shipLists.length+1;
  shipLists.push({id:shipListId, ...valores, items: []});
  updateShipListSelected(shipListId);
  history.push(`/shipList`);
};
const Add = ({ history, updateShipListSelected })=>(
  <PageTemplate titulo="Nova Lista">
    <Form 
      textoBotao="Adicionar" 
      onSubmit={valores=>addShipList(history, valores, updateShipListSelected)} />
  </PageTemplate>
);

const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => 
  bindActionCreators({
    updateShipListSelected
  }, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Add);