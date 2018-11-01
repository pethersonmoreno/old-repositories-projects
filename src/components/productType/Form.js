import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import {ReactSelect} from '../fields';
import {categories, sizes, brands} from '../dataApp';


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
  onKeyPressSize(event){
    if(event.key === 'Enter'){
      event.preventDefault();
      this.setState({sizes:this.state.sizes.concat(event.target.value)});
      event.target.value = '';
    }
  }
  onDeleteSize(size){
    const indexSize = this.state.sizes.indexOf(size);
    if(indexSize !== undefined){
      this.setState({sizes:this.state.sizes.filter(value=>value !== size)});
    }
  }
  onKeyPressBrand(event){
    if(event.key === 'Enter'){
      event.preventDefault();
      this.setState({brands:this.state.brands.concat(event.target.value)});
      event.target.value = '';
    }
  }
  onDeleteBrand(brand){
    const indexBrand = this.state.brands.indexOf(brand);
    if(indexBrand !== undefined){
      this.setState({brands:this.state.brands.filter(value=>value !== brand)});
    }
  }
  render(){
    const {textoBotao} = this.props;
    const valueCategorySelected = categoriesOptions.find(option=>option.value === this.state.categoryId);
    return (
      <Paper>
        <form noValidate autoComplete="on" onSubmit={this.onCallSubmit.bind(this)}>
          <TextField label="Descrição" value={this.state.description} 
            fullWidth
            onChange={event => this.setState({description:event.target.value})} />
          <ReactSelect label="Categoria" value={valueCategorySelected} 
            options={categoriesOptions} onChange={value => this.setState({categoryId:(!!value?value.value:null)})} />
          <div>
            <TextField label="Novo Tamanho" 
              fullWidth
              onKeyPress={this.onKeyPressSize.bind(this)} />
            <div>
              {this.state.sizes.map(size=>(
                <Chip key={size}
                  label={size}
                  onDelete={this.onDeleteSize.bind(this, size)}
                />
              ))}
            </div>
          </div>
          <div>
            <TextField label="Nova Marca" 
              fullWidth
              onKeyPress={this.onKeyPressBrand.bind(this)}  />
            <div>
              {this.state.brands.map(marca=>(
                <Chip key={marca}
                  label={marca}
                  onDelete={this.onDeleteBrand.bind(this, marca)}
                />
              ))}
            </div>
          </div>
          <div className="formButtons">
            <Button type="submit" variant="contained">{textoBotao}</Button>
          </div>
        </form>
      </Paper>
    );
  }
}

