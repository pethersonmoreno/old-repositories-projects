import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {products, productTypes, brands, sizes, SELECAO_DIRETA, SELECAO_POR_TIPO_TAMANHO} from '../../../data';

export default class ItemInShipList extends Component{
  getDescription(productTypeId, brandId, sizeId){
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
  }
  getDescriptionOfProduct(productId){
    const product = products.find(product=>product.id === productId);
    if(product === undefined){
      return '';
    }
    return this.getDescription(product.productTypeId, product.brandId, product.sizeId);
  }
  getDescriptionOfShipListItem(item){
    if(item.selecao === SELECAO_DIRETA){
      return this.getDescriptionOfProduct(item.productId);
    } else if(item.selecao === SELECAO_POR_TIPO_TAMANHO){
      return this.getDescription(item.productTypeId, null, item.sizeId);
    }
    return '?';
  }
  edit=()=>{
    const { history, item } = this.props;
    history.push(`/shipList/${item.shipListId}/item/${item.id}`);
  }
  render(){
    const {className, item} = this.props;
    const description = item.qtd + ' UN ' + this.getDescriptionOfShipListItem(item);
    return (
      <ListItem button className={className} onClick={this.edit}>
        <ListItemText inset primary={description} />
      </ListItem>
    );
  }
}