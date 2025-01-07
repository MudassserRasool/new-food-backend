import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
  },
  type: {
    type: String,
    default: 'product',
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
  },
  numReviews: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
  },
  timeToPrepare: {
    type: Number,
    required: true,
  },
});

const productModel = mongoose.model('Product', productSchema);
export default productModel;
