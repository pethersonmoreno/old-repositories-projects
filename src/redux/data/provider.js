import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import DataContext from './context';
import dataStore from './store';

const DataProvider = ({ children }) => (
  <Provider context={DataContext} store={dataStore}>
    {children}
  </Provider>
);
DataProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default DataProvider;
