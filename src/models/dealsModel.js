import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter the title of the deal'],
  },
  description: {
    type: String,
    required: [true, 'Please enter the description of the deal'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter the price of the deal'],
  },
  discount: {
    type: Number,
  },
  image: {
    type: String,
    required: [true, 'Please enter the image of the deal'],
  },
  category: {
    type: String,
  },
  countInStock: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  numReviews: {
    type: Number,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

const dealModel = mongoose.model('Deal', dealSchema);
export default dealModel;
