import dealModel from '../models/dealsModel.js';
import productModel from '../models/productModel.js';
import ExceptionHandler from '../utils/error.js';
import successResponse from '../utils/successResponse.js';
class DealController {
  // create deals by combing products from product model
  async createDeal(req, res, next) {
    try {
      const {
        title,
        description,
        price,
        discount,
        image,
        category,
        countInStock,
        rating,
        numReviews,
        productIds,
      } = req.body;

      const products = await productModel.find({ _id: { $in: productIds } });
      if (products.length !== productIds.length) {
        ExceptionHandler.BadRequest('Invalid product ids');
      }
      const newDeal = await dealModel.create({
        title,
        description,
        price,
        discount,
        image,
        category,
        countInStock,
        rating,
        numReviews,
        products: productIds,
      });
      successResponse(res, 'Deal created successfully', newDeal);
    } catch (error) {
      next(error);
    }
  }

  // update deals by combing products from product model
  async updateDeal(req, res, next) {
    const { id } = req.params;
    try {
      const {
        title,
        description,
        price,
        discount,
        image,
        category,
        countInStock,
        rating,
        numReviews,
        productIds,
      } = req.body;

      const products = await productModel.find({ _id: { $in: productIds } });
      if (products.length !== productIds.length) {
        ExceptionHandler.BadRequest('Invalid product ids');
      }

      const deal = await dealModel.findByIdAndUpdate(
        id,
        {
          title,
          description,
          price,
          discount,
          image,
          category,
          countInStock,
          rating,
          numReviews,
          products: productIds,
        },
        { new: true }
      );
      successResponse(res, 'Deal updated successfully', deal);
    } catch (error) {
      next(error);
    }
  }

  // get all deals with products
  async getDeals(req, res, next) {
    try {
      const deals = await dealModel.find().populate('products');
      successResponse(res, 'Deals fetched successfully', deals);
    } catch (error) {
      next(error);
    }
  }

  // get a deal with products
  async getDeal(req, res, next) {
    const { id } = req.params;
    try {
      const deal = await dealModel.findById(id).populate('products');
      successResponse(res, 'Deal fetched successfully', deal);
    } catch (error) {
      next(error);
    }
  }

  // delete a deal
  async deleteDeal(req, res, next) {
    const { id } = req.params;
    try {
      const deal = await dealModel.findByIdAndDelete(id);
      successResponse(res, 'Deal deleted successfully', deal);
    } catch (error) {
      next(error);
    }
  }

  async getDealsAndProducts(req, res, next) {
    const { type } = req.query;
    try {
      if (type === 'product') {
        const products = await productModel.find({});
        successResponse(res, 'Products fetched successfully', products);
      } else if (type === 'deal') {
        const deals = await dealModel.find({}).populate('products');
        successResponse(res, 'Deals fetched successfully', deals);
      } else {
        const products = await productModel.find();
        const deals = await dealModel.find().populate('products');
        const data = [...products, ...deals];
        successResponse(res, 'Deals and products fetched successfully', data);
      }
    } catch (error) {
      next(error);
    }
  }
}

const dealController = new DealController();
export default dealController;
