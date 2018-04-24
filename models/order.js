import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
  },
  data: {
    products: [
      {
        name: String,
        price: Number,
        vendorCode: String,
      },
    ],
    supplier: {
      address: String,
      email: String,
      name: String,
      hone: String,
    },
  },
}, {
  versionKey: false,
});

const Order = mongoose.model(
  'Order',
  orderSchema,
  'orders'
);

export default Order;
