import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class FormCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.shipList };
  }

  onCallSubmit(event) {
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit({ ...this.state });
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
  onSubmit: PropTypes.func.isRequired,
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
