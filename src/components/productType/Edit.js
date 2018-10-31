import React, {Component} from 'react';
import { withRouter } from 'react-router'
import AppContent from '../AppContent';
import Form from './Form';
import {productTypes, sizes, brands} from '../dataApp';

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
    const productType = productTypes.find(productType=>productType.id === this.state.id);
    productType.description = valores.description;
    productType.categoryId = valores.categoryId;
    this.updateList(productType.id, sizes, valores.sizes);
    this.updateList(productType.id, brands, valores.brands);
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
    const productType = productTypes.find(productType=>productType.id === this.state.id);
    return (
      <AppContent titulo={"Controle de Compras - Tipo de Produto "+productType.description}>
        <Form productType={productType} 
          textoBotao="Alterar" 
          onSubmit={this.edit.bind(this)} />
      </AppContent>
    );
  }
}
export default withRouter(Edit);