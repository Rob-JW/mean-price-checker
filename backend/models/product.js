const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  url: String,
  price: Number,
  seller: String,
  lastMonthSales: Number,
  hasAmazonBuyBox: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);
