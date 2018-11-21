import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { operations } from 'controle-compras-frontend-redux/ducks/auth';
import FormPageTemplate from 'Templates/FormPageTemplate';
import { asyncOperation } from 'HOC/withAsyncOperation';
import withAuthorization from 'HOC/withAuthorization';

class SignUpForm extends Component {
  state = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { signUpUserWithEmailAndPassword } = this.props;
    const { email, passwordOne } = this.state;
    event.preventDefault();

    asyncOperation(() => signUpUserWithEmailAndPassword(email, passwordOne), {
      successMessage: 'Registrado com sucesso seu usuário e senha',
      errorMessage: 'Falha ao registrar seu usuário e senha',
      errorCallback: (error) => {
        this.setState({ error });
      },
    });
  };

  render() {
    const {
      email, passwordOne, passwordTwo, error,
    } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '';

    return (
      <FormPageTemplate
        onSubmit={this.onSubmit}
        error={error}
        botoes={(
          <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
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
  signUpUserWithEmailAndPassword: PropTypes.func.isRequired,
};
const mapStateToProps = null;
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signUpUserWithEmailAndPassword: operations.signUpUserWithEmailAndPassword,
  },
  dispatch,
);
export default compose(
  withAuthorization(false, '/shipList'),
  connect(mapStateToProps, mapDispatchToProps),
)(SignUpForm);
