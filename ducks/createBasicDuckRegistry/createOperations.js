const createOperations = (name, selectors, actions, registryApi) => {
  const add = (uid, newRegistry) => {
    return actions.add(
      registryApi.add(uid, registryApi.newId(uid), newRegistry)
    );
  };
  const remove = (uid, id) => (dispatch, getState) =>
    dispatch(
      actions.remove(
        { id },
        registryApi.remove(uid, id).then(result => {
          setTimeout(() => {
            const registry = selectors.get(getState(), id);
            if (registry && !registry.deletedPendingComplete) {
              dispatch(
                actions.removeComplete(
                  { id },
                  registryApi.removeComplete(uid, id)
                )
              );
            }
          }, 10);
          return result;
        })
      )
    );
  const edit = (uid, id, updates) =>
    actions.edit(registryApi.edit(uid, id, updates));
  const mergeRegistries = (uid, registries) => (dispatch, getState) => {
    const state = getState();
    const currentRegistries = selectors.getAll(state);
    const registryIsDeletedOnLocal = registry =>
      currentRegistries.find(
        r => r.deleted && !r.deletedOnServer && r.id === registry.id
      );
    const registryIsDeletedOnServer = currentRegistry => {
      const found = registries.find(r => r.id === currentRegistry.id);
      return !found || found.deleted;
    };
    // if (name === "category") {
    //   console.log("currentRegistries: ", currentRegistries);
    //   console.log("registries: ", registries);
    // }
    currentRegistries
      .filter(
        currentRegistry =>
          currentRegistry.deleted &&
          !currentRegistry.deletedOnServer &&
          !registryIsDeletedOnServer(currentRegistry)
      )
      .forEach(registry => {
        setTimeout(() => {
          dispatch(remove(uid, registry.id));
        }, 10);
      });
    registries
      .filter(
        registry => registry.deleted && registryIsDeletedOnLocal(registry)
      )
      .forEach(registry => {
        setTimeout(() => {
          if (!registry.deletedPendingComplete) {
            dispatch(
              actions.removeComplete(
                { id: registry.id },
                registryApi.removeComplete(uid, registry.id)
              )
            );
          }
        }, 10);
      });
    return registries.map(registry => {
      if (registry.deleted) {
        if (!registryIsDeletedOnLocal(registry)) {
          return {
            ...registry,
            deletedOnServer: true
          };
        }
      }
      return registry;
    });
  };
  const getAll = uid => dispatch =>
    dispatch(
      actions.getAll(
        registryApi
          .getAll(uid)
          .then(registries => dispatch(mergeRegistries(uid, registries)))
      )
    );
  let listenChangesCallback = null;
  const startListenChanges = uid => dispatch => {
    if (!listenChangesCallback) {
      listenChangesCallback = registries => {
        dispatch(
          actions.getAllFulfilled(dispatch(mergeRegistries(uid, registries)))
        );
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
