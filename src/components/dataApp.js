export let categories = [
  {id: 1, description: 'Bebidas'},
  {id: 2, description: 'Açougue'},
  {id: 3, description: 'Office'},
  {id: 4, description: 'Hortifruti'},
  {id: 5, description: 'Higiene'},
];
export let productTypes = [
  {id: 1, description: 'Refrigerante de Cola', categoryId: 1},
];
export let sizes = [
  {id: 1, productTypeId: 1, description: 'Lata 350ml'},
  {id: 2, productTypeId: 1, description: 'Garrafa 1,5L'},
  {id: 3, productTypeId: 1, description: 'Garrafa 2L'},
];
export let brands = [
  {id: 1, productTypeId: 1, description: 'Coca-Cola'},
  {id: 2, productTypeId: 1, description: 'Pepsi'},
  {id: 3, productTypeId: 1, description: 'Fanta'},
];
export let products = [
  {
    id: 1,
    productTypeId: 1, 
    brandId: 1,
    sizeId: 1, 
    ean: '',
  }
];
export const SELECAO_DIRETA = 'direta';
export const SELECAO_POR_TIPO_TAMANHO = 'porTipoTamanho';
export let shipLists = [
  {
    id: 1,
    description: 'Mercado',
  },
  {
    id: 2,
    description: 'Praia',
  }
];
export let shipListItems = [
  {
    id: 1,
    shipListId: 1,
    qtd:1,
    selecao: SELECAO_DIRETA,
    productId: 1,
  },
  {
    id: 2,
    shipListId: 1,
    qtd:10,
    selecao: SELECAO_POR_TIPO_TAMANHO,
    productTypeId: 1,
    sizeId: 1,
  }
];