import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ReactSelect,InputList} from '../../Atoms';
import {categories, sizes, brands} from '../../data';

const categoriesOptions = categories.map(category => ({
  value: category.id,
  label: category.description,
}));

export default class Form extends Component{
  constructor(props){
    super(props);
    const productType = (props.productType?props.productType:{id:null, categoryId: null, description: ''});
    this.state = {
      description: productType.description,
      categoryId: productType.categoryId,
      sizes:sizes.filter(size=>size.productTypeId === productType.id).map(size=>size.description),
      brands:brands.filter(brand=>brand.productTypeId === productType.id).map(brand=>brand.description),
    };
  }
  onCallSubmit(event){
    const {onSubmit} = this.props;
    event.preventDefault();
    const data = {
      description: this.state.description,
      categoryId: this.state.categoryId,
      sizes:this.state.sizes,
      brands:this.state.brands,
    };
    // this.setState({description:''});
    onSubmit(event, data);
  }
  onUpdateSizes=(sizes)=>{
    this.setState({sizes});
  }
  onUpdateBrands=(brands)=>{
    this.setState({brands});
  }
  render(){
    const {textoBotao} = this.props;
    const valueCategorySelected = categoriesOptions.find(option=>option.value === this.state.categoryId);
    return (
      <Paper>
        <form noValidate autoComplete="on" onSubmit={this.onCallSubmit.bind(this)}>
          <TextField label="Descrição" value={this.state.description} 
            autoFocus={true}
            fullWidth
            onChange={event => this.setState({description:event.target.value})} />
          <ReactSelect label="Categoria" value={valueCategorySelected} 
            options={categoriesOptions} onChange={value => this.setState({categoryId:(!!value?value.value:null)})} />
          <InputList label="Novo Tamanho" fullWidth 
            value={this.state.sizes}
            onUpdateValue={this.onUpdateSizes} />
          <InputList label="Nova Marca" fullWidth 
            value={this.state.brands}
            onUpdateValue={this.onUpdateBrands} />
          <div className="formButtons">
            <Button type="submit" variant="contained" color="primary">{textoBotao}</Button>
          </div>
        </form>
      </Paper>
    );
  }
}

