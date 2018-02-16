const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  vendorCode: {
    type: String,
    required: true
    // unique: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'categories'
  },
  currency: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'currencies'
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('products', productSchema);