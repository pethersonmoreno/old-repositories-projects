import { types } from '../constants';

const prepareData = data => ({
  ...data,
  currentValue: data.currentValue instanceof String
    ? parseFloat(data.currentValue, 10) : data.currentValue,
});
const reducerAccounts = (state = [], action) => {
  if (action.type === types.GET_ACCOUNTS) {
    return action.payload;
  }
  if (action.type === types.UPDATE_ACCOUNT) {
    return state.map(account => {
      if (account.id === action.payload.id) {
        return { ...account, ...prepareData(action.payload) };
      }
      return account;
    });
  }
  if (action.type === types.ADD_ACCOUNT) {
    if (!state.find(account => account.id !== action.payload.id)) {
      return [...state, prepareData(action.payload)];
    }
    return state;
  }
  if (action.type === types.REMOVE_ACCOUNT) {
    return state.filter(account => account.id !== action.payload.id);
  }
  return state;
};

export default reducerAccounts;
