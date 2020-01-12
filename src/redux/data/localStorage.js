/* eslint-disable no-console */
const STORAGE_KEY_NAME = 'app-data';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY_NAME);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('Error on loading state from local storage');
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY_NAME, serializedState);
  } catch (err) {
    console.log('Error on saving state to local storage');
  }
};
