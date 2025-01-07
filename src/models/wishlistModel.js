import mongoose from 'mongoose';

// add which list product or deals then wehn user get the whishlist we can show the product or deals
const wishlistSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: ['product', 'deal'],
      default: 'product',
    },
  },
  { timestamps: true }
);

const wishlistModel = mongoose.model('Wishlist', wishlistSchema);
export default wishlistModel;
