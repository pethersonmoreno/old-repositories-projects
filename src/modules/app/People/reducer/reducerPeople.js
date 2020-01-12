import { types } from '../constants';

const reducerPeople = (state = [], action) => {
  if (action.type === types.GET_PEOPLE) {
    return action.payload;
  }
  return state;
};

export default reducerPeople;
