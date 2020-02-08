import { useSelector } from 'react-redux';

export const useCashFlowsList = () => useSelector(state => state.cashFlows);
export const useCashFlow = id => useSelector(state => state.cashFlows.find(item => item.id === id));
