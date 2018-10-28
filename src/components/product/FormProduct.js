import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ReactSelect} from '../fields';
import {unidades, marcas} from '../dataApp';

const unidadesOpcoes = Object.entries(unidades).map((unidadeEntry)=>{
  const unidade = unidadeEntry[0];
  const descricao = unidadeEntry[1];
  return {
    value: unidade,
    label: unidade + ' - '+descricao,
  };
});
const marcasOpcoes = marcas.map(marca => ({
  value: marca,
  label: marca,
}));

export default class FormProduct extends Component{
  constructor(props){
    super(props);
    this.titulo = null;
    this.marca = null;
    this.ean = null;
    this.unidade = null;
    this.quantidadeProporcao = null;
    this.unidadeProporcao = null;
  }
  onCallSubmit(event){
    const {onSubmit} = this.props;
    event.preventDefault();
    onSubmit(event, {
      titulo: this.titulo,
      marca: this.marca,
      ean: this.ean,
      unidade: this.unidade,
      quantidadeProporcao: this.quantidadeProporcao,
      unidadeProporcao: this.unidadeProporcao,
    });
  }
  render(){
    const {textoBotao} = this.props;
    return (
      <form noValidate autoComplete="on" onSubmit={this.onCallSubmit.bind(this)}>
        <div>
          <TextField label="Título" onChange={event => this.titulo = event.target.value} />
          <ReactSelect label="Marca" options={marcasOpcoes} onChange={value => this.marca = (!!value?value.value:null)} />
          <TextField label="EAN" onChange={event => this.ean = event.target.value} />
          <ReactSelect label="Unidade de Medida" options={unidadesOpcoes} onChange={value => this.unidade = (!!value?value.value:null)} />
          <fieldset>
            <legend>Proporção</legend>
            <TextField label="Quantidade" onChange={event => this.quantidadeProporcao = event.target.value} />
            <ReactSelect label="Unidade de Medida" options={unidadesOpcoes} onChange={value => this.unidadeProporcao = (!!value?value.value:null)} />
          </fieldset>
        </div>
        <div>
          <Button type="submit" variant="contained">{textoBotao}</Button>
        </div>
      </form>
    );
  }
}

