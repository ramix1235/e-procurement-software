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
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      price: {
        type: Number,
      },
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
