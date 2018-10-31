import React, {Component} from 'react';
import { withRouter } from 'react-router'
import AppContent from '../AppContent';
import FormCategory from './FormCategory';
import {categories} from '../dataApp';

class EditCategory extends Component{
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
    return (
      <AppContent titulo={"Controle de Compras - Categoria "+category.description}>
        <FormCategory description={category.description} textoBotao="Alterar" onSubmit={this.editCategory.bind(this)} />
      </AppContent>
    );
  }
}
export default withRouter(EditCategory);