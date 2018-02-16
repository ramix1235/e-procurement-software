const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const tableName = 'categories';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
//   collection: tableName,
  versionKey: false
});

// module.exports = mongoose.model('categories', categorySchema, tableName);
module.exports = mongoose.model('categories', categorySchema);