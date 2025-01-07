import { Router } from 'express';
import wishlistController from '../controllers/wishlistController.js';
const router = Router();

router.post('/', wishlistController.addWishlist);
router.get('/', wishlistController.getWishlist);
router.delete('/:productId', wishlistController.removeWishlist);

export default router;
