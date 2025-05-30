import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const withAuthorization = (authCompare, pathToGoIfDifferent) => (WrappedComponent) => {
  class WithAuthorizationWrapper extends React.Component {
    componentWillMount() {
      this.verifyLoggedUser();
    }

    componentDidMount() {
      this.verifyLoggedUser();
    }

    componentDidUpdate() {
      this.verifyLoggedUser();
    }

    verifyLoggedUser = () => {
      const { history } = this.props;
      if (this.authIsDifferent()) {
        history.push(pathToGoIfDifferent);
      }
    };

    authIsDifferent = () => {
      const { auth } = this.props;
      return Object.keys(authCompare).find(key => auth[key] !== authCompare[key]);
    };

    render() {
      if (this.authIsDifferent()) {
        return null;
      }
      return <WrappedComponent {...this.props} />;
    }
  }
  WithAuthorizationWrapper.propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    auth: PropTypes.shape({
      loggedIn: PropTypes.bool,
      email: PropTypes.string,
    }),
  };
  WithAuthorizationWrapper.defaultProps = {
    auth: {
      loggedIn: false,
      email: null,
    },
  };
  const mapStateToProps = state => ({
    auth: state.user.auth,
  });
  const mapDispatchToProps = null;
  return compose(
    withRouter,
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(WithAuthorizationWrapper);
};
export default withAuthorization;
