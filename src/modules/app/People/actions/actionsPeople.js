import { types } from '../constants';

export const getPeople = people => ({
  type: types.GET_PEOPLE,
  payload: people
});

export const updatePerson = person => ({
  type: types.UPDATE_PERSON,
  payload: person
});

export const addPerson = person => ({
  type: types.ADD_PERSON,
  payload: person
});

export const removePerson = id => ({
  type: types.REMOVE_PERSON,
  payload: { id }
});
