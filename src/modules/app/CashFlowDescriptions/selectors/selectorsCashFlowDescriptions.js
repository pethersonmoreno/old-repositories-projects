import { useSelector } from 'react-redux';

export const useCashFlowDescriptionsList = () => useSelector(state => state.cashFlowDescriptions);
export const useCashFlowDescription = id =>
  useSelector(state => state.cashFlowDescriptions.find(item => item.id === id));
