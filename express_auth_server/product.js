const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    naziv: String,
    price: Number,
    kind: String,
    weight: String,
    ingredients: String,
    pic: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'producer'
  }
    
  });
  
var product = mongoose.model('product', productSchema);
module.exports = product;
