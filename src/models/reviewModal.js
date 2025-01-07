import mongoose from 'mongoose';

// here we save the image, name and user id  of user from token and otehr riview fields like rating, comment etc
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const reviewModel = mongoose.model('Review', reviewSchema);
export default reviewModel;
