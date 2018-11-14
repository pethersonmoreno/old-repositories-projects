export const mapObjectToList = (object, keyName) => {
  return object
    ? Object.keys(object).map(key => ({ ...object[key], [keyName]: key }))
    : [];
};
