import mongoose, { Schema } from 'mongoose';

const currencySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  versionKey: false,
});

const Currency = mongoose.model(
  'Currency',
  currencySchema,
  'currencies'
);

export default Currency;
