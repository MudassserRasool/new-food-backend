import express from 'express';
import dealController from '../controllers/dealsController.js';

const router = express.Router();
router.get('/all', dealController.getDealsAndProducts);
router.post('/', dealController.createDeal);
router.put('/:id', dealController.updateDeal);
router.get('/', dealController.getDeals);
router.get('/:id', dealController.getDeal);
router.delete('/:id', dealController.deleteDeal);

export default router;
