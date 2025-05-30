const createTypes = name => {
  const nameUpperCase = name.toUpperCase();
  const nameLowerCase = name.toLowerCase();

  const add = `app/${nameLowerCase}s/ADD_${nameUpperCase}`;
  const remove = `app/${nameLowerCase}s/REMOVE_${nameUpperCase}`;
  const removeComplete = `app/${nameLowerCase}s/REMOVE_COMPLETE_${nameUpperCase}`;
  const edit = `app/${nameLowerCase}s/EDIT_${nameUpperCase}`;
  const get = `app/${nameLowerCase}s/GET_${nameUpperCase}S`;

  return {
    [`ADD_${nameUpperCase}`]: add,
    [`REMOVE_${nameUpperCase}`]: remove,
    [`REMOVE_COMPLETE_${nameUpperCase}`]: removeComplete,
    [`EDIT_${nameUpperCase}`]: edit,
    [`GET_${nameUpperCase}S`]: get
  };
};
export default createTypes;
