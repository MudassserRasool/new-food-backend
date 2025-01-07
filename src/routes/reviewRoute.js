import express from 'express';
import reviewController from '../controllers/reviewController.js';
const router = express.Router();

router.post('/', reviewController.createReview);
router.get('/', reviewController.getReviews);

export default router;
