import { category as categoryApi } from "../api";
import createBasicDuckRegistry from "./createBasicDuckRegistry";

const duckCategories = createBasicDuckRegistry("category", categoryApi);
const operations = duckCategories.operations;
export { operations };

export default duckCategories.reducer;
