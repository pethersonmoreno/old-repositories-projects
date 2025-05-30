import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

export const goBack = (backPath, props) => () => {
  const { history } = props;
  if (backPath instanceof Function) {
    history.push(backPath(props));
  } else if (backPath) {
    history.push(backPath);
  } else {
    history.push('/');
  }
};

const withGoBack = backPath => (WrappedComponent) => {
  const WithGoBackWrapper = ({ history, ...otherProps }) => (
    <WrappedComponent
      {...otherProps}
      history={history}
      goBack={goBack(backPath, { history, ...otherProps })}
    />
  );
  WithGoBackWrapper.propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };
  return withRouter(WithGoBackWrapper);
};
export default withGoBack;
