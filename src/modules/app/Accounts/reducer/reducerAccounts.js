import { types } from '../constants';

const reducerAccounts = (state = [], action) => {
  if (action.type === types.GET_ACCOUNTS) {
    return action.payload;
  }
  if (action.type === types.UPDATE_ACCOUNT) {
    return state.map(account => {
      if (account.id === action.payload.id) {
        return { ...account, ...action.payload };
      }
      return account;
    });
  }
  if (action.type === types.ADD_ACCOUNT) {
    return [...state, action.payload];
  }
  if (action.type === types.REMOVE_ACCOUNT) {
    return state.filter(account => account.id !== action.payload.id);
  }
  return state;
};

export default reducerAccounts;
