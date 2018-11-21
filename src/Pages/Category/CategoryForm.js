import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { asyncOperation } from 'HOC/withAsyncOperation';

class FormCategory extends Component {
  constructor(props) {
    super(props);
    const { description } = props;
    this.state = {
      description,
    };
  }

  async onCallSubmit(event) {
    const { save, onSaved } = this.props;
    const { description } = this.state;
    event.preventDefault();
    asyncOperation(() => save({ ...this.state }), {
      successMessage: `Sucesso ao salvar Categoria ${description}`,
      successCallback: onSaved,
      errorMessage: 'Erro ao salvar categoria',
    });
  }

  render() {
    const { textoBotao } = this.props;
    const { description } = this.state;
    return (
      <Paper>
        <form noValidate autoComplete="on" onSubmit={this.onCallSubmit.bind(this)}>
          <div>
            <TextField
              label="Descrição"
              value={description}
              autoFocus
              fullWidth
              onChange={event => this.setState({ description: event.target.value })}
            />
          </div>
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
FormCategory.propTypes = {
  textoBotao: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};
export default FormCategory;
