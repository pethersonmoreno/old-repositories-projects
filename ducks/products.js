import { product as productApi } from "../api";
import createBasicDuckRegistry from "./createBasicDuckRegistry";

const duckProducts = createBasicDuckRegistry("product", productApi);
const operations = duckProducts.operations;
export { operations };

export default duckProducts.reducer;
