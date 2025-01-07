import mongoose from 'mongoose';
import { ROLES } from '../constants/index.js';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import ExceptionHandler from '../utils/error.js';
import successResponse from '../utils/successResponse.js';

class OrderController {
  async createOrder(req, res, next) {
    try {
      const userId = req.user._id.toString();
      const trackingId = Math.floor(100000 + Math.random() * 900000).toString();
      const order = await orderModel.create({
        ...req.body,
        userId: userId,
        trackingId,
      });

      successResponse(res, 'Order created successfully', order);
    } catch (error) {
      next(error);
    }
  }

  async getOrders(req, res, next) {
    const { status } = req.query;
    try {
      const userId = req.user._id.toString();
      if (!mongoose.isValidObjectId(userId)) {
        ExceptionHandler.BadRequest('Invalid user ID');
      }
      const query = { userId };
      if (status) {
        query.status = status;
      }

      const orders = await orderModel.find(query);

      successResponse(res, 'Orders fetched successfully', orders);
    } catch (error) {
      next(error);
    }
  }

  // ge all orders of all customers
  async getOrdersAdmin(req, res, next) {
    const { status } = req.query;
    try {
      const query = {};
      if (status) {
        query.status = status;
      }
      const orders = await orderModel.find(query);
      successResponse(res, 'Orders fetched successfully', orders);
    } catch (error) {
      next(error);
    }
  }

  // update order status
  async updateOrderStatus(req, res, next) {
    const { orderId } = req.params;
    const { status } = req.body;
    const userId = req.user._id.toString();
    try {
      const user = await userModel.findById(userId);
      const order = await orderModel.findById(orderId);

      if (!mongoose.isValidObjectId(orderId)) {
        ExceptionHandler.BadRequest('Invalid order ID');
      }

      if (user.role !== ROLES.admin) {
        ExceptionHandler.Forbidden(
          'You are not authorized to perform this action'
        );
      }
      if (!order) {
        ExceptionHandler.BadRequest('Order not found');
      }
      if (!status || typeof status !== 'string') {
        ExceptionHandler.BadRequest('Invalid status');
      }
      order.status = status;
      await order.save();
      successResponse(res, 'Order status updated successfully', order);
    } catch (error) {
      next(error);
    }
  }
}

const orderController = new OrderController();
export default orderController;
