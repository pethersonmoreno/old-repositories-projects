var ShoppingCart = require('../src/ShoppingCart.js')

describe('should run the app', function() {

  it('gets the price right with DIS_10', function() {
    var item = {name: "foo", price: "10", productCode: "DIS_10"}
    var shoppingCart = new ShoppingCart([item]);
    var results = shoppingCart.checkout();
    expect(results.totalPrice).toEqual(9);
  });

  it('gets the price right with DIS_15', function() {
    var item = {name: "foo", price: "10", productCode: "DIS_15"}
    var shoppingCart = new ShoppingCart([item]);
    var results = shoppingCart.checkout();
    expect(results.totalPrice).toEqual(8.5);
  });

  it('gets the price right with DIS_20', function() {
    var item = {name: "foo", price: "10", productCode: "DIS_20"}
    var shoppingCart = new ShoppingCart([item]);
    var results = shoppingCart.checkout();
    expect(results.totalPrice).toEqual(8);
  });

  it('gets the price right with BULK_BUY_2_GET_1 - grouping 2 items with same name with this product code', function() {
    var itemsWithTotal = [
      {
        items: [
          {name: "chocobar", price: "10", productCode: "BULK_BUY_2_GET_1"},
          {name: "chocobar", price: "10", productCode: "BULK_BUY_2_GET_1"}
        ],
        totalPrice: 10,
      },
      {
        items: [
          {name: "chocobar", price: "10", productCode: "BULK_BUY_2_GET_1"},
          {name: "chocobar", price: "10", productCode: "BULK_BUY_2_GET_1"},
          {name: "chocobar", price: "10", productCode: "BULK_BUY_2_GET_1"}
        ],
        totalPrice: 20,
      },
      {
        items: [
          {name: "chocobar", price: "10", productCode: "BULK_BUY_2_GET_1"},
          {name: "chocobar", price: "10", productCode: "BULK_BUY_2_GET_1"},
          {name: "chocobar", price: "10", productCode: "BULK_BUY_2_GET_1"},
          {name: "chocobar", price: "10", productCode: "BULK_BUY_2_GET_1"}
        ],
        totalPrice: 20,
      },
      {
        items: [
          {name: "chocobar", price: "10", productCode: "BULK_BUY_2_GET_1"},
          {name: "milk", price: "15", productCode: "BULK_BUY_2_GET_1"}
        ],
        totalPrice: 25,
      },
    ];
    itemsWithTotal.forEach(obj => {
      var shoppingCart = new ShoppingCart(obj.items);
      var results = shoppingCart.checkout();
      expect(results.totalPrice).toEqual(obj.totalPrice);
    });
  });

  

  it('gets the loyalt points right with DIS_20 - each 20 one point', function() {
    var itemsWithLoyaltyPoints = [
      {
        items: [{name: "foo", price: "10", productCode: "DIS_20"}],
        loyaltyPoints: 0,
      },
      {
        items: [{name: "foo", price: "20", productCode: "DIS_20"}],
        loyaltyPoints: 1,
      },
      {
        items: [{name: "foo", price: "30", productCode: "DIS_20"}],
        loyaltyPoints: 1,
      },
      {
        items: [{name: "foo", price: "40", productCode: "DIS_20"}],
        loyaltyPoints: 2,
      },
      {
        items: [{name: "foo2", price: "20", productCode: "DIS_20"}, {name: "foo2", price: "20", productCode: "DIS_20"}],
        loyaltyPoints: 2,
      },
    ];
    itemsWithLoyaltyPoints.forEach(obj => {
      var shoppingCart = new ShoppingCart(obj.items);
      var results = shoppingCart.checkout();
      expect(results.loyaltyPoints).toEqual(obj.loyaltyPoints);
    });
  });

});
