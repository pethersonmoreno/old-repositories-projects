import createTypes from "./createTypes";
import createActions from "./createActions";
import createReducer from "./createReducer";
import createOperations from "./createOperations";
import createSelectors from "./createSelectors";
const createBasicDuckRegistry = (duckName, name, registryApi) => {
  const types = createTypes(name);
  const actions = createActions(types, name);
  const reducer = createReducer(types, name);
  const selectors = createSelectors(duckName);
  const operations = createOperations(name, selectors, actions, registryApi);
  return { operations, selectors, types, reducer };
};
export default createBasicDuckRegistry;
