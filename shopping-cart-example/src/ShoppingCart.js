"use strict";
module.exports = function(items) {

  function checkout() {
    var totalPrice = 0;
    var loyaltyPoints = 0;
    var itemsBulkBuy2Get1 = getItemsToBulkBuyNGetOne(items, 'BULK_BUY_2_GET_1', 2)
    
    items.forEach(function(item) {
      var discount = 0;
      if(item.productCode === "DIS_10"){
        discount = item.price * 0.1;
        loyaltyPoints += (item.price / 10);
      } else if(item.productCode === "DIS_15"){
        discount = item.price * 0.15;
        loyaltyPoints += (item.price / 15);
      } else if(item.productCode === "DIS_20"){
        discount = item.price * 0.20;
        loyaltyPoints += (item.price - (item.price % 20))/20;
      } else if(item.productCode === "BULK_BUY_2_GET_1"){
        if(itemsBulkBuy2Get1.find(i => i === item)) {
          discount = item.price * 0.50;
        }
      } else {
        loyaltyPoints += (item.price / 5);
      }
      totalPrice += item.price - discount;
    });
    return { totalPrice: totalPrice, loyaltyPoints: loyaltyPoints };
  }
  function getItemsToBulkBuyNGetOne(items, productCode, qtd) {
    var itemsWithCode = items.filter(item => item.productCode === productCode);
    var itemsGrouped = itemsWithCode.reduce((prev, item) => {
      const oldGroup = prev.find(group => group.find(i => i.name === item.name));
      if(oldGroup){
        return prev.map(group => {
          if(oldGroup === group){
            return [...group, item];
          }
        })
      }
      return [ ...prev, [item]];
    }, []);
    var groupResults = itemsGrouped.map(items => 
      items.reduce((prev, item) => {
        var newAcc = [...prev.acc, item];
        if(newAcc.length === qtd){
          return {
            result: [...prev.result, ...newAcc],
            acc: [],
          }
        }
        return {
          result: prev.result,
          acc: newAcc,
        }
      }, {result: [], acc: []})
    )
    return groupResults.reduce((acc, current) => [...acc, ...current.result], []);
  }

  return {
    checkout: checkout
  }
}
