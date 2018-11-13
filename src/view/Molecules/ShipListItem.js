import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class ShipListItem extends Component {
  getDescription = (productTypeId, brandId, sizeId) => {
    const { productTypes, brands, sizes } = this.props;
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

  getDescriptionOfProduct = (productId) => {
    const { products } = this.props;
    const product = products.find(item => item.id === productId);
    if (product === undefined) {
      return '';
    }
    return this.getDescription(product.productTypeId, product.brandId, product.sizeId);
  };

  getDescriptionOfShipListItem = (item) => {
    if (item.selecaoDireta) {
      return this.getDescriptionOfProduct(item.productId);
    }
    return this.getDescription(item.productTypeId, null, item.sizeId);
  };

  render() {
    const { history, className, item } = this.props;
    return (
      <ListItem
        button
        className={className}
        onClick={() => history.push(`/shipList/${item.shipListId}/item/${item.id}`)}
      >
        <ListItemText inset primary={`${item.qtd} UN ${this.getDescriptionOfShipListItem(item)}`} />
      </ListItem>
    );
  }
}
ShipListItem.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  productTypes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  sizes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  brands: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
ShipListItem.defaultProps = {
  className: '',
};
export default connect(
  state => ({ ...state.data }),
  null,
)(ShipListItem);
