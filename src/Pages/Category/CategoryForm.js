import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { asyncOperation } from 'HOC/withAsyncOperation';
import { Typography } from '@material-ui/core';
import PageWithBackButtonTemplate from 'Templates/PageWithBackButtonTemplate';
import InvisibleButtonSubmit from 'Atoms/InvisibleButtonSubmit';

class FormCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.category };
  }

  onSave = async (event) => {
    const { save, onSaved } = this.props;
    const { description } = this.state;
    event.preventDefault();
    asyncOperation(() => save({ ...this.state }), {
      successMessage: `Sucesso ao salvar Categoria ${description}`,
      successCallback: onSaved,
      errorMessage: 'Erro ao salvar categoria',
    });
  };

  render() {
    const { editing, backPath, title } = this.props;
    const { id, description } = this.state;
    let content;
    let onDone;
    if (editing && !id) {
      onDone = null;
      content = <Typography>Categoria não encontrada</Typography>;
    } else {
      onDone = this.onSave;
      content = (
        <form noValidate autoComplete="on" onSubmit={this.onSave.bind(this)}>
          <InvisibleButtonSubmit />
          <TextField
            label="Descrição"
            value={description}
            autoFocus
            fullWidth
            onChange={event => this.setState({ description: event.target.value })}
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
FormCategory.propTypes = {
  editing: PropTypes.bool,
  title: PropTypes.string.isRequired,
  backPath: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  category: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
  }),
};
FormCategory.defaultProps = {
  editing: false,
  category: {
    id: null,
    description: '',
  },
};
export default FormCategory;
