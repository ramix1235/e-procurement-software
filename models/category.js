import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  versionKey: false,
});

const Category = mongoose.model(
  'Category',
  categorySchema,
  'categories'
);

export default Category;
