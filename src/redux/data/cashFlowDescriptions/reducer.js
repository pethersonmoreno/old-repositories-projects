import * as types from './types';

const flowDescriptionsReducer = (state, action) => {
  if (action.type === types.GET_FLOW_DESCRIPTIONS) {
    return action.payload;
  }
  return state;
};

export default flowDescriptionsReducer;
