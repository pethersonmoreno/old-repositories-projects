"use strict";
module.exports = function(items) {

  function checkout() {
    var totalPrice = 0;
    var loyaltyPoints = 0;
    items.forEach(function(item) {
      var discount = 0;
      if(item.productCode.startsWith("DIS_10")){
        discount = item.price * 0.1;
        loyaltyPoints += (item.price / 10);
      } else if(item.productCode.startsWith("DIS_15")){
        discount = item.price * 0.15;
        loyaltyPoints += (item.price / 15);
      } else {
        loyaltyPoints += (item.price / 5);
      }
      totalPrice += item.price - discount;
    });
    return { totalPrice: totalPrice, loyaltyPoints: loyaltyPoints };
  }

  return {
    checkout: checkout
  }
}
