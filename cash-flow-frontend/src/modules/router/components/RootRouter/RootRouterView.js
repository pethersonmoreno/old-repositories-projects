import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Spinner from '../../../utils/components/Spinner';
import Box from '../../../utils/components/Box';

const NavigationRouter = process.env.NODE_ENV !== 'development' ? HashRouter : BrowserRouter;
const RootRouterView = ({ loading, basename, children }) => (
  <NavigationRouter basename={basename}>
    {loading && (
      <Box center fill>
        <Spinner />
      </Box>
    )}
    {!loading && children}
  </NavigationRouter>
);
RootRouterView.propTypes = {
  loading: PropTypes.bool.isRequired,
  basename: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
RootRouterView.defaultProps = {
  basename: '',
};

export default RootRouterView;
