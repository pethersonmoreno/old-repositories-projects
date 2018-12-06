import { mapObjectToList } from "./utils";
import { getDatabaseUser } from "./user";

const createBasicRegistry = path => {
  const getDatabaseAll = uid => getDatabaseUser(uid).child(path);
  const getDatabaseRegistry = (uid, id) => getDatabaseAll(uid).child(id);

  const newId = uid => getDatabaseAll(uid).push().key;
  const add = (uid, id, registry) =>
    getDatabaseRegistry(uid, id)
      .set(registry)
      .then(() => ({ ...registry, id }));
  const edit = (uid, id, { id: idField, ...otherFields }) =>
    getDatabaseRegistry(uid, id)
      .update(otherFields)
      .then(() => ({ updates: otherFields, id }));
  const remove = (uid, id) =>
    getDatabaseRegistry(uid, id)
      .remove()
      .then(() => ({ id }));
  const getAll = uid =>
    getDatabaseAll(uid)
      .once("value")
      .then(snapshot => mapObjectToList(snapshot.val(), "id"));
  let dicListenChanges = {};
  const startListenChanges = (uid, listenCallBack) => {
    if (!dicListenChanges[listenCallBack]) {
      const listenChanges = snapshot => {
        if (listenCallBack) {
          listenCallBack(mapObjectToList(snapshot.val(), "id"));
        }
      };
      dicListenChanges[listenCallBack] = listenChanges;
      getDatabaseAll(uid).on("value", listenChanges);
    }
  };
  const stopListenChanges = (uid, listenCallBack) => {
    if (dicListenChanges[listenCallBack]) {
      const listenChanges = dicListenChanges[listenCallBack];
      getDatabaseAll(uid).off("value", listenChanges);
    }
  };
  return {
    newId,
    add,
    edit,
    remove,
    getAll,
    startListenChanges,
    stopListenChanges
  };
};
export default createBasicRegistry;
