import { types } from '../constants';

const reducerPeople = (state = [], action) => {
  if (action.type === types.GET_PEOPLE) {
    return action.payload;
  }
  if (action.type === types.UPDATE_PERSON) {
    return state.map(person => {
      if (person.id === action.payload.id) {
        return { ...person, ...action.payload };
      }
      return person;
    });
  }
  if (action.type === types.ADD_PERSON) {
    return [...state, action.payload];
  }
  return state;
};

export default reducerPeople;
