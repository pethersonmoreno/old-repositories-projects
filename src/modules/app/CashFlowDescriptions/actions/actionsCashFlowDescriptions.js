import { types } from '../constants';

export const getDescriptions = cashFlowDescriptions => ({
  type: types.GET_CASH_FLOW_DESCRIPTIONS,
  payload: cashFlowDescriptions
});

export const updateDescription = description => ({
  type: types.UPDATE_DESCRIPTION,
  payload: description
});

export const addDescription = description => ({
  type: types.ADD_DESCRIPTION,
  payload: description
});

export const removeDescription = id => ({
  type: types.REMOVE_DESCRIPTION,
  payload: { id }
});
