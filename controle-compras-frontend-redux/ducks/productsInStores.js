import { productInStore as productInStoreApi } from "../api";
import createBasicDuckRegistry from "./createBasicDuckRegistry";

const duckProductInStores = createBasicDuckRegistry(
  "productsInStores",
  "productInStore",
  productInStoreApi
);
const operations = duckProductInStores.operations;
const selectors = duckProductInStores.selectors;
export { operations, selectors };

export default duckProductInStores.reducer;
