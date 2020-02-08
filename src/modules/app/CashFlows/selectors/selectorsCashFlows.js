import { useSelector } from 'react-redux';
import moment from 'moment';

export const useCashFlowsList = () => useSelector(state => state.cashFlows);
export const useCashFlow = id => useSelector(state => state.cashFlows.find(item => item.id === id));
export const useCashFlowListMonth = month =>
  useSelector(state => state.cashFlows
    .filter(cashFlow =>
      moment(new Date(cashFlow.dateTime)).format('YYYY-MM') === month));
