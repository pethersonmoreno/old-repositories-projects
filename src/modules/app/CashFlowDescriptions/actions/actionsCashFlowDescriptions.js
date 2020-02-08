import { types } from '../constants';

export const getCashFlowDescriptions = cashFlowDescriptions => ({
  type: types.GET_CASH_FLOW_DESCRIPTIONS,
  payload: cashFlowDescriptions
});
