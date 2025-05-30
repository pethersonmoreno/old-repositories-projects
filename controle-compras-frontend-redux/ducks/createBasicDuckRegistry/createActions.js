import { FULFILLED } from "redux-promise-middleware";

const createActions = (types, name) => {
  const nameUpperCase = name.toUpperCase();
  const add = payload => ({
    type: types[`ADD_${nameUpperCase}`],
    payload
  });
  const remove = (meta, payload) => ({
    type: types[`REMOVE_${nameUpperCase}`],
    meta,
    payload
  });
  const removeComplete = (meta, payload) => ({
    type: types[`REMOVE_COMPLETE_${nameUpperCase}`],
    meta,
    payload
  });
  const edit = payload => ({
    type: types[`EDIT_${nameUpperCase}`],
    payload
  });
  const getAll = payload => ({
    type: types[`GET_${nameUpperCase}S`],
    payload
  });
  const getAllFulfilled = payload => ({
    type: types[`GET_${nameUpperCase}S`] + "_" + FULFILLED,
    payload
  });
  return {
    add,
    remove,
    removeComplete,
    edit,
    getAll,
    getAllFulfilled
  };
};
export default createActions;
