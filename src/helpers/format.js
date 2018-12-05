export const currency = moneyValue => moneyValue.toLocaleString('pt-br', {
  style: 'currency',
  currency: 'BRL',
});
