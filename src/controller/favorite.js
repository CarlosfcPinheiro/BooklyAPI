//TODO refatorar para usar services e objeto de controller padrao para agrupar as funções

const FavoriteController = {
    getAllFavorites: async(req, res) => {
        try {
            const Favorite = req.context.models.favorite;
            const favorites = await Favorite.findAll();
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
            const Favorite = req.context.models.favorite;
            const { id } = req.params;
            const favorite = await Favorite.findByPk(id);
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
            const Favorite = req.context.models.favorite;
            const { userId } = req.params;
            const favorites = await Favorite.findAllByUserId(userId);
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
            const Favorite = req.context.models.favorite;
            const User = req.context.models.user;
            const Book = req.context.models.book;
            const authenticatedUserId = req.user.userId; // do token JWT
            const { bookId } = req.query;
            if (!bookId){
                return res.status(400).json({ message: 'bookId é obrigatório para criar um favorito' });
            }

            const user = await User.findByPk(authenticatedUserId);
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

            const book = await Book.findByPk(bookId);
            if (!book) return res.status(404).json({ message: 'Livro não encontrado' });

            const newFavorite = await Favorite.create({ 
                UserId : authenticatedUserId, 
                BookId: bookId 
            });

            res.status(201).json({
                message: 'Favorito criado com sucesso',
                data: newFavorite
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
            const Favorite = req.context.models.favorite;
            const { id } = req.params;
            const favorite = await Favorite.findByPk(id);
            if (!favorite) {
                return res.status(404).json({ message: 'Favorito não encontrado' });
            }

            await Favorite.destroy({ where: { id: id } });

            res.status(200).json({ message: 'Favorito deletado com sucesso' });
        } catch(error){
            res.status(500).json({ message: 'Erro interno no servidor ao deletar o favorito', error: error.message });
        }
    },

    deleteFavoriteByUserAndBook: async(req, res) => {
        try {
            const Favorite = req.context.models.favorite;
            const User = req.context.models.user;
            const Book = req.context.models.book;
            const authenticatedUserId = req.user.userId; // do token JWT
            const { bookId } = req.query;
            if (!bookId){
                return res.status(400).json({ message: 'bookId é obrigatório para deletar um favorito' });
            }

            const user = await User.findByPk(authenticatedUserId);
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
            const book = await Book.findByPk(bookId);
            if (!book) return res.status(404).json({ message: 'Livro não encontrado' });

            const favorite = await Favorite.findOne({ where: { UserId: authenticatedUserId, BookId: bookId } });
            if (!favorite) {
                return res.status(404).json({ message: 'Favorito não encontrado para o usuário e livro fornecidos' });
            }

            await Favorite.destroy({ 
                where: { UserId: authenticatedUserId, BookId: bookId } 
            });

            res.status(200).json({ message: 'Favorito deletado com sucesso' });
        } catch(error){
            res.status(500).json({ message: 'Erro interno no servidor ao deletar o favorito', error: error.message });
        }
    },

    getFavoriteByBookIdAndUserId: async (req, res) => {
        try {
            const Favorite = req.context.models.favorite;
            const User = req.context.models.user;
            const Book = req.context.models.book;
            const authenticatedUserId = req.user.userId; // do token JWT
            const { bookId } = req.query;
            if (!bookId){
                return res.status(400).json({ message: 'bookId é obrigatório para buscar um favorito' });
            }

            const user = await User.findByPk(authenticatedUserId);
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
            const book = await Book.findByPk(bookId);
            if (!book) return res.status(404).json({ message: 'Livro não encontrado' });

            const favorite = await Favorite.findByUserAndBook(authenticatedUserId, bookId);
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