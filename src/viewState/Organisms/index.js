import MenuResponsive, {
  constants as constantsMenuResponsive,
  reducer as reducerMenuResponsive,
} from './MenuResponsive';
import CategoryForm from './CategoryForm';
import ProductForm from './ProductForm';
import ProductTypeForm from './ProductTypeForm';
import ShipListCategoriesBox from './ShipListCategoriesBox';
import ShipListForm from './ShipListForm';
import ShipListItemForm from './ShipListItemForm';

export const components = {
  MenuResponsive,
  CategoryForm,
  ProductForm,
  ProductTypeForm,
  ShipListCategoriesBox,
  ShipListForm,
  ShipListItemForm,
};
export const reducers = { [constantsMenuResponsive.STATE_NAME]: reducerMenuResponsive };
