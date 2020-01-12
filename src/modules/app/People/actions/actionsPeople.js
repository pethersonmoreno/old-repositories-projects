import { types } from '../constants';

export const getPeople = people => ({
  type: types.GET_PEOPLE,
  payload: people
});
