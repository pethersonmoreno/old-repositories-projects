import React from 'react';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/ProductForm';
import {products} from '../../../data';

const addProduct = (history, valores)=>{
  products.push(Object.assign(
    {},
    {id:products.length+1},
    valores,
  ));
  history.push(`/product`);
};
const Add = ({history})=>(
  <PageTemplate titulo="Novo Produto">
    <Form textoBotao="Adicionar" onSubmit={valores=>addProduct(history, valores)} />
  </PageTemplate>
);
export default Add;