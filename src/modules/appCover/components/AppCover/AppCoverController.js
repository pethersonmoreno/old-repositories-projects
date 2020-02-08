import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import AppCoverView from './AppCoverView';
import { toggleMenu } from '../../actions/actionsApp';
import { usePageTitle } from '../../selectors/selectorsApp';

const AppCoverController = ({
  children
}) => {
  const dispatch = useDispatch();
  const pageTitle = usePageTitle();

  const title = pageTitle || 'Cash Flow';
  return (
    <AppCoverView
      openMenu={() => dispatch(toggleMenu())}
      title={title}
    >
      {children}
    </AppCoverView>
  );
};

AppCoverController.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default AppCoverController;
