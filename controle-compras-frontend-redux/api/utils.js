export const mapObjectToList = (object, keyName) => {
  return object
    ? Object.keys(object).map(key => {
        if (object[key]) {
          return { ...object[key], [keyName]: key };
        }
        return { [keyName]: key, deleted: true };
      })
    : [];
};
