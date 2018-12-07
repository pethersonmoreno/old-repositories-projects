import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ReactSelect from 'Atoms/ReactSelect';
import { asyncOperation } from 'HOC/withAsyncOperation';
import InputIntegerWithButtons from 'Atoms/InputIntegerWithButtons';
import PageWithBackButtonTemplate from 'Templates/PageWithBackButtonTemplate';
import { Typography } from '@material-ui/core';
import InvisibleButtonSubmit from 'Atoms/InvisibleButtonSubmit';

const styles = () => ({
  currentPrice: {
    marginLeft: 10,
    '& input': {
      textAlign: 'right',
    },
  },
});
class ShipListItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.item };
  }

  onSave = async (event) => {
    const { save, onSaved } = this.props;
    event.preventDefault();
    asyncOperation(() => save({ ...this.state }), {
      successMessage: 'Sucesso ao salvar Item da Lista de Compras',
      successCallback: onSaved,
      errorMessage: 'Erro ao salvar Item da Lista de Compras',
    });
  }

  onChangeQtd = (value) => {
    const qtd = parseInt(value, 10);
    this.setState({ qtd: qtd || 0 });
  };

  onChangeCurrentPrice = (event) => {
    const currentPrice = parseFloat(event.target.value);
    this.setState({ currentPrice: currentPrice || 0.0 });
  };

  render() {
    const {
      classes, editing, backPath, title, categories,
    } = this.props;
    const {
      id,
      qtd, description, categoryId, currentPrice, note,
    } = this.state;

    let content;
    let onDone;
    if (editing && !id) {
      onDone = null;
      content = <Typography>Item não encontrado</Typography>;
    } else {
      onDone = this.onSave;

      const categoriesOptions = categories.map(category => ({
        value: category.id,
        label: category.description,
      }));
      const valueCategorySelected = categoriesOptions.find(option => option.value === categoryId);
      content = (
        <form noValidate autoComplete="on" onSubmit={this.onSave}>
          <InvisibleButtonSubmit />
          <InputIntegerWithButtons
            label="Quantidade"
            value={qtd}
            onChange={this.onChangeQtd}
          />
          <TextField
            label="Descrição"
            inputProps={{
              placeholder: 'Se não informado, usa a descrição do primeiro produto aceito',
            }}
            value={description}
            autoFocus
            fullWidth
            onChange={event => this.setState({ description: event.target.value })}
          />
          <Grid container>
            <Grid item xs={6}>
              <ReactSelect
                label="Categoria"
                value={valueCategorySelected}
                options={categoriesOptions}
                onChange={value => this.setState({ categoryId: value ? value.value : null })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.currentPrice}
                label="Preço Atual (R$)"
                inputProps={{
                  type: 'number',
                  step: '0.01',
                  min: '0.00',
                }}
                value={currentPrice}
                fullWidth
                onChange={this.onChangeCurrentPrice}
              />
            </Grid>
          </Grid>
          <TextField
            label="Nota"
            value={note}
            fullWidth
            onChange={event => this.setState({ note: event.target.value })}
          />
        </form>
      );
    }
    return (
      <PageWithBackButtonTemplate
        backPath={backPath}
        titulo={title}
        onDone={onDone}
        withButtonAccount={false}
      >
        <Paper className="paper">
          {content}
        </Paper>
      </PageWithBackButtonTemplate>
    );
  }
}
ShipListItemForm.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  editing: PropTypes.bool,
  title: PropTypes.string.isRequired,
  backPath: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    qtd: PropTypes.number,
    description: PropTypes.string,
    categoryId: PropTypes.string,
    currentPrice: PropTypes.number,
    note: PropTypes.string,
  }),
  categories: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  save: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};
ShipListItemForm.defaultProps = {
  editing: false,
  item: {
    id: null,
    qtd: 1,
    description: '',
    categoryId: null,
    currentPrice: 0.0,
    note: '',
  },
};
const mapStateToProps = state => ({
  categories: state.categories,
});
const mapDispatchToProps = null;
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles, { withTheme: true }),
)(ShipListItemForm);
