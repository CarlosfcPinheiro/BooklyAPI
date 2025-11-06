
const getAllReviews = async (req, res) => {
    try {
        const Review = req.context.models.review;
        const reviews = await Review.findAll();
        if (!reviews || reviews.length === 0){
            return res.status(404).json({ message: "Nenhuma review encontrada" });
        }
        res.status(200).json({
            message: 'Reviews encontradas com sucesso',
            data: reviews
        });
    } catch(error) {
        res.status(500).json({ message: "Erro ao buscar reviews", error: error.message });
    }
}

const getReviewById = async (req, res) =>  {
    try{
        const Review = req.context.models.review;
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review){
            return res.status(404).json({ message: "Review não encontrada" });
        }
        res.status(200).json({
            message: 'Review encontrada com sucesso',
            data: review
        });
    } catch(error) {
        res.status(500).json({ message: "Erro ao buscar review", error: error.message });
    }
}

const createReview = async (req, res) =>  {
    try {
        const Review = req.context.models.review;
        const { userId, bookId } = req.query;
        const { rate, comment } = req.body;
        if (!userId || !bookId) {
            return res.status(400).json({ message: "userId e bookId são obrigatórios" });
        }

        const review = await Review.create({
            UserId: userId,
            BookId: bookId,
            rate: rate,
            comment: comment
        });

        res.status(201).json({
            message: 'Review criada com sucesso',
            data: review
        });
    } catch(error) {
        res.status(500).json({ message: "Erro ao criar review", error: error.message });
    }
}

const updateReviewById = async (req, res) =>  {
    try {
        const Review = req.context.models.review;
        const { id } = req.params;
        const { rate, comment } = req.body;

        const review = await Review.findByPk(id);
        if (!review){
            return res.status(404).json({ message: "Review não encontrada" });
        }

        review.rate = rate || review.rate;
        review.comment = comment || review.comment;

        await review.save();

        res.status(200).json({
            message: 'Review atualizada com sucesso',
            data: review
        });
    } catch(error) {
        res.status(500).json({ message: "Erro ao atualizar review", error: error.message });
    }
}

const deleteReviewById = async (req, res) =>  {
    try {
        const Review = req.context.models.review;
        const { id } = req.params;

        const review = await Review.findByPk(id);
        if (!review){
            return res.status(404).json({ message: "Review não encontrada" });
        }

        await review.destroy();

        res.status(200).json({
            message: 'Review deletada com sucesso'
        });
    } catch(error) {
        res.status(500).json({ message: "Erro ao deletar review", error: error.message });
    }
}

const getReviewsByUserId = async (req, res) =>  {
    try {
        const Review = req.context.models.review;
        const { userId } = req.params;
        const reviews = await Review.findAllByUserId(userId);
        if (!reviews || reviews.length === 0){
            return res.status(404).json({ message: "Nenhuma review encontrada para este usuário" });
        }

        res.status(200).json({
            message: 'Reviews do usuário encontradas com sucesso',
            data: reviews
        });
    } catch(error) {
        res.status(500).json({ message: "Erro ao buscar reviews do usuário", error: error.message });
    }
}

const getReviewsByBookId = async (req, res) =>  {
    try {
        const Review = req.context.models.review;
        const { bookId } = req.params;
        const reviews = await Review.findAllByBookId(bookId);
        if (!reviews || reviews.length === 0){
            return res.status(404).json({ message: "Nenhuma review encontrada para este livro" });
        }

        res.status(200).json({
            message: 'Reviews do livro encontradas com sucesso',
            data: reviews
        });
    } catch(error) {
        res.status(500).json({ message: "Erro ao buscar reviews do livro", error: error.message });
    }
}

const getAvgReviewsByBookId = async (req, res) =>  {
    try {
        const Review = req.context.models.review;
        const { bookId } = req.params;
        const avgRating = await Review.getAverageRatingByBookId(bookId);
        if (avgRating === null){
            return res.status(404).json({ message: "Nenhuma review encontrada para este livro" });
        }

        res.status(200).json({
            message: 'Média das reviews do livro encontrada com sucesso',
            data: avgRating
        });
    } catch(error) {
        res.status(500).json({ message: "Erro ao buscar média das reviews do livro", error: error.message });
    }
}

export {
    getAllReviews,
    getReviewById, 
    createReview, 
    updateReviewById, 
    deleteReviewById, 
    getReviewsByUserId, 
    getReviewsByBookId, 
    getAvgReviewsByBookId
}