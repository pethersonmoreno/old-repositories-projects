import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class ShipListItem extends Component {
  getDescription = (productType, brand, size) => {
    let description = '';
    if (productType !== undefined) {
      description += `${productType.description} `;
    }
    if (brand !== undefined && brand !== null) {
      description += `${brand} `;
    }
    if (size !== undefined && size !== null) {
      description += `${size} `;
    }
    return description;
  };

  getDescriptionOfProduct = (productId) => {
    const { products, productTypes } = this.props;
    const product = products.find(item => item.id === productId);
    if (product === undefined) {
      return '';
    }
    const productType = productTypes.find(item => item.id === product.productTypeId);
    return this.getDescription(productType, product.brand, product.size);
  };

  getDescriptionOfShipListItem = (item) => {
    if (item.selecaoDireta) {
      return this.getDescriptionOfProduct(item.productId);
    }
    const { productTypes } = this.props;
    const productType = productTypes.find(type => type.id === item.productTypeId);
    return this.getDescription(productType, null, item.size);
  };

  render() {
    const {
      history, className, shipListId, item,
    } = this.props;
    return (
      <ListItem
        button
        className={className}
        onClick={() => history.push(`/shipList/${shipListId}/item/${item.id}`)}
      >
        <ListItemText inset primary={`${item.qtd} UN ${this.getDescriptionOfShipListItem(item)}`} />
      </ListItem>
    );
  }
}
ShipListItem.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  shipListId: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  productTypes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
ShipListItem.defaultProps = {
  className: '',
};

const mapStateToProps = state => ({
  products: state.products,
  productTypes: state.productTypes,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShipListItem);
