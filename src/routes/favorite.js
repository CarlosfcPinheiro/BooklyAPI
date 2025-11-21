import express from 'express';
import FavoriteController from '../controller/favorite.js';
import authMiddleware from '../middleware/authMiddleware.js';
import ownershipMiddleware from '../middleware/ownershipMiddleware.js';

const router = express.Router();

router.get('/', FavoriteController.getAllFavorites);
router.get('/:id', FavoriteController.getFavoriteById);
router.get('/user/:userId', FavoriteController.getAllFavoritesByUserId);

router.post('/', authMiddleware, FavoriteController.createFavorite);

router.delete('/:id', authMiddleware, ownershipMiddleware('favorite'), FavoriteController.deleteFavoriteById);
router.delete('/', authMiddleware, FavoriteController.deleteFavoriteByUserAndBook);

export default router;