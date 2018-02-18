const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  products: [ {
    type: Schema.Types.ObjectId,
    ref: 'products'
  } ]
}, {
  versionKey: false
});

module.exports = mongoose.model('suppliers', supplierSchema);