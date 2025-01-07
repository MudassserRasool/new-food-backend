import express from 'express';
import addressController from '../controllers/addressController.js';
const router = express.Router();

router.get('/enabled-address', addressController.getEnabledAddress);
router.get('/', addressController.getAddresses);
router.post('/', addressController.createAddress);
router.get('/:id', addressController.getAddress);
router.patch('/:id', addressController.updateAddress);

export default router;
