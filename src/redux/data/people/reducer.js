import * as types from './types';

const peopleReducer = (state, action) => {
  if (action.type === types.GET_PEOPLE) {
    return action.payload;
  }
  return state;
};

export default peopleReducer;
