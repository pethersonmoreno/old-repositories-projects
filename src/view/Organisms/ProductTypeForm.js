import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReactSelect from 'Atoms/ReactSelect';
import InputList from 'Atoms/InputList';
import { selectors } from 'state/ducks/data';

class Form extends Component {
  constructor(props) {
    super(props);
    const { productType, sizes, brands } = props;
    this.state = {
      ...productType,
      sizes: selectors.filterByProductTypeId(sizes, productType.id)
        .map(size => size.description),
      brands: selectors.filterByProductTypeId(brands, productType.id)
        .map(brand => brand.description),
    };
  }

  onCallSubmit(event) {
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit({ ...this.state });
  }

  onUpdateSizes = (sizes) => {
    this.setState({ sizes });
  };

  onUpdateBrands = (brands) => {
    this.setState({ brands });
  };

  render() {
    const { textoBotao, categories } = this.props;
    const {
      categoryId, description, sizes, brands,
    } = this.state;
    const categoriesOptions = categories.map(category => ({
      value: category.id,
      label: category.description,
    }));
    const valueCategorySelected = categoriesOptions.find(option => option.value === categoryId);
    return (
      <Paper>
        <form noValidate autoComplete="on" onSubmit={this.onCallSubmit.bind(this)}>
          <TextField
            label="Descrição"
            value={description}
            autoFocus
            fullWidth
            onChange={event => this.setState({ description: event.target.value })}
          />
          <ReactSelect
            label="Categoria"
            value={valueCategorySelected}
            options={categoriesOptions}
            onChange={value => this.setState({ categoryId: value ? value.value : null })}
          />
          <InputList
            label="Novo Tamanho"
            fullWidth
            value={sizes}
            onUpdateValue={this.onUpdateSizes}
          />
          <InputList
            label="Nova Marca"
            fullWidth
            value={brands}
            onUpdateValue={this.onUpdateBrands}
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
Form.propTypes = {
  textoBotao: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  productType: PropTypes.shape({
    id: PropTypes.number,
    categoryId: PropTypes.number,
    description: PropTypes.string,
  }),
  categories: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  sizes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  brands: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
Form.defaultProps = {
  productType: {
    id: null,
    categoryId: null,
    description: '',
  },
};
export default connect(
  state => ({
    categories: state.data.categories,
    sizes: state.data.sizes,
    brands: state.data.brands,
  }),
  null,
)(Form);
