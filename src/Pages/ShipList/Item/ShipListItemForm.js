import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReactSelect from 'Atoms/ReactSelect';
import withNotification from 'HOC/withNotification';

const selecoesProdutoOptions = [
  { value: true, label: 'Direta' },
  { value: false, label: 'Por Tipo e Tamanho' },
];

class ShipListItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.item };
  }

  async onCallSubmit(event) {
    const { save, onSaved, notification } = this.props;
    event.preventDefault();
    try {
      const result = await save({ ...this.state });
      notification.success('Sucesso ao salvar Item da Lista de Compras');
      onSaved(result);
    } catch (error) {
      notification.error('Erro ao salvar Item da Lista de Compras', error);
    }
  }

  onChangeQtd = (event) => {
    const qtd = parseInt(event.target.value, 10);
    this.setState({ qtd: qtd || '' });
  };

  render() {
    const { textoBotao, products, productTypes } = this.props;
    const {
      qtd, selecaoDireta, productId, productTypeId, size: sizeSelected,
    } = this.state;

    const productsOptions = products.map((product) => {
      const productType = productTypes.find(type => type.id === product.productTypeId);
      const brand = product ? product.brand : '';
      const size = product ? product.size : '';
      return {
        value: product.id,
        label: `${productType && productType.description} ${brand} ${size}`,
      };
    });
    const productTypesOptions = productTypes.map(productType => ({
      value: productType.id,
      label: productType.description,
    }));
    let sizesOptions = [];
    const productTypeSelected = productTypes.find(productType => productType.id === productTypeId);
    if (productTypeSelected !== undefined) {
      sizesOptions = productTypeSelected.sizes.map(size => ({
        value: size,
        label: size,
      }));
    }
    const valueSelecaoProdutoSelected = selecoesProdutoOptions.find(
      option => option.value === selecaoDireta,
    );
    const valueProductSelected = productsOptions.find(option => option.value === productId);
    const valueProductTypeSelected = productTypesOptions.find(
      option => option.value === productTypeId,
    );
    const valueSizeSelected = sizesOptions.find(option => option.value === sizeSelected);
    return (
      <Paper>
        <form noValidate autoComplete="on" onSubmit={this.onCallSubmit.bind(this)}>
          <TextField
            label="Quantidade"
            value={qtd}
            autoFocus
            fullWidth
            onChange={this.onChangeQtd}
          />
          <ReactSelect
            label="Seleção do Produto"
            value={valueSelecaoProdutoSelected}
            options={selecoesProdutoOptions}
            onChange={value => this.setState({ selecaoDireta: value ? value.value : null })}
          />
          {selecaoDireta === true && (
            <ReactSelect
              label="Produto"
              value={valueProductSelected}
              options={productsOptions}
              onChange={value => this.setState({ productId: value ? value.value : null })}
            />
          )}
          {selecaoDireta === false && (
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
                options={sizesOptions}
                onChange={value => this.setState({ size: value ? value.value : null })}
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
ShipListItemForm.propTypes = {
  textoBotao: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  item: PropTypes.shape({
    qtd: PropTypes.number,
    selecao: PropTypes.string,
    productId: PropTypes.string,
    productTypeId: PropTypes.string,
    sizeId: PropTypes.number,
  }),
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  productTypes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  notification: PropTypes.shape({
    success: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
  }).isRequired,
};
ShipListItemForm.defaultProps = {
  item: {
    qtd: 1,
    selecao: null,
    productId: null,
    productTypeId: null,
    sizeId: null,
  },
};
const mapStateToProps = state => ({
  productTypes: state.productTypes,
  products: state.products,
});
const mapDispatchToProps = null;
export default compose(
  withNotification(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ShipListItemForm);
