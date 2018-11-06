import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/ProductTypeForm';
import {productTypes, sizes, brands} from '../../../data';

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
    const productType = productTypes.find(productType=>productType.id === this.state.id);
    let conteudo = (<Typography>Tipo de Produto não encontrado</Typography>);
    if(productType !== undefined){
      conteudo = (
        <Form productType={productType} 
          textoBotao="Alterar" 
          onSubmit={this.edit.bind(this)} />
      );
    }
    return (
      <PageTemplate titulo={"Tipo de Produto "+(productType?productType.description:'')}>
        {conteudo}
      </PageTemplate>
    );
  }
}
export default Edit;