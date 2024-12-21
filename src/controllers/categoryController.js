import categoryModel from '../models/categoryModel.js';
import successResponse from '../utils/successResponse.js';

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await categoryModel.create({ name, icon });
      successResponse(res, 'Category created successfully', category);
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await categoryModel.find();
      successResponse(res, 'Categories fetched successfully', categories);
    } catch (error) {
      next(error);
    }
  }

  async getCategory(req, res, next) {
    const { id } = req.params;
    try {
      const category = await categoryModel.findById(id);
      successResponse(res, 'Category fetched successfully', category);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    const { id } = req.params;
    try {
      const category = await categoryModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      successResponse(res, 'Category updated successfully', category);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    const { id } = req.params;
    try {
      const category = await categoryModel.findByIdAndDelete(id);
      successResponse(res, 'Category deleted successfully', category);
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
