import People from '../../app/People';
import CashFlowDescriptions from '../../app/CashFlowDescriptions';
import Accounts from '../../app/Accounts';
import CashFlows from '../../app/CashFlows';

const authenticatedRoutes = {
  '/people': People,
  '/cashFlowDescriptions': CashFlowDescriptions,
  '/accounts': Accounts,
  '/cashFlows': CashFlows
};

export default authenticatedRoutes;
