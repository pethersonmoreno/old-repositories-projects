import * as types from './types';

const flowsReducer = (state, action) => {
  if (action.type === types.GET_FLOWS) {
    return action.payload;
  }
  return state;
};

export default flowsReducer;
