const FavoriteService = {
    getAllFavorites: async (models) => {
        const Favorite = models.favorite;
        const favorites = await Favorite.findAll({
            include: ["Book", "User"]
        });
        return favorites;
    },

    getFavoriteById: async (models, id) => {
        const Favorite = models.favorite;
        const favorite = await Favorite.findByPk(id);
        return favorite;
    },

    getAllFavoritesByUserId: async (models, userId) => {
        const Favorite = models.favorite;
        const favorites = await Favorite.findAllByUserId(userId);
        return favorites;
    },

    createFavorite: async (models, userId, bookId) => {
        const Favorite = models.favorite;
        const Book = models.book;
        const User = models.user;
        
        const user = await User.findByPk(userId);
        if (!user) {
            return { success: false, status: 404, message: 'Usuário não encontrado' };
        }

        const book = await Book.findByPk(bookId);
        if (!book) {
            return { success: false, status: 404, message: 'Livro não encontrado' };
        }

        const favorite = await Favorite.create({
            UserId: userId,
            BookId: bookId
        });
        return { success: true, status: 201, data: favorite };
    },

    deleteFavoriteById: async (models, id) => {
        const Favorite = models.favorite;
        const favorite = await Favorite.findByPk(id);
        if (!favorite) {
            return null;
        }

        await favorite.destroy();
        return favorite;
    },

    deleteFavoriteByUserAndBook: async (models, userId, bookId) => {
        const Favorite = models.favorite;
        const favorite = await Favorite.findOne({ where: { UserId: userId, BookId: bookId } });
        if (!favorite) {
            return null;
        }

        await favorite.destroy();
        return favorite;
    },

    getFavoriteByBookIdAndUserId: async (models, userId, bookId) => {
        const Favorite = models.favorite;
        const favorite = await Favorite.findByUserAndBook(userId, bookId);
        if (!favorite) {
            return null;
        }

        return favorite;
    }
}

export default FavoriteService;