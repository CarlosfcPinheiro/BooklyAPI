import express from 'express';
import { favorite } from '../controller/index.js';

const router = express.Router();

router.get('/', favorite.getAllFavorites);
router.get('/:id', favorite.getFavoriteById);
router.get('/user/:userId', favorite.getAllFavoritesByUserId);

router.post('/', favorite.createFavorite);

router.delete('/:id', favorite.deleteFavoriteById);
router.delete('/', favorite.deleteFavoriteByUserAndBook);

export default router;