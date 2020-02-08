import React from 'react';
import PropTypes from 'prop-types';
import SwitchRouterRoutes from '../../../../utils/components/SwitchRouterRoutes';
import NotFound from '../../../../utils/components/NotFound';
import CashFlowDescriptionsList from '../CashFlowDescriptionsList';
import CashFlowDescriptionForm from '../CashFlowDescriptionForm';
import useSetPageTitle from '../../../../appCover/hooks/useSetPageTitle';
import useSubscribeCashFlowDescriptionsFirestore from '../../hooks/useSubscribeCashFlowDescriptionsFirestore';

const CashFlowDescriptionsRouterController = ({ match }) => {
  useSetPageTitle('Cash Flow Descriptions');
  useSubscribeCashFlowDescriptionsFirestore();
  const routes = [
    { path: match.path, exact: true, component: CashFlowDescriptionsList },
    { path: `${match.path}/edit/:id`, exact: true, component: CashFlowDescriptionForm },
    { path: `${match.path}/new`, exact: true, component: CashFlowDescriptionForm },
    { component: NotFound }
  ];
  return (
    <SwitchRouterRoutes routes={routes} />
  );
};

CashFlowDescriptionsRouterController.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
};

export default CashFlowDescriptionsRouterController;
