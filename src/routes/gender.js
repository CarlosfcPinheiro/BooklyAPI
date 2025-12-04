import express from 'express';
import GenderController from '../controller/genderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, GenderController.getAllGenders);
router.get('/:id', authMiddleware, GenderController.getGenderById);

router.post('/', authMiddleware, GenderController.createGender);
router.put('/:id', authMiddleware, GenderController.updateGenderById);
router.delete('/:id', authMiddleware, GenderController.deleteGenderById);

export default router;