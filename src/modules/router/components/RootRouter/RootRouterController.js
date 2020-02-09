import React from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../../auth/hooks/useAuth';
import RootRouterView from './RootRouterView';

const RootRouterController = ({ children }) => {
  const basename = process.env.PUBLIC_URL;
  const [loading] = useAuth();
  return (
    <RootRouterView basename={basename} loading={loading}>
      {children}
    </RootRouterView>
  );
};
RootRouterController.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default RootRouterController;
