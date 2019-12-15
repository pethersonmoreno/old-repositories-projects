export const getLocalStorageItem = name =>
  JSON.parse(localStorage.getItem(name));
export const setLocalStorageItem = (name, value) =>
  localStorage.setItem(name, JSON.stringify(value));
export const getLocalStoragePartialItem = (name, properties) => {
  const full = getLocalStorageItem(name);
  return properties.reduce((acc, propName) => {
    if (full && full[propName] !== undefined) {
      acc[propName] = full[propName];
    }
    return acc;
  }, {});
};
export const setLocalStoragePartialItem = (name, value, properties) => {
  const fullToChange = getLocalStorageItem(name) || {};
  properties.forEach(propName => {
    fullToChange[propName] = value[propName];
  });
  setLocalStorageItem(name, fullToChange);
};

export default {
  getItem: getLocalStorageItem,
  setItem: setLocalStorageItem,
  getPartialItem: getLocalStoragePartialItem,
  setPartialItem: setLocalStoragePartialItem,
};
