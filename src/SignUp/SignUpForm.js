import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FormPageTemplate from '../Templates/FormPageTemplate';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = async event => {
    const { signUpUserWithEmailAndPassword } = this.props;
    const { email, passwordOne } = this.state;
    event.preventDefault();

    const signUpResult = await signUpUserWithEmailAndPassword(
      email,
      passwordOne
    );
    console.log('signUpResult: ', signUpResult);
  };

  render() {
    const {
 email, passwordOne, passwordTwo, error 
} = this.state;

    const isInvalid =      passwordOne !== passwordTwo || passwordOne === '' || email === '';

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
            Registrar
          </Button>
)}
        links={(
<p>
            Já tem uma conta?
            <Link to="/signin" variant="contained" color="primary">
              Logar
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
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Senha"
        />
        <TextField
          fullWidth
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirme a Senha"
        />
      </FormPageTemplate>
    );
  }
}
SignUpForm.propTypes = {
  signUpUserWithEmailAndPassword: PropTypes.func.isRequired
};
export default SignUpForm;
