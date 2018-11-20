import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReactSelect from 'Atoms/ReactSelect';
import InputList from 'Atoms/InputList';
import withNotification from 'HOC/withNotification';

class Form extends Component {
  constructor(props) {
    super(props);
    const { productType } = props;
    this.state = {
      ...productType,
    };
  }

  async onCallSubmit(event) {
    const { save, onSaved, notification } = this.props;
    const { description } = this.state;
    event.preventDefault();
    try {
      const result = await save({ ...this.state });
      notification.success(`Sucesso ao salvar tipo de produto ${description}`);
      onSaved(result);
    } catch (error) {
      notification.error(`Erro ao salvar tipo de produto ${description}`, error);
    }
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
  save: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  productType: PropTypes.shape({
    id: PropTypes.string,
    categoryId: PropTypes.string,
    description: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.string),
    brands: PropTypes.arrayOf(PropTypes.string),
  }),
  categories: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  notification: PropTypes.shape({
    success: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
  }).isRequired,
};
Form.defaultProps = {
  productType: {
    id: null,
    categoryId: null,
    description: '',
  },
};
const mapStateToProps = state => ({
  categories: state.categories,
});
const mapDispatchToProps = null;
export default compose(
  withNotification(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Form);
