import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const withAuthorization = (authCompare, pathToGoIfDifferent) => (WrappedComponent) => {
  class WithAuthorizationWrapper extends React.Component {
    componentDidMount() {
      this.verifyLoggedUser();
    }

    componentDidUpdate() {
      this.verifyLoggedUser();
    }

    verifyLoggedUser = () => {
      const { history, auth } = this.props;
      const authIsDifferent = Object.keys(authCompare).find(key => auth[key] !== authCompare[key]);
      if (authIsDifferent) {
        history.push(pathToGoIfDifferent);
      }
    };

    render() {
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
