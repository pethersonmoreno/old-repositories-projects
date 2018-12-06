import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { asyncOperation } from 'HOC/withAsyncOperation';
import InvisibleButtonSubmit from 'Atoms/InvisibleButtonSubmit';
import PageWithBackButtonTemplate from 'Templates/PageWithBackButtonTemplate';

class FormCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.shipList };
  }

  async onSave(event) {
    const { save, onSaved } = this.props;
    const { description } = this.state;
    event.preventDefault();
    asyncOperation(() => save({ ...this.state }), {
      successMessage: `Sucesso ao salvar Lista de Compras ${description}`,
      successCallback: onSaved,
      errorMessage: `Erro ao salvar Lista de Compras ${description}`,
    });
  }

  render() {
    const { backPath, title } = this.props;
    const { description } = this.state;

    const onDone = this.onSave;
    return (
      <PageWithBackButtonTemplate
        backPath={backPath}
        titulo={title}
        onDone={onDone}
        withButtonAccount={false}
      >
        <Paper className="paper">
          <form noValidate autoComplete="on" onSubmit={this.onSave.bind(this)}>
            <InvisibleButtonSubmit />
            <div>
              <TextField
                label="Descrição"
                value={description}
                autoFocus
                fullWidth
                onChange={event => this.setState({ description: event.target.value })}
              />
            </div>
          </form>
        </Paper>
      </PageWithBackButtonTemplate>
    );
  }
}
FormCategory.propTypes = {
  title: PropTypes.string.isRequired,
  backPath: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  shipList: PropTypes.shape({
    description: PropTypes.string,
  }),
};
FormCategory.defaultProps = {
  shipList: {
    description: '',
  },
};
export default FormCategory;
