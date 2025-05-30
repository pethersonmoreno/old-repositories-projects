import { createSelector } from "reselect";

const createSelectors = duckName => {
  const getAll = state => state[duckName];
  const get = (state, id) => getAll(state).find(registry => registry.id === id);
  const getAllUndeleted = createSelector(
    getAll,
    registries => registries.filter(registry => !registry.deleted)
  );

  return {
    getAll,
    get,
    getAllUndeleted
  };
};
export default createSelectors;
