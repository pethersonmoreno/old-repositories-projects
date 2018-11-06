import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ReactSelect} from '../Atoms';
import {productTypes, sizes, brands} from '../data';

const productTypesOptions = productTypes.map(productType => ({
  value: productType.id,
  label: productType.description,
}));
const sizesOptions = sizes.map(size => ({
  value: size.id,
  label: size.description,
  productTypeId: size.productTypeId,
}));
const brandsOptions = brands.map(brand => ({
  value: brand.id,
  label: brand.description,
  productTypeId: brand.productTypeId,
}));

export default class Form extends Component{
  constructor(props){
    super(props);
    const product = (props.product?props.product:{productTypeId:null, sizeId: null, brandId: null, ean: ''});
    this.state = {...product}
  }
  onCallSubmit(event){
    const {onSubmit} = this.props;
    event.preventDefault();
    const {productTypeId, sizeId, brandId} = this.state;
    if(productTypeId && sizeId && brandId){
      onSubmit({...this.state});
    }
  }
  render(){
    const {textoBotao} = this.props;
    const valueProductTypeSelected = productTypesOptions.find(option=>option.value === this.state.productTypeId);
    const brandsOptionsUsed = brandsOptions.filter(option=>option.productTypeId === this.state.productTypeId);
    const sizesOptionsUsed = sizesOptions.filter(option=>option.productTypeId === this.state.productTypeId);
    const valueBrandSelected = brandsOptionsUsed.find(option=>option.value === this.state.brandId);
    const valueSizeSelected = sizesOptionsUsed.find(option=>option.value === this.state.sizeId);
    return (
      <Paper>
        <form noValidate autoComplete="on" onSubmit={this.onCallSubmit.bind(this)}>
          <ReactSelect label="Tipo de Produto" value={valueProductTypeSelected}
            autoFocus={true}
            options={productTypesOptions}
            onChange={value => this.setState({productTypeId:(!!value?value.value:null)})} />
          <ReactSelect label="Marca" value={valueBrandSelected}
            options={brandsOptionsUsed}
            onChange={value => this.setState({brandId:(!!value?value.value:null)})} />
          <ReactSelect label="Tamanho" value={valueSizeSelected}
            options={sizesOptionsUsed}
            onChange={value => this.setState({sizeId:(!!value?value.value:null)})} />  
          <TextField label="EAN" value={this.state.ean} 
            fullWidth
            onChange={event => this.setState({ean:event.target.value})} />
          <div className="formButtons">
            <Button type="submit" variant="contained" color="primary">{textoBotao}</Button>
          </div>
        </form>
      </Paper>
    );
  }
}

