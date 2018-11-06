import React from 'react';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/CategoryForm';
import {categories} from '../../../data';

const addCategory = (history, valores)=>{
  categories.push(Object.assign(
    {},
    {id:categories.length+1},
    valores,
  ));
  history.push(`/category`);
};
const Add =({ history })=>(
  <PageTemplate titulo="Nova Categoria">
    <Form description="" textoBotao="Adicionar" onSubmit={valores=>addCategory(history,valores)} />
  </PageTemplate>
);
export default Add;