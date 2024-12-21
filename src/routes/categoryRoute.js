import { Router } from 'express';
import categoryController from '../controllers/categoryController.js';
import requireAuth from '../middlewares/requireAuth.js';
// import authenticateAdmin from '../middlewares/authenticateAdmin.js';
const router = Router();

router.get('/', categoryController.getCategories);

// router.use(authenticateAdmin);
router.use(requireAuth);
router.get('/:id', categoryController.getCategory);
router.post('/', categoryController.createCategory);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
