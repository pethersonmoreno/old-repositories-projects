import { productInStore as productInStoreApi } from "../api";
import createBasicDuckRegistry from "./createBasicDuckRegistry";

const duckProductInStores = createBasicDuckRegistry(
  "productInStore",
  productInStoreApi
);
const operations = duckProductInStores.operations;
export { operations };

export default duckProductInStores.reducer;
