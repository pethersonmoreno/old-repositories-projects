import { useSelector } from 'react-redux';
import moment from 'moment';

export const useCashFlowsCurrentMonth = () => useSelector(state => state.cashFlows.currentMonth);
export const useCashFlow = id => useSelector(state =>
  state.cashFlows.list.find(item => item.id === id));
export const useCashFlowListMonth = month =>
  useSelector(state => state.cashFlows.list
    .filter(cashFlow =>
      moment(new Date(cashFlow.dateTime)).format('YYYY-MM') === month));
