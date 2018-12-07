const createOperations = (actions, registryApi) => {
  const add = (uid, newRegistry) => {
    return actions.add(
      registryApi.add(uid, registryApi.newId(uid), newRegistry)
    );
  };
  const remove = (uid, id) => actions.remove(registryApi.remove(uid, id));
  const edit = (uid, id, updates) =>
    actions.edit(registryApi.edit(uid, id, updates));
  const getAll = uid => actions.getAll(registryApi.getAll(uid));
  let listenChangesCallback = null;
  const startListenChanges = uid => dispatch => {
    if (!listenChangesCallback) {
      listenChangesCallback = registries => {
        dispatch(actions.getAllFulfilled(registries));
      };
      return registryApi.getAll(uid).then(registries => {
        listenChangesCallback(registries);
        registryApi.startListenChanges(uid, listenChangesCallback);
        return registries;
      });
    }
    return Promise.reject("Listen alread started");
  };
  const stopListenChanges = uid => () => {
    if (listenChangesCallback) {
      registryApi.stopListenChanges(uid, listenChangesCallback);
      listenChangesCallback = null;
    }
  };
  return {
    add,
    remove,
    edit,
    getAll,
    startListenChanges,
    stopListenChanges
  };
};
export default createOperations;
