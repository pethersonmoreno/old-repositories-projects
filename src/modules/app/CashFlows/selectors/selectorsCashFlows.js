import { useSelector } from 'react-redux';

export const useCashFlowsCurrentMonth = () => useSelector(state => state.cashFlows.currentMonth);
export const useCashFlow = id => useSelector(state =>
  state.cashFlows.list.find(item => item.id === id));
export const useCashFlowListMonth = () =>
  useSelector(state => state.cashFlows.list);
