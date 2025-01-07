import mongoose from 'mongoose';
import wishlistModel from '../models/wishlistModel.js';
import { capitalizeFirstLetter } from '../utils/helper.js';
import successResponse from '../utils/successResponse.js';

class WishlistController {
  // add product or deal to wishlist
  async addWishlist(req, res, next) {
    const userId = req.user._id.toString();
    const { product, type = 'product' } = req.body;
    try {
      const wishlist = await wishlistModel.create({ userId, product, type });
      successResponse(
        res,
        `${capitalizeFirstLetter(type)} is added to wishlist`,
        wishlist
      );
    } catch (error) {
      next(error);
    }
  }

  // now get those products and deals which are in wishlist
  async getWishlist(req, res, next) {
    const userId = req.user._id.toString();
    try {
      // Fetch products in wishlist
      const productsWishlist = await wishlistModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            type: 'product',
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'product',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        {
          $unwind: {
            path: '$productDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);

      // Fetch deals in wishlist
      const dealsWishlist = await wishlistModel.aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(userId), type: 'deal' },
        },
        {
          $lookup: {
            from: 'deals',
            localField: 'product',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        {
          $unwind: {
            path: '$productDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'products', // Reference the 'products' collection
            localField: 'productDetails.products',
            foreignField: '_id',
            as: 'productDetails.products', // Add details of products in deals
          },
        },
      ]);

      // Combine both results
      const wishlist = [...productsWishlist, ...dealsWishlist];

      successResponse(res, 'Wishlist', wishlist);
    } catch (error) {
      next(error);
    }
  }

  // remove product or deal from wishlist
  async removeWishlist(req, res, next) {
    const userId = req.user._id.toString();
    const { productId } = req.query;
    try {
      const wishlist = await wishlistModel.deleteOne({ userId, productId });
      successResponse(res, 'Product is removed from wishlist', wishlist);
    } catch (error) {
      next(error);
    }
  }
}

const wishlistController = new WishlistController();

export default wishlistController;
