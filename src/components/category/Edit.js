import React, {Component} from 'react';
import { withRouter } from 'react-router'
import Typography from '@material-ui/core/Typography';
import AppContent from '../AppContent';
import Form from './Form';
import {categories} from '../dataApp';

class Edit extends Component{
  constructor(props){
    super(props);
    const { match } = props;
    this.state={
      id: parseInt(match.params.id)
    }
  }
  editCategory(event, valores){
    const { history } = this.props;
    event.preventDefault();
    const category = categories.find(category=>category.id === this.state.id);
    category.description = valores.description;
    history.push('/category');
  }
  
  render(){
    const category = categories.find(category=>category.id === this.state.id);
    let conteudo = (<Typography>Categoria não encontrada</Typography>);
    if(category !== undefined){
      conteudo = (
        <Form description={category.description} 
          textoBotao="Alterar" 
          onSubmit={this.editCategory.bind(this)} />
      );
    }
    return (
      <AppContent titulo={"Categoria "+(category?category.description:'')}>
        {conteudo}
      </AppContent>
    );
  }
}
export default withRouter(Edit);