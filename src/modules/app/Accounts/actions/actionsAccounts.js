import { types } from '../constants';

export const getAccounts = accounts => ({
  type: types.GET_ACCOUNTS,
  payload: accounts
});
