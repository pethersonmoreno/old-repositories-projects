import React, {Component} from 'react';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/ProductForm';
import {products} from '../../../data';

class Add extends Component{
  add(event, valores){
    const { history } = this.props;
    event.preventDefault();
    products.push(Object.assign(
      {},
      {id:products.length+1},
      valores,
    ));
    history.push(`/product`);
  }
  
  render(){
    return (
      <PageTemplate titulo="Novo Produto">
        <Form textoBotao="Adicionar" onSubmit={this.add.bind(this)} />
      </PageTemplate>
    );
  }
}
export default Add;