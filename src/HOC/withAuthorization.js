import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const withAuthorization = (loggedState, pathToGoIfDifferent) => (WrappedComponent) => {
  class WithAuthorizationWrapper extends React.Component {
    componentDidMount() {
      this.verifyLoggedUser();
    }

    componentDidUpdate() {
      this.verifyLoggedUser();
    }

    verifyLoggedUser = () => {
      const { history, auth } = this.props;
      if (auth.loggedIn !== loggedState) {
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
    auth: state.auth,
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
