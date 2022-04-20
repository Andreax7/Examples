const mongoose = require('mongoose');

var producerSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        unique: true,
    },
    country: String,
    logo: String,
    description: String,
    email: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ]
  });
  
var producer = mongoose.model('producer', producerSchema);
module.exports = producer;