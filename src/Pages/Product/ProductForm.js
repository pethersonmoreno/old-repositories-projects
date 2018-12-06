import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { asyncOperation } from 'HOC/withAsyncOperation';
import InvisibleButtonSubmit from 'Atoms/InvisibleButtonSubmit';
import PageWithBackButtonTemplate from 'Templates/PageWithBackButtonTemplate';
import { Typography } from '@material-ui/core';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.product };
  }

  onSave = async (event) => {
    const { save, onSaved } = this.props;
    event.preventDefault();
    const { description } = this.state;
    if (description) {
      asyncOperation(() => save({ ...this.state }), {
        successMessage: 'Sucesso ao salvar produto',
        successCallback: onSaved,
        errorMessage: 'Erro ao salvar produto',
      });
    }
  };

  render() {
    const { editing, backPath, title } = this.props;
    const { id, description, ean } = this.state;
    let content;
    let onDone;
    if (editing && !id) {
      onDone = null;
      content = <Typography>Produto não encontrada</Typography>;
    } else {
      onDone = this.onSave;
      content = (
        <form noValidate autoComplete="on" onSubmit={this.onSave}>
          <InvisibleButtonSubmit />
          <TextField
            label="Descrição"
            value={description}
            autoFocus
            fullWidth
            onChange={event => this.setState({ description: event.target.value })}
          />
          <TextField
            label="EAN"
            value={ean}
            fullWidth
            onChange={event => this.setState({ ean: event.target.value })}
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
        <Paper className="paper">{content}</Paper>
      </PageWithBackButtonTemplate>
    );
  }
}
ProductForm.propTypes = {
  editing: PropTypes.bool,
  title: PropTypes.string.isRequired,
  backPath: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    ean: PropTypes.string,
  }),
};
ProductForm.defaultProps = {
  editing: false,
  product: {
    id: null,
    description: '',
    ean: '',
  },
};
export default ProductForm;
