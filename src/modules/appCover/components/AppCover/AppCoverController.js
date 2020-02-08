import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import AppCoverView from './AppCoverView';
import { toggleMenu } from '../../actions/actionsApp';
import { unsubscribeCashFlowsList } from '../../../utils/hooks/useCashFlowsList';
import { usePageTitle } from '../../selectors/selectorsApp';

const AppCoverController = ({
  children
}) => {
  const dispatch = useDispatch();
  useEffect(() => () => {
    unsubscribeCashFlowsList();
  }, []);
  const pageTitle = usePageTitle();

  const title = `Cash Flow${pageTitle ? ` - ${pageTitle}` : ''}`;
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
