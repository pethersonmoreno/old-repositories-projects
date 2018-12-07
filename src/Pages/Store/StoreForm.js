import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { Typography } from '@material-ui/core';
import PageWithBackButtonTemplate from 'Templates/PageWithBackButtonTemplate';
import InvisibleButtonSubmit from 'Atoms/InvisibleButtonSubmit';

class StoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.store };
  }

  onSave = async (event) => {
    const { save, onSaved } = this.props;
    const { name } = this.state;
    event.preventDefault();
    asyncOperation(() => save({ ...this.state }), {
      successMessage: `Sucesso ao salvar Loja ${name}`,
      successCallback: onSaved,
      errorMessage: 'Erro ao salvar Loja',
    });
  };

  render() {
    const { editing, backPath, title } = this.props;
    const {
      id, name, physicalStoreAddress, virtualStoreSite,
    } = this.state;
    let content;
    let onDone;
    if (editing && !id) {
      onDone = null;
      content = <Typography>Loja não encontrada</Typography>;
    } else {
      onDone = this.onSave;
      content = (
        <form noValidate autoComplete="on" onSubmit={this.onSave}>
          <InvisibleButtonSubmit />
          <TextField
            label="Nome"
            value={name}
            autoFocus
            fullWidth
            onChange={event => this.setState({ name: event.target.value })}
          />
          <TextField
            label="Endereço da Loja Física"
            value={physicalStoreAddress}
            fullWidth
            onChange={event => this.setState({ physicalStoreAddress: event.target.value })}
          />
          <TextField
            label="Site da Loja Virtual"
            value={virtualStoreSite}
            fullWidth
            onChange={event => this.setState({ virtualStoreSite: event.target.value })}
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
StoreForm.propTypes = {
  editing: PropTypes.bool,
  title: PropTypes.string.isRequired,
  backPath: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  store: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    physicalStoreAddress: PropTypes.string,
    virtualStoreSite: PropTypes.string,
  }),
};
StoreForm.defaultProps = {
  editing: false,
  store: {
    id: null,
    name: '',
    physicalStoreAddress: '',
    virtualStoreSite: '',
  },
};
export default StoreForm;
