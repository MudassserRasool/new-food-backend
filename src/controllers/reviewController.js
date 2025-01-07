import { dummyPersonImage } from '../constants/index.js';
import profileModel from '../models/profileModel.js';
import reviewModel from '../models/reviewModal.js';
import successResponse from '../utils/successResponse.js';

class ReviewController {
  async createReview(req, res, next) {
    try {
      const userId = req.user._id.toString();
      const userProfile = await profileModel.findOne({
        userId,
      });
      const review = new reviewModel({
        name: `${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`,
        image: userProfile?.image || dummyPersonImage,
        rating: req.body.rating,
        comment: req.body.comment,
        userId,
      });
      await review.save();
      successResponse(res, 'Review created successfully', review);
    } catch (error) {
      next(error);
    }
  }

  // get all reviews
  async getReviews(req, res, next) {
    try {
      const reviews = await reviewModel.find({});
      const reviewsWithUpdatedUserDetails = await Promise.all(
        reviews.map(async (review) => {
          const userProfile = await profileModel.findOne({ user: review.user });
          return {
            ...review.toObject(),
            name: `${userProfile?.firstName || ''} ${
              userProfile?.lastName || ''
            }`,
            image: userProfile?.image || dummyPersonImage,
          };
        })
      );
      successResponse(
        res,
        'Reviews fetched successfully',
        reviewsWithUpdatedUserDetails
      );
    } catch (error) {
      next(error);
    }
  }
}

const reviewController = new ReviewController();
export default reviewController;
