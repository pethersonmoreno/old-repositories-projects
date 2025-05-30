import { category as categoryApi } from "../api";
import createBasicDuckRegistry from "./createBasicDuckRegistry";

const duckCategories = createBasicDuckRegistry(
  "categories",
  "category",
  categoryApi
);
const operations = duckCategories.operations;
const selectors = duckCategories.selectors;
export { operations, selectors };

export default duckCategories.reducer;
