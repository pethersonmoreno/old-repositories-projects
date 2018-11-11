import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  products,
  productTypes,
  brands,
  sizes,
  SELECAO_DIRETA,
  SELECAO_POR_TIPO_TAMANHO,
} from '../data';

const getDescription = (productTypeId, brandId, sizeId) => {
  const productType = productTypes.find(type => type.id === productTypeId);
  const brand = brands.find(item => item.id === brandId);
  const size = sizes.find(item => item.id === sizeId);
  let description = '';
  if (productType !== undefined) {
    description += `${productType.description} `;
  }
  if (brand !== undefined) {
    description += `${brand.description} `;
  }
  if (size !== undefined) {
    description += `${size.description} `;
  }
  return description;
};
const getDescriptionOfProduct = (productId) => {
  const product = products.find(item => item.id === productId);
  if (product === undefined) {
    return '';
  }
  return getDescription(product.productTypeId, product.brandId, product.sizeId);
};
const getDescriptionOfShipListItem = (item) => {
  if (item.selecao === SELECAO_DIRETA) {
    return getDescriptionOfProduct(item.productId);
  }
  if (item.selecao === SELECAO_POR_TIPO_TAMANHO) {
    return getDescription(item.productTypeId, null, item.sizeId);
  }
  return '?';
};

const ShipListItem = ({ history, className, item }) => (
  <ListItem
    button
    className={className}
    onClick={() => history.push(`/shipList/${item.shipListId}/item/${item.id}`)}
  >
    <ListItemText inset primary={`${item.qtd} UN ${getDescriptionOfShipListItem(item)}`} />
  </ListItem>
);
ShipListItem.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
ShipListItem.defaultProps = {
  className: '',
};
export default ShipListItem;
