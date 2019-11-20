/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import AppContext from '../contexts/AppContext';


const withAppData = WrappedComponent => props => (
  <AppContext.Consumer>
    {context => <WrappedComponent {...props} {...context} />}
  </AppContext.Consumer>
);

export default withAppData;
