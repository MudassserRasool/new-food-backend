import productModel from '../models/productModel.js';
import ExceptionHandler from '../utils/error.js';
import successResponse from '../utils/successResponse.js';

class ProductController {
  async createProduct(req, res, next) {
    try {
      const { name } = req.body;
      const existProduct = await productModel.findOne({ name });
      if (existProduct) {
        ExceptionHandler.Conflict('Product already exist');
      }
      const product = await productModel.create(req.body);
      successResponse(res, 'Product created successfully', product);
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req, res, next) {
    const { featured } = req.query;
    try {
      const queryPipeline = [
        { $match: { countInStock: { $gt: 0 } } },
        { $sort: { rating: -1 } },
      ];
      if (featured === 'false') {
        queryPipeline.push({ $sort: { _id: 1 } });
      }
      const products = await productModel.aggregate(queryPipeline);
      successResponse(res, 'Products fetched successfully', products);
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req, res, next) {
    const { id } = req.params;
    try {
      const product = await productModel.findById(id);
      successResponse(res, 'Product fetched successfully', product);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    const { id } = req.params;
    try {
      const existProduct = await productModel.findById(id);
      if (!existProduct) {
        ExceptionHandler.NotFound('Product not found');
      }
      const product = await productModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      successResponse(res, 'Product updated successfully', product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      const product = await productModel.findByIdAndDelete(id);
      successResponse(res, 'Product deleted successfully', product);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
