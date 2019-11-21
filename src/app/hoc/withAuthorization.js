/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withAppStateActions from './withAppStateActions';

const withAuthorization = (authCompare, pathToGoIfDifferent) => WrappedComponent => {
  class WithAuthorizationWrapper extends React.Component {
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

    authIsDifferent = () => Object.keys(authCompare).find(key => {
      const { [key]: value } = this.props;
      return value !== authCompare[key];
    });

    render() {
      if (this.authIsDifferent()) {
        return null;
      }
      return <WrappedComponent {...this.props} />;
    }
  }
  WithAuthorizationWrapper.propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };
  return withAppStateActions(withRouter(WithAuthorizationWrapper));
};
export default withAuthorization;
