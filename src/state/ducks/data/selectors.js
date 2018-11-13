export function filterByProductTypeId(items, productTypeId) {
  return items.filter(size => size.productTypeId === productTypeId);
}
