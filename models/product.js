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
      supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
      },
      price: {
        type: Number,
      },
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
