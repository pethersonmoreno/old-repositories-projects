import { useCashFlowDescriptionsList } from '../../app/CashFlowDescriptions/selectors/selectorsCashFlowDescriptions';

export default () => {
  const list = useCashFlowDescriptionsList();
  return [list];
};
