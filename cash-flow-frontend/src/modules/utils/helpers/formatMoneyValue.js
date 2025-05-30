import formatNumber from './formatNumber';

const formatMoneyValue = value => formatNumber(value, 2, '.', ',');

export default formatMoneyValue;
