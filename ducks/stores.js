import { store as storeApi } from "../api";
import createBasicDuckRegistry from "./createBasicDuckRegistry";

const duckStores = createBasicDuckRegistry("store", storeApi);
const operations = duckStores.operations;
export { operations };

export default duckStores.reducer;
