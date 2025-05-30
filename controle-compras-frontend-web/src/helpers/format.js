export const currency = (moneyValue) => {
  if (moneyValue === undefined || moneyValue === null) {
    return 'R$ XX,XX';
  }
  return moneyValue.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};
