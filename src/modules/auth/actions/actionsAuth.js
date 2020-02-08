import { types } from '../constants';

export const updateUserProfile = payload => ({
  type: types.UPDATE_USER_PROFILE,
  payload
});

export const startAuthLoading = () => ({
  type: types.START_AUTH_LOADING
});
