import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';  
import {products, productTypes, brands, sizes, SELECAO_DIRETA, SELECAO_POR_TIPO_TAMANHO} from '../data';

const getDescription = (productTypeId, brandId, sizeId) =>{
  const productType = productTypes.find(productType=>productType.id === productTypeId);
  const brand = brands.find(brand=>brand.id === brandId);
  const size = sizes.find(size=>size.id === sizeId);
  let description = '';
  if(productType !== undefined){
    description += productType.description + ' ';
  }
  if(brand !== undefined){
    description += brand.description + ' ';
  }
  if(size !== undefined){
    description += size.description + ' ';
  }
  return description;
};
const getDescriptionOfProduct = (productId)=>{
  const product = products.find(product=>product.id === productId);
  if(product === undefined){
    return '';
  }
  return getDescription(product.productTypeId, product.brandId, product.sizeId);
};
const getDescriptionOfShipListItem=(item)=>{
  if(item.selecao === SELECAO_DIRETA){
    return getDescriptionOfProduct(item.productId);
  } else if(item.selecao === SELECAO_POR_TIPO_TAMANHO){
    return getDescription(item.productTypeId, null, item.sizeId);
  }
  return '?';
};

const ShipListItem = ({className, history, item})=>(
  <ListItem button className={className} 
      onClick={()=>history.push(`/shipList/${item.shipListId}/item/${item.id}`)}>
    <ListItemText inset primary={item.qtd + ' UN ' + getDescriptionOfShipListItem(item)} />
  </ListItem>
);
export default ShipListItem