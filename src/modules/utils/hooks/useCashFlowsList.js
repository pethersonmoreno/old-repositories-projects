import { useCashFlowsList } from '../../app/CashFlows/selectors/selectorsCashFlows';

export default () => {
  const list = useCashFlowsList();
  return [list];
};
