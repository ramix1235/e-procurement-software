import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  vendorCode: {
    type: String,
    required: true,
    // unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  currency: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Currency',
  },
  suppliers: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Supplier',
    },
  ],
}, {
  versionKey: false,
});

const Product = mongoose.model(
  'Product',
  productSchema,
  'products'
);

export default Product;
