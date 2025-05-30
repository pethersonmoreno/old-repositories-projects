import * as user from "./user";
import * as categories from "./categories";
import * as products from "./products";
import * as menu from "./menu";
import * as shipLists from "./shipLists";
import * as stores from "./stores";
import * as productsInStores from "./productsInStores";

const ducks = {
  user,
  categories,
  products,
  menu,
  shipLists,
  stores,
  productsInStores
};

const reducers = Object.keys(ducks).reduce((o, duckName) => {
  o[duckName] = ducks[duckName].default;
  return o;
}, {});

const allOperations = Object.keys(ducks)
  .filter(duckName => ducks[duckName].operations)
  .map(duckName => ducks[duckName].operations);
const operations = {
  startListenChanges: uid => innerDispatch =>
    Promise.all(
      allOperations
        .filter(operations => operations.startListenChanges)
        .map(operations => innerDispatch(operations.startListenChanges(uid)))
    ),
  stopListenChanges: uid => innerDispatch =>
    Promise.all(
      allOperations
        .filter(operations => operations.stopListenChanges)
        .map(operations => innerDispatch(operations.stopListenChanges(uid)))
    )
};

export { reducers, operations };
