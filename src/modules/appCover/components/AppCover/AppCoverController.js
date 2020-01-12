import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppCoverView from './AppCoverView';
import useAppState from '../../hooks/useAppState';
import { toggleMenu } from '../../actions';
import { unsubscribeAccountsList } from '../../../utils/hooks/useAccountsList';
import { unsubscribeCashFlowDescriptionsList } from '../../../utils/hooks/useCashFlowDescriptionsList';
import { unsubscribeCashFlowsList } from '../../../utils/hooks/useCashFlowsList';

const AppCoverController = ({
  children
}) => {
  useEffect(() => () => {
    unsubscribeAccountsList();
    unsubscribeCashFlowDescriptionsList();
    unsubscribeCashFlowsList();
  }, []);
  const [{ pageTitle }, , unlinkState] = useAppState();
  useEffect(() => unlinkState);

  const title = `Cash Flow${pageTitle ? ` - ${pageTitle}` : ''}`;
  return (
    <AppCoverView
      openMenu={toggleMenu}
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
