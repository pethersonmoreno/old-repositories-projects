const formatNumber = (number, numberOfDecimals, thousandSeparator, decimalSeparator) => {
  const regex = `\\d(?=(\\d{3})+${numberOfDecimals > 0 ? '\\D' : '$'})`;
  const num = number.toFixed(Math.max(0, numberOfDecimals));

  return (decimalSeparator ? num.replace('.', decimalSeparator) : num).replace(new RegExp(regex, 'g'), `$&${thousandSeparator}`);
};

export default formatNumber;
