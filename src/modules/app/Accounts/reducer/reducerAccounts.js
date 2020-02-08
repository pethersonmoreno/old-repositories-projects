import { types } from '../constants';

const reducerAccounts = (state = [], action) => {
  if (action.type === types.GET_ACCOUNTS) {
    return action.payload;
  }
  return state;
};

export default reducerAccounts;
