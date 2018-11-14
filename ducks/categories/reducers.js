import types from './types';

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_CATEGORY:
      return [...state, action.category];
    case types.REMOVE_CATEGORY:
      return state.filter(({ id }) => id !== action.id);
    case types.EDIT_CATEGORY:
      return state.map((category) => {
        if (category.id === action.id) {
          return {
            ...category,
            ...action.updates,
          };
        }
        return category;
      });
    case types.GET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};
