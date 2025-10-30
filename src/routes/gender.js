import express from 'express';
import { gender } from '../controller/index.js';

const router = express.Router();

router.get('/', gender.getAllGenders);
router.get('/:id', gender.getGenderById);

router.post('/', gender.createGender);
router.put('/:id', gender.updateGenderById);
router.delete('/:id', gender.deleteGenderById);

export default router;