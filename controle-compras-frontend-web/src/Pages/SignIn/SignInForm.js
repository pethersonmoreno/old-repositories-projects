import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { operations } from 'controle-compras-frontend-redux/ducks/user/auth';
import { asyncOperation } from 'HOC/withAsyncOperation';
import FormPageTemplate from 'Templates/FormPageTemplate';
import withAuthorization from 'HOC/withAuthorization';

class SignInForm extends Component {
  state = {
    email: '',
    password: '',
    error: null,
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { email, password } = this.state;
    const { signInWithEmailAndPassword, history } = this.props;
    event.preventDefault();

    asyncOperation(() => signInWithEmailAndPassword(email, password), {
      successMessage: 'Login efetuado com sucesso',
      successCallback: () => {
        history.push('/shipList');
      },
      errorMessage: 'Falha ao efetuar login',
      errorCallback: (error) => {
        this.setState({ error });
      },
    });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <FormPageTemplate
        onSubmit={this.onSubmit}
        error={error}
        botoes={(
          <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
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
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  signInWithEmailAndPassword: PropTypes.func.isRequired,
};
const mapStateToProps = null;
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signInWithEmailAndPassword: operations.signInWithEmailAndPassword,
  },
  dispatch,
);
export default compose(
  withAuthorization({ loggedIn: false }, '/shipList'),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SignInForm);
