import express from 'express';
import GenderController from '../controller/gender.js';

const router = express.Router();

router.get('/', GenderController.getAllGenders);
router.get('/:id', GenderController.getGenderById);

router.post('/', GenderController.createGender);
router.put('/:id', GenderController.updateGenderById);
router.delete('/:id', GenderController.deleteGenderById);

export default router;