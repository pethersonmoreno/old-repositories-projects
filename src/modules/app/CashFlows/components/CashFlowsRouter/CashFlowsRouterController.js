import React from 'react';
import PropTypes from 'prop-types';
import SwitchRouterRoutes from '../../../../utils/components/SwitchRouterRoutes';
import NotFound from '../../../../utils/components/NotFound';
import useSetPageTitle from '../../../../appCover/hooks/useSetPageTitle';
import CashFlowsListPage from '../CashFlowsListPage';
import CashFlowsReport from '../CashFlowsReport';
import CashFlowIncomeForm from '../CashFlowIncomeForm';
import CashFlowExpenseForm from '../CashFlowExpenseForm';
import CashFlowFormEdit from '../CashFlowFormEdit';
import useSubscribePeopleFirestore from '../../../../utils/hooks/useSubscribePeopleFirestore';
import useSubscribeCashFlowDescriptionsFirestore from '../../../../utils/hooks/useSubscribeCashFlowDescriptionsFirestore';
import useSubscribeAccountsFirestore from '../../../../utils/hooks/useSubscribeAccountsFirestore';

const CashFlowsRouterController = ({ match }) => {
  useSetPageTitle('Cash Flows');
  useSubscribePeopleFirestore();
  useSubscribeAccountsFirestore();
  useSubscribeCashFlowDescriptionsFirestore();
  const routes = [
    { path: match.path, exact: true, component: CashFlowsListPage },
    { path: `${match.path}/report`, exact: true, component: CashFlowsReport },
    { path: `${match.path}/edit/:id`, exact: true, component: CashFlowFormEdit },
    { path: `${match.path}/newIncome`, exact: true, component: CashFlowIncomeForm },
    { path: `${match.path}/newExpense`, exact: true, component: CashFlowExpenseForm },
    { component: NotFound }
  ];
  return (
    <SwitchRouterRoutes routes={routes} />
  );
};

CashFlowsRouterController.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
};

export default CashFlowsRouterController;
