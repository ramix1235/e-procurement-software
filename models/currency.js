const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('currencies', currencySchema);