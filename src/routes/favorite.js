import express from 'express';
import FavoriteController from '../controller/favorite.js';

const router = express.Router();

router.get('/', FavoriteController.getAllFavorites);
router.get('/:id', FavoriteController.getFavoriteById);
router.get('/user/:userId', FavoriteController.getAllFavoritesByUserId);

router.post('/', FavoriteController.createFavorite);

router.delete('/:id', FavoriteController.deleteFavoriteById);
router.delete('/', FavoriteController.deleteFavoriteByUserAndBook);

export default router;