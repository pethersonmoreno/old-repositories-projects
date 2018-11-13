import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReactSelect from 'Atoms/ReactSelect';

const selecoesProdutoOptions = [
  { value: true, label: 'Direta' },
  { value: false, label: 'Por Tipo e Tamanho' },
];

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.item };
  }

  onCallSubmit(event) {
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit({ ...this.state });
  }

  render() {
    const {
      textoBotao, products, productTypes, brands, sizes,
    } = this.props;
    const {
      qtd, selecaoDireta, productId, productTypeId, sizeId,
    } = this.state;

    const productsOptions = products.map((product) => {
      const productType = productTypes.find(type => type.id === product.productTypeId);
      const brand = brands.find(item => item.id === product.brandId);
      const size = sizes.find(item => item.id === product.sizeId);
      return {
        value: product.id,
        label: `${productType.description} ${brand.description} ${size.description}`,
      };
    });
    const productTypesOptions = productTypes.map(productType => ({
      value: productType.id,
      label: productType.description,
    }));
    const sizesOptions = sizes.map(size => ({
      value: size.id,
      label: size.description,
      productTypeId: size.productTypeId,
    }));
    const valueSelecaoProdutoSelected = selecoesProdutoOptions.find(
      option => option.value === selecaoDireta,
    );
    const valueProductSelected = productsOptions.find(option => option.value === productId);
    const valueProductTypeSelected = productTypesOptions.find(
      option => option.value === productTypeId,
    );
    const sizesOptionsUsed = sizesOptions.filter(option => option.productTypeId === productTypeId);
    const valueSizeSelected = sizesOptionsUsed.find(option => option.value === sizeId);
    return (
      <Paper>
        <form noValidate autoComplete="on" onSubmit={this.onCallSubmit.bind(this)}>
          <TextField
            label="Quantidade"
            value={qtd}
            autoFocus
            fullWidth
            onChange={event => this.setState({ qtd: event.target.value })}
          />
          <ReactSelect
            label="Seleção do Produto"
            value={valueSelecaoProdutoSelected}
            options={selecoesProdutoOptions}
            onChange={value => this.setState({ selecao: value ? value.value : null })}
          />
          {selecaoDireta && (
            <ReactSelect
              label="Produto"
              value={valueProductSelected}
              options={productsOptions}
              onChange={value => this.setState({ productId: value ? value.value : null })}
            />
          )}
          {!selecaoDireta && (
            <div>
              <ReactSelect
                label="Tipo de Produto"
                value={valueProductTypeSelected}
                options={productTypesOptions}
                onChange={value => this.setState({ productTypeId: value ? value.value : null })}
              />
              <ReactSelect
                label="Tamanho"
                value={valueSizeSelected}
                options={sizesOptionsUsed}
                onChange={value => this.setState({ sizeId: value ? value.value : null })}
              />
            </div>
          )}
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
Form.propTypes = {
  textoBotao: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  item: PropTypes.shape({
    qtd: PropTypes.number,
    selecao: PropTypes.string,
    productId: PropTypes.number,
    productTypeId: PropTypes.number,
    sizeId: PropTypes.number,
  }),
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  productTypes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  sizes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  brands: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
Form.defaultProps = {
  item: {
    qtd: 1,
    selecao: null,
    productId: null,
    productTypeId: null,
    sizeId: null,
  },
};
export default Form;
