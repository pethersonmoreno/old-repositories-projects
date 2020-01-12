import * as types from './types';

const accountsReducer = (state, action) => {
  if (action.type === types.GET_ACCOUNTS) {
    return action.payload;
  }
  return state;
};

export default accountsReducer;
