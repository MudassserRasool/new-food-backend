import { Router } from 'express';
import categoryController from '../controllers/categoryController.js';
import authenticateAdmin from '../middlewares/authenticateAdmin.js';
import upload from '../middlewares/multer.js';
const router = Router();

router.use(authenticateAdmin);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.post('/', upload.single('image'), categoryController.createCategory);
router.patch('/:id', upload.single('image'), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
