import mongoose, { Schema } from 'mongoose';

const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
}, {
  versionKey: false,
});

const Supplier = mongoose.model(
  'Supplier',
  supplierSchema,
  'suppliers'
);

export default Supplier;
