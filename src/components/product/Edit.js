import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import AppContent from '../AppContent';
import Form from './Form';
import {products, productTypes, sizes, brands} from '../dataApp';

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
    const product = products.find(products=>products.id === this.state.id);
    product.productTypeId = valores.productTypeId;
    product.brandId = valores.brandId;
    product.sizeId = valores.sizeId;
    product.ean = valores.ean;
    history.push('/product');
  }
  
  render(){
    const product = products.find(products=>products.id === this.state.id);
    let conteudo = (<Typography>Produto não encontrado</Typography>);
    let productDescription = '';
    if(product !== undefined){
      const productType = productTypes.find(productType=>productType.id === product.productTypeId);
      const brand = brands.find(brand=>brand.id === product.brandId);
      const size = sizes.find(size=>size.id === product.sizeId);
      productDescription = productType.description+' '+brand.description+' '+size.description;
      conteudo = (
        <Form product={product} 
          textoBotao="Alterar" 
          onSubmit={this.edit.bind(this)} />
      );
    }
    return (
      <AppContent titulo={"Editar Produto "+productDescription}>
        {conteudo}
      </AppContent>
    );
  }
}
export default Edit;