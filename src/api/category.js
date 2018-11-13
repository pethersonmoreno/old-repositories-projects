import * as data from './data';

export const add = category => new Promise((resolve) => {
  const id = data.categories.length + 1;
  const newCategory = { id, ...category };
  data.categories.push(newCategory);
  resolve(newCategory);
});
export const remove = id => new Promise((resolve) => {
  const category = data.categories.find(cat => cat.id === id);
  if (category !== undefined) {
    data.categories.splice(data.categories.indexOf(category), 1);
  }
  resolve(id);
});
export const edit = (id, updates) => new Promise((resolve) => {
  const category = data.categories.find(cat => cat.id === id);
  if (category !== undefined) {
    data.categories.splice(data.categories.indexOf(category), 1, { ...category, updates });
  }
  resolve({ id, updates });
});
export const getAll = () => new Promise((resolve) => {
  resolve(data.categories.map(c => c));
});
