/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import useAuthState from '../hooks/useAuthState';

const authIsDifferent = (authState, authCompare) => Object.keys(authCompare).find(key => {
  const { [key]: value } = authState;
  return value !== authCompare[key];
});

const verifyLoggedUser = (history, authState, authCompare, pathToGoIfDifferent) => {
  if (authIsDifferent(authState, authCompare)) {
    history.push(pathToGoIfDifferent);
  }
};


const withAuthorization = (authCompare, pathToGoIfDifferent) => WrappedComponent => {
  const WithAuthorizationWrapper = props => {
    const { history } = props;
    const [authState, , unlinkState] = useAuthState();
    useEffect(() => {
      verifyLoggedUser(history, authState, authCompare, pathToGoIfDifferent);
      return unlinkState;
    }, [authState, history, unlinkState]);
    if (authIsDifferent(authState, authCompare)) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
  WithAuthorizationWrapper.propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };
  return withRouter(WithAuthorizationWrapper);
};
export default withAuthorization;
