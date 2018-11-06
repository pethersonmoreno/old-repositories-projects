import React from 'react';
import Typography from '@material-ui/core/Typography';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/CategoryForm';
import {categories} from '../../../data';

const editCategory = (categoryId, history, valores)=>{
  const category = categories.find(category=>category.id === categoryId);
  category.description = valores.description;
  history.push(`/category`);
}

const Edit = props =>{
  const { history, match } = this.props;
  const categoryId = parseInt(match.params.id);
  const category = categories.find(category=>category.id === categoryId);
  let conteudo = (<Typography>Categoria não encontrada</Typography>);
  if(category !== undefined){
    conteudo = (
      <Form description={category.description} 
        textoBotao="Alterar" 
        onSubmit={(data)=>editCategory(categoryId, history, data)} />
    );
  }
  return (
    <PageTemplate titulo={"Categoria "+(category?category.description:'')}>
      {conteudo}
    </PageTemplate>
  );
}
export default Edit;