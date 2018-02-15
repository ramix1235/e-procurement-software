const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
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
  }
});


module.exports = mongoose.model('products', productSchema);