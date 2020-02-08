import { types } from '../constants';

export const getDescriptions = cashFlowDescriptions => ({
  type: types.GET_CASH_FLOW_DESCRIPTIONS,
  payload: cashFlowDescriptions
});
