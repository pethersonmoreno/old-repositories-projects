"use strict";
var ShoppingCart = require('./ShoppingCart.js');

var items = [
  {'name': "Candy Bar", 'productCode': 'DIS_10_Candy', 'price': 10.00},
  {'name': "Apple Pie", 'productCode': 'DIS_15', 'price': 20.00}
];

var shoppingCart = new ShoppingCart(items);

console.log(shoppingCart.checkout(items));
