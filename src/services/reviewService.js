const ReviewService = {
    getAllReviews: async (models) => {
        const Review = models.review;
        const reviews = await Review.findAll({
            include: ["User", "Book"]
        });
        return reviews;
    },

    getReviewById: async (models, id) => {
        const Review = models.review;
        const review = await Review.findByPk(id);
        return review;
    },

    createReview: async (models, reviewData) => {
        const Review = models.review;
        const User = models.user;
        const Book = models.book;
        const { userId, bookId, rate, comment } = reviewData;

        if (!bookId) {
            return { success: false, status: 400, message: "bookId é obrigatório" };
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return { success: false, status: 404, message: "Usuário não encontrado" };
        }

        const book = await Book.findByPk(bookId);
        if (!book) {
            return { success: false, status: 404, message: "Livro não encontrado" };
        }

        const review = await Review.create({
            UserId: userId,
            BookId: bookId,
            rate: rate,
            comment: comment
        });

        return { success: true, status: 201, data: review };
    },

    updateReviewById: async (models, id, reviewData) => {
        const Review = models.review;
        const review = await Review.findByPk(id);
        if (!review) {
            return null;
        }

        const { rate, comment } = reviewData;
        review.rate = rate || review.rate;
        review.comment = comment || review.comment;
        await review.save();

        return review;
    },

    deleteReviewById: async (models, id) => {
        const Review = models.review;
        const review = await Review.findByPk(id);
        if (!review) {
            return null;
        }

        await review.destroy();
        return review;
    },

    getReviewsByUserId: async (models, userId) => {
        const Review = models.review;
        const reviews = await Review.findAllByUserId(userId);
        return reviews;
    },

    getReviewsByBookId: async (models, bookId) => {
        const Review = models.review;
        const reviews = await Review.findAllByBookId(bookId);
        return reviews;
    },

    getAvgReviewsByBookId: async (models, bookId) => {
        const Review = models.review;
        const avgRating = await Review.getAvgRateByBookId(bookId);
        return avgRating;
    }
}

export default ReviewService;