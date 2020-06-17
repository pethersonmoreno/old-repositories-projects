import React from 'react';
import PropTypes from 'prop-types';
import SwitchRouterRoutes from '../../../../utils/components/SwitchRouterRoutes';
import NotFound from '../../../../utils/components/NotFound';
import CashFlowDescriptionsList from '../CashFlowDescriptionsList';
import CashFlowDescriptionForm from '../CashFlowDescriptionForm';
import useSubscribeCashFlowDescriptionsFirestore from '../../hooks/useSubscribeCashFlowDescriptionsFirestore';
import AppContentWithMenuButton from '../../../../common/AppContentWithMenuButton';

const CashFlowDescriptionsRouterController = ({ match, ...otherProps }) => {
  useSubscribeCashFlowDescriptionsFirestore();
  const routes = [
    { path: match.path, exact: true, component: CashFlowDescriptionsList },
    { path: `${match.path}/edit/:id`, exact: true, component: CashFlowDescriptionForm },
    { path: `${match.path}/new`, exact: true, component: CashFlowDescriptionForm },
    { component: NotFound }
  ];
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AppContentWithMenuButton {...otherProps} title="Cash Flow Descriptions">
      <SwitchRouterRoutes routes={routes} />
    </AppContentWithMenuButton>
  );
};

CashFlowDescriptionsRouterController.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
};

export default CashFlowDescriptionsRouterController;
