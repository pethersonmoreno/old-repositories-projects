import React, {Component} from 'react';
import { withRouter } from 'react-router'
import AppContent from '../AppContent';
import Form from './Form';
import {productTypes, sizes, brands} from '../dataApp';

class Add extends Component{
  addCategory(event, valores){
    const { history } = this.props;
    event.preventDefault();
    const productTypeId = productTypes.length+1;
    productTypes.push(Object.assign(
      {},
      {id:productTypeId},
      valores,
    ));
    console.log(sizes);
    this.updateList(productTypeId, sizes, valores.sizes);
    console.log(sizes);
    this.updateList(productTypeId, brands, valores.brands);
    history.push('/productType');
  }
  updateList(productTypeId, baseList, newList){
    baseList
      .filter(item=>item.productTypeId === productTypeId)
      .filter(item=>newList.indexOf(item.description) === -1)
      .forEach(item=>{
        baseList.splice(baseList.indexOf(item), 1)
      });
    newList
      .filter(description => baseList.find(item=>item.description === description) === undefined)
      .forEach(description=>baseList.push({
        id: baseList.length, 
        productTypeId: productTypeId, 
        description,
      }))
  }
  
  render(){
    return (
      <AppContent titulo="Controle de Compras - Novo Tipo de Produto">
        <Form 
          textoBotao="Adicionar" 
          onSubmit={this.addCategory.bind(this)} />
      </AppContent>
    );
  }
}
export default withRouter(Add);