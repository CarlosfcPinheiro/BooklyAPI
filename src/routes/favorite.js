import express from 'express';
import FavoriteController from '../controller/favorite.js';
import authMiddleware from '../middleware/authMiddleware.js';
import ownershipMiddleware from '../middleware/ownershipMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, FavoriteController.getAllFavorites);
router.get('/user/verify', authMiddleware, FavoriteController.getFavoriteByBookIdAndUserId);
router.get('/user/:userId', authMiddleware, FavoriteController.getAllFavoritesByUserId);
router.get('/:id', authMiddleware, FavoriteController.getFavoriteById);

router.post('/', authMiddleware, FavoriteController.createFavorite);

router.delete('/:id', authMiddleware, ownershipMiddleware('favorite'), FavoriteController.deleteFavoriteById);
//TODO ajustar para verificar se o favorito pertence ao user autenticado
router.delete('/', authMiddleware, FavoriteController.deleteFavoriteByUserAndBook);

export default router;