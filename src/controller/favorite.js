const getAllFavorites = async(req, res) => {
    try {
        const Favorite = req.context.models.Favorite;
        const favorites = await Favorite.findAll();
        if (!favorites || favorites.length === 0) {
            return res.status(404).json({ message: 'Nenhum favorito encontrado' });
        }

        res.status(200).json({
            message: 'Favoritos encontrados com sucesso',
            data: favorites
        });
    } catch(error){
        res.status(500).json({ message: 'Erro interno no servidor ao buscar todas os favoritos', error: error.message });
    }
}

const getFavoriteById = async(req, res) => {
    try {
        const Favorite = req.context.models.Favorite;
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
        res.status(500).json({ message: 'Erro interno no servidor ao buscar o favorito por ID', error: error.message });
    }
}

const getAllFavoritesByUserId = async(req, res) => {
    try {
        const Favorite = req.context.models.Favorite;
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
        res.status(500).json({ message: 'Erro interno no servidor ao buscar favoritos por ID de usuário', error: error.message });
    }
}

const createFavorite = async(req, res) => {
    try {
        const Favorite = req.context.models.Favorite;
        const { userId, bookId } = req.query;
        if (!userId || !bookId){
            return res.status(400).json({ message: 'userId e bookId são obrigatórios para criar um favorito' });
        }

        const newFavorite = await Favorite.create({ 
            UserId : userId, 
            BookId: bookId 
        });

        res.status(201).json({
            message: 'Favorito criado com sucesso',
            data: newFavorite
        });
    } catch(error){
        res.status(500).json({ message: 'Erro interno no servidor ao criar o favorito', error: error.message });
    }
}

const deleteFavoriteById = async(req, res) => {
    try {
        const Favorite = req.context.models.Favorite;
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
}

const deleteFavoriteByUserAndBook = async(req, res) => {
    try {
        const Favorite = req.context.models.Favorite;
        const { userId, bookId } = req.query;
        if (!userId || !bookId){
            return res.status(400).json({ message: 'userId e bookId são obrigatórios para deletar um favorito' });
        }

        const favorite = await Favorite.findOne({ where: { UserId: userId, BookId: bookId } });
        if (!favorite) {
            return res.status(404).json({ message: 'Favorito não encontrado para o usuário e livro fornecidos' });
        }

        await Favorite.destroy({ 
            where: { UserId: userId, BookId: bookId } 
        });

        res.status(200).json({ message: 'Favorito deletado com sucesso' });
    } catch(error){
        res.status(500).json({ message: 'Erro interno no servidor ao deletar o favorito', error: error.message });
    }
}

export {
    getAllFavorites,
    getFavoriteById,
    getAllFavoritesByUserId,
    createFavorite,
    deleteFavoriteById,
    deleteFavoriteByUserAndBook
}