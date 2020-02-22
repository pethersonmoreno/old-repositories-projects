import { types } from '../constants';

export const getAccounts = accounts => ({
  type: types.GET_ACCOUNTS,
  payload: accounts
});

export const updateAccount = account => ({
  type: types.UPDATE_ACCOUNT,
  payload: account
});

export const addAccount = account => ({
  type: types.ADD_ACCOUNT,
  payload: account
});

export const removeAccount = id => ({
  type: types.REMOVE_ACCOUNT,
  payload: { id }
});
