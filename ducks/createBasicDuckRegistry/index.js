import createTypes from "./createTypes";
import createActions from "./createActions";
import createReducer from "./createReducer";
import createOperations from "./createOperations";
const createBasicDuckRegistry = (name, registryApi) => {
  const types = createTypes(name);
  const actions = createActions(types, name);
  const reducer = createReducer(types, name);
  const operations = createOperations(actions, registryApi);
  return { operations, types, reducer };
};
export default createBasicDuckRegistry;
