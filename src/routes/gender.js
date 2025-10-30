import express from 'express';
import {
    getAllGenders,
    getGenderById,
    createGender,
    updateGenderById,
    deleteGenderById
} from '../controller/gender.js';

const router = express.Router();

router.get('/', getAllGenders);
router.get('/:id', getGenderById);

router.post('/', createGender);
router.put('/:id', updateGenderById);
router.delete('/:id', deleteGenderById);

export default router;