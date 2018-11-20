import { category as categoryApi } from "../../api";
import actions from "./actions";

const add = newCategory =>
  actions.add(
    categoryApi.add(categoryApi.newId(), newCategory).then(() => {
      throw new Error("Erro de teste");
    })
  );
const remove = id =>
  actions.remove(categoryApi.remove(id).then(id => ({ id })));

const edit = (id, updates) => actions.edit(categoryApi.edit(id, updates));
const getAll = () => {
  actions.getAll(categoryApi.getAll());
};
let listenChangesCallback = null;
const startListenChanges = () => dispatch => {
  if (!listenChangesCallback) {
    listenChangesCallback = categories => {
      dispatch(actions.getAll(categories));
    };
    categoryApi.startListenChanges(listenChangesCallback);
  }
};
const stopListenChanges = () => () => {
  if (listenChangesCallback) {
    categoryApi.stopListenChanges(listenChangesCallback);
    listenChangesCallback = null;
  }
};
export default {
  add,
  remove,
  edit,
  getAll,
  startListenChanges,
  stopListenChanges
};
