export const categories = [
  { id: 1, description: 'Bebidas' },
  { id: 2, description: 'Açougue' },
  { id: 3, description: 'Office' },
  { id: 4, description: 'Hortifruti' },
  { id: 5, description: 'Higiene' },
];
export const productTypes = [{ id: 1, description: 'Refrigerante de Cola', categoryId: 1 }];
export const sizes = [
  { id: 1, productTypeId: 1, description: 'Lata 350ml' },
  { id: 2, productTypeId: 1, description: 'Garrafa 1,5L' },
  { id: 3, productTypeId: 1, description: 'Garrafa 2L' },
];
export const brands = [
  { id: 1, productTypeId: 1, description: 'Coca-Cola' },
  { id: 2, productTypeId: 1, description: 'Pepsi' },
  { id: 3, productTypeId: 1, description: 'Fanta' },
];
export const products = [
  {
    id: 1,
    productTypeId: 1,
    brandId: 1,
    sizeId: 1,
    ean: '',
  },
];
export const shipLists = [
  {
    id: 1,
    description: 'Mercado',
  },
  {
    id: 2,
    description: 'Praia',
  },
];
export const shipListItems = [
  {
    id: 1,
    shipListId: 1,
    qtd: 1,
    selecaoDireta: true,
    productId: 1,
  },
  {
    id: 2,
    shipListId: 1,
    qtd: 10,
    selecaoDireta: false,
    productTypeId: 1,
    sizeId: 1,
  },
];
