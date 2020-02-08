import { useSelector } from 'react-redux';

export const useCashFlowDescriptionsList = () => useSelector(state => state.cashFlowDescriptions);
export const useCashFlowDescriptions = cashFlowDescriptionId =>
  useSelector(state =>
    state.cashFlowDescriptions.find(cashFlowDescription =>
      cashFlowDescription.id === cashFlowDescriptionId));
