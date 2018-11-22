import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import { operations } from 'controle-compras-frontend-redux/ducks/user';
import { asyncOperation } from 'HOC/withAsyncOperation';
import FormPageTemplate from 'Templates/FormPageTemplate';
import withAuthorization from 'HOC/withAuthorization';

class EmailVerificationForm extends Component {
  state = {
    error: null,
  };

  sendEmailVerification = () => {
    const { sendEmailVerification } = this.props;
    asyncOperation(() => sendEmailVerification(), {
      successMessage: 'Sucesso ao enviar e-mail de verificação',
      errorMessage: 'Falha ao enviar e-mail de verificação',
      errorCallback: (error) => {
        this.setState({ error });
      },
    });
  };

  render() {
    const { error } = this.state;

    return (
      <FormPageTemplate
        error={error}
        botoes={(
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={this.sendEmailVerification}
          >
            Re-Enviar
          </Button>
)}
        links={null}
      >
        <p>
          E-mail não confirmado. Acesse o link no e-mail de confirmação enviado para o seu e-mail.
        </p>
      </FormPageTemplate>
    );
  }
}
EmailVerificationForm.propTypes = {
  sendEmailVerification: PropTypes.func.isRequired,
};
const mapStateToProps = null;
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    sendEmailVerification: operations.sendEmailVerification,
  },
  dispatch,
);
export default compose(
  withAuthorization({ loggedIn: true, emailVerified: false }, '/signIn'),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EmailVerificationForm);
