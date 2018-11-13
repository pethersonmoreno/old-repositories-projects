import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReactSelect from 'Atoms/ReactSelect';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    const { product } = props;
    this.state = { ...product };
  }

  onCallSubmit(event) {
    const { onSubmit } = this.props;
    event.preventDefault();
    const { productTypeId, size, brand } = this.state;
    if (productTypeId && size && brand) {
      onSubmit({ ...this.state });
    }
  }

  render() {
    const { textoBotao, productTypes } = this.props;
    const {
      productTypeId, brand: brandSelected, size: sizeSelected, ean,
    } = this.state;
    const productTypesOptions = productTypes.map(productType => ({
      value: productType.id,
      label: productType.description,
    }));
    let sizesOptions = [];
    let brandsOptions = [];
    const productTypeSelected = productTypes.find(productType => productType.id === productTypeId);
    if (productTypeSelected) {
      sizesOptions = productTypeSelected.sizes.map(size => ({
        value: size,
        label: size,
      }));
      brandsOptions = productTypeSelected.brands.map(brand => ({
        value: brand,
        label: brand,
      }));
    }
    const valueProductTypeSelected = productTypesOptions.find(
      option => option.value === productTypeId,
    );
    const valueBrandSelected = brandsOptions.find(option => option.value === brandSelected);
    const valueSizeSelected = sizesOptions.find(option => option.value === sizeSelected);
    return (
      <Paper>
        <form noValidate autoComplete="on" onSubmit={this.onCallSubmit.bind(this)}>
          <ReactSelect
            label="Tipo de Produto"
            value={valueProductTypeSelected}
            autoFocus
            options={productTypesOptions}
            onChange={value => this.setState({ productTypeId: value ? value.value : null })}
          />
          <ReactSelect
            label="Marca"
            value={valueBrandSelected}
            options={brandsOptions}
            onChange={value => this.setState({ brand: value ? value.value : null })}
          />
          <ReactSelect
            label="Tamanho"
            value={valueSizeSelected}
            options={sizesOptions}
            onChange={value => this.setState({ size: value ? value.value : null })}
          />
          <TextField
            label="EAN"
            value={ean}
            fullWidth
            onChange={event => this.setState({ ean: event.target.value })}
          />
          <div className="formButtons">
            <Button type="submit" variant="contained" color="primary">
              {textoBotao}
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}
ProductForm.propTypes = {
  textoBotao: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  product: PropTypes.shape({
    productTypeId: PropTypes.number,
    size: PropTypes.string,
    brand: PropTypes.string,
    ean: PropTypes.string,
  }),
  productTypes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
ProductForm.defaultProps = {
  product: {
    productTypeId: null,
    size: null,
    brand: null,
    ean: '',
  },
};
const mapStateToProps = state => ({
  productTypes: state.productTypes,
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductForm);
