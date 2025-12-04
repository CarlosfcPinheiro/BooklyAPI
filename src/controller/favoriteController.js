import FavoriteService from "../services/favoriteService.js";
//TODO refatorar para usar services e objeto de controller padrao para agrupar as funções

const FavoriteController = {
    getAllFavorites: async(req, res) => {
        try {
            const favorites = await FavoriteService.getAllFavorites(req.context.models);
            if (!favorites || favorites.length === 0) {
                return res.status(204).json({ message: 'Nenhum favorito encontrado' });
            }

            res.status(200).json({
                message: 'Favoritos encontrados com sucesso',
                data: favorites
            });
        } catch(error){
            res.status(500).json({ 
                message: 'Erro interno no servidor ao buscar todos os favoritos',
                error: error.message 
            });
        }
    },

    getFavoriteById: async(req, res) => {
        try {
            const { id } = req.params;
            const favorite = await FavoriteService.getFavoriteById(req.context.models, id);
            if (!favorite) {
                return res.status(404).json({ message: 'Favorito não encontrado' });
            }

            res.status(200).json({ 
                message: 'Favoritos encontrados com sucesso', 
                data: favorite
            });
        } catch(error){
            res.status(500).json({ 
                message: 'Erro interno no servidor ao buscar o favorito por ID',
                error: error.message 
            });
        }
    },

    getAllFavoritesByUserId: async(req, res) => {
        try {
            const { userId } = req.params;
            const favorites = await FavoriteService.getAllFavoritesByUserId(req.context.models, userId);
            if (!favorites || favorites.length === 0) {
                return res.status(404).json({ message: 'Nenhum favorito encontrado para este usuário' });
            }

            res.status(200).json({
                message: 'Favoritos encontrados com sucesso',
                data: favorites
            });
        } catch(error){
            res.status(500).json({ 
                message: 'Erro interno no servidor ao buscar favoritos por ID de usuário', 
                error: error.message 
            });
        }
    },

    //TODO evitar que um usuário crie favoritos para um mesmo livro mais de uma vez
    createFavorite: async(req, res) => {
        try {
            const authenticatedUserId = req.user.userId;
            const { bookId } = req.query;
            if (!bookId){
                return res.status(400).json({ message: 'bookId é obrigatório para criar um favorito' });
            }

            const result = await FavoriteService.createFavorite(req.context.models, authenticatedUserId, bookId);
            
            if (!result.success) {
                return res.status(result.status).json({ message: result.message });
            }

            res.status(201).json({
                message: 'Favorito criado com sucesso',
                data: result.data
            });
        } catch(error){
            res.status(500).json({ 
                message: 'Erro interno no servidor ao criar o favorito', 
                error: error.message 
            });
        }
    },

    deleteFavoriteById: async(req, res) => {
        try {
            const { id } = req.params;
            const favorite = await FavoriteService.deleteFavoriteById(req.context.models, id);
            if (!favorite) {
                return res.status(404).json({ message: 'Favorito não encontrado' });
            }

            res.status(200).json({ message: 'Favorito deletado com sucesso' });
        } catch(error){
            res.status(500).json({ message: 'Erro interno no servidor ao deletar o favorito', error: error.message });
        }
    },

    deleteFavoriteByUserAndBook: async(req, res) => {
        try {
            const authenticatedUserId = req.user.userId;
            const { bookId } = req.query;
            if (!bookId){
                return res.status(400).json({ message: 'bookId é obrigatório para deletar um favorito' });
            }

            const favorite = await FavoriteService.deleteFavoriteByUserAndBook(req.context.models, authenticatedUserId, bookId); 
            if (!favorite) {
                return res.status(404).json({ message: 'Favorito não encontrado para o usuário e livro fornecidos' });
            }

            res.status(200).json({ message: 'Favorito deletado com sucesso' });
        } catch(error){
            res.status(500).json({ message: 'Erro interno no servidor ao deletar o favorito', error: error.message });
        }
    },

    getFavoriteByBookIdAndUserId: async (req, res) => {
        try {
            const authenticatedUserId = req.user.userId;
            const { bookId } = req.query;
            if (!bookId){
                return res.status(400).json({ message: 'bookId é obrigatório para buscar um favorito' });
            }

            const favorite = await FavoriteService.getFavoriteByBookIdAndUserId(req.context.models, authenticatedUserId, bookId);
            if (!favorite) {
                return res.status(404).json({ message: 'Favorito não encontrado para o usuário e livro fornecidos' });
            }

            res.status(200).json({ 
                message: 'Favorito encontrado com sucesso', 
                data: favorite 
            });
        } catch(error){
            res.status(500).json({ 
                message: 'Erro interno no servidor ao buscar o favorito', 
                error: error.message 
            });
        }
    }
};

export default FavoriteController;