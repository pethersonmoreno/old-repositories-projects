import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FormPageTemplate from '../Templates/FormPageTemplate';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = async event => {
    const { email, password } = this.state;
    const { signInWithEmailAndPassword } = this.props;
    event.preventDefault();

    const signResult = await signInWithEmailAndPassword(email, password);
    console.log('signResult: ', signResult);
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <FormPageTemplate
        onSubmit={this.onSubmit}
        error={error}
        botoes={(
<Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isInvalid}
          >
            Logar
          </Button>
)}
        links={(
<p>
            Não tem uma conta?
            <Link to="/signup" variant="contained" color="primary">
              Registrar
            </Link>
          </p>
)}
      >
        <TextField
          autoFocus
          fullWidth
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="E-mail"
        />
        <TextField
          fullWidth
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Senha"
        />
      </FormPageTemplate>
    );
  }
}
SignInForm.propTypes = {
  signInWithEmailAndPassword: PropTypes.func
};
SignInForm.defaultProps = {
  signInWithEmailAndPassword: () => {}
};
export default SignInForm;
