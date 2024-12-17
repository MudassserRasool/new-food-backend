import { Router } from 'express';
import {
  getCurrentProfileInfo,
  updateProfileInfo,
} from '../controllers/profileController.js';
import upload from '../middlewares/multer.js';
import requireAuth from '../middlewares/requireAuth.js';
const router = Router();

router.use(requireAuth);

router.get('/', getCurrentProfileInfo);
router.patch('/update-profile', upload.single('image'), updateProfileInfo);

export default router;
