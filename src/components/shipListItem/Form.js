import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ReactSelect} from '../fields';
import {products, productTypes, sizes, brands, SELECAO_DIRETA, SELECAO_POR_TIPO_TAMANHO} from '../dataApp';


const selecoesProdutoOptions = [
  {value:SELECAO_DIRETA, label: 'Direta'},
  {value:SELECAO_POR_TIPO_TAMANHO, label: 'Por Tipo e Tamanho'},
];
const productsOptions = products.map(product=>{
  const productType = productTypes.find(productType=>productType.id === product.productTypeId);
  const brand = brands.find(brand=>brand.id === product.brandId);
  const size = sizes.find(size=>size.id === product.sizeId);
  return {
    value: product.id,
    label: productType.description+' '+brand.description+' '+size.description,
  }
})
const productTypesOptions = productTypes.map(productType => ({
  value: productType.id,
  label: productType.description,
}));
const sizesOptions = sizes.map(size => ({
  value: size.id,
  label: size.description,
  productTypeId: size.productTypeId,
}));

export default class Form extends Component{
  constructor(props){
    super(props);
    const item = (props.item?props.item:{qtd:null, selecao:null, productId:null, productTypeId:null, sizeId: null});
    this.state = Object.assign(
      {},
      item
    )
  }
  onCallSubmit(event){
    const {onSubmit} = this.props;
    event.preventDefault();
    onSubmit(event, Object.assign({}, this.state));
  }
  render(){
    const {textoBotao} = this.props;
    const valueSelecaoProdutoSelected = selecoesProdutoOptions.find(option=>option.value === this.state.selecao);
    const valueProductSelected = productsOptions.find(option=>option.value === this.state.productId);
    const valueProductTypeSelected = productTypesOptions.find(option=>option.value === this.state.productTypeId);
    const sizesOptionsUsed = sizesOptions.filter(option=>option.productTypeId === this.state.productTypeId);
    const valueSizeSelected = sizesOptionsUsed.find(option=>option.value === this.state.sizeId);
    return (
      <Paper>
        <form noValidate autoComplete="on" onSubmit={this.onCallSubmit.bind(this)}>
          <TextField label="Quantidade" value={this.state.qtd} 
            fullWidth
            onChange={event => this.setState({qtd:event.target.value})} />
          <ReactSelect label="Seleção do Produto" value={valueSelecaoProdutoSelected}
            options={selecoesProdutoOptions}
            onChange={value => this.setState({selecao:(!!value?value.value:null)})} />
          {this.state.selecao === SELECAO_DIRETA && (
            <ReactSelect label="Produto" value={valueProductSelected}
              options={productsOptions}
              onChange={value => this.setState({productId:(!!value?value.value:null)})} />
          )}
          {this.state.selecao === SELECAO_POR_TIPO_TAMANHO && (
            <div>
              <ReactSelect label="Tipo de Produto" value={valueProductTypeSelected}
                options={productTypesOptions}
                onChange={value => this.setState({productTypeId:(!!value?value.value:null)})} />
              <ReactSelect label="Tamanho" value={valueSizeSelected}
                options={sizesOptionsUsed}
                onChange={value => this.setState({sizeId:(!!value?value.value:null)})} />  
            </div>
          )}
          <div className="formButtons">
            <Button type="submit" variant="contained" color="primary">{textoBotao}</Button>
          </div>
        </form>
      </Paper>
    );
  }
}

