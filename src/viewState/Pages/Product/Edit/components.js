import React from 'react';
import Typography from '@material-ui/core/Typography';
import PageTemplate from '../../../Templates/PageTemplate';
import Form from '../../../Organisms/ProductForm';
import {products, productTypes, sizes, brands} from '../../../data';

const editProduct = (productId, history, valores)=>{
  const product = products.find(products=>products.id === productId);
  product.productTypeId = valores.productTypeId;
  product.brandId = valores.brandId;
  product.sizeId = valores.sizeId;
  product.ean = valores.ean;
  history.push(`/product`);
};
const Edit = ({ history, match })=>{
  const productId = parseInt(match.params.id);
  const product = products.find(products=>products.id === productId);
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
        onSubmit={valores=>editProduct(productId, history, valores)} />
    );
  }
  return (
    <PageTemplate titulo={"Editar Produto "+productDescription}>
      {conteudo}
    </PageTemplate>
  );
};
export default Edit;