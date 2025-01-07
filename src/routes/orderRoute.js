import express from 'express';
import orderController from '../controllers/orderController.js';
const router = express.Router();

router.get('/all-admin', orderController.getOrdersAdmin);
router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.patch('/status/:orderId', orderController.updateOrderStatus);

export default router;
