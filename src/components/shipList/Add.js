import React, {Component} from 'react';
import { connect } from 'react-redux'
import AppContent from '../AppContent';
import Form from './Form';
import {updateShipListSelected} from '../../actions'
import {shipLists} from '../dataApp';

class Add extends Component{
  add(event, valores){
    const { history, updateShipListSelected } = this.props;
    event.preventDefault();
    const shipListId = shipLists.length+1;
    shipLists.push(Object.assign(
      {},
      {id:shipListId},
      valores,
      {items: []}
    ));
    updateShipListSelected(shipListId);
    history.push(`/shipList`);
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

const mapStateToProps = state => {
  return {
    shipListIdSelected: state.shipList.shipListIdSelected
  }
};
const mapDispatchToProps = dispatch => {
  return {
    updateShipListSelected: (shipListIdSelected) => {
      dispatch(updateShipListSelected(shipListIdSelected))
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Add);