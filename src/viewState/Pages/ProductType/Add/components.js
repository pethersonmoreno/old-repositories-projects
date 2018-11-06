import React, {Component} from 'react';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/ProductTypeForm';
import {productTypes, sizes, brands} from '../../../data';

class Add extends Component{
  add(event, valores){
    const { history } = this.props;
    event.preventDefault();
    const productTypeId = productTypes.length+1;
    productTypes.push(Object.assign(
      {},
      {id:productTypeId},
      valores,
    ));
    this.updateList(productTypeId, sizes, valores.sizes);
    this.updateList(productTypeId, brands, valores.brands);
    history.push(`/productType`);
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
      <PageTemplate titulo="Novo Tipo de Produto">
        <Form 
          textoBotao="Adicionar" 
          onSubmit={this.add.bind(this)} />
      </PageTemplate>
    );
  }
}
export default Add;