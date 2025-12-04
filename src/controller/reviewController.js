import ReviewService from "../services/reviewService.js";

const ReviewController = {
    getAllReviews: async (req, res) => {
        try {
            const reviews = await ReviewService.getAllReviews(req.context.models);
            if (!reviews || reviews.length === 0){
                return res.status(204).json({ message: "Nenhuma review encontrada" });
            }
            res.status(200).json({
                message: 'Reviews encontradas com sucesso',
                data: reviews
            });
        } catch(error) {
            res.status(500).json({ 
                message: "Erro ao buscar reviews", 
                error: error.message 
            });
        }
    },

    getReviewById: async (req, res) =>  {
        try{
            const { id } = req.params;
            const review = await ReviewService.getReviewById(req.context.models, id);
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
    },

    createReview: async (req, res) =>  {
        try {
            const authenticatedUserId = req.user.userId; // do token JWT
            const { bookId } = req.query;
            const { rate, comment } = req.body;

            const result = await ReviewService.createReview(req.context.models, {
                userId: authenticatedUserId,
                bookId: bookId,
                rate: rate,
                comment: comment
            });

            if (!result.success) {
                return res.status(result.status).json({ message: result.message });
            }

            res.status(201).json({
                message: 'Review criada com sucesso',
                data: result.data
            });
        } catch(error) {
            res.status(500).json({ message: "Erro ao criar review", error: error.message });
        }
    },

    updateReviewById: async (req, res) =>  {
        try {
            const { id } = req.params;
            const review = await ReviewService.updateReviewById(req.context.models, id, req.body);
            if (!review){
                return res.status(404).json({ message: "Review não encontrada" });
            }

            res.status(200).json({
                message: 'Review atualizada com sucesso',
                data: review
            });
        } catch(error) {
            res.status(500).json({ message: "Erro ao atualizar review", error: error.message });
        }
    },

    deleteReviewById: async (req, res) =>  {
        try {
            const { id } = req.params;
            const review = await ReviewService.deleteReviewById(req.context.models, id);
            if (!review){
                return res.status(404).json({ message: "Review não encontrada" });
            }

            res.status(200).json({
                message: 'Review deletada com sucesso'
            });
        } catch(error) {
            res.status(500).json({ message: "Erro ao deletar review", error: error.message });
        }
    },

    getReviewsByUserId: async (req, res) =>  {
        try {
            const { userId } = req.params;
            const reviews = await ReviewService.getReviewsByUserId(req.context.models, userId);
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
    },

    getReviewsByBookId: async (req, res) =>  {
        try {
            const { bookId } = req.params;
            const reviews = await ReviewService.getReviewsByBookId(req.context.models, bookId);
            if (!reviews || reviews.length === 0){
                return res.status(204).json({ message: "Nenhuma review encontrada para este livro" });
            }

            res.status(200).json({
                message: 'Reviews do livro encontradas com sucesso',
                data: reviews
            });
        } catch(error) {
            res.status(500).json({ message: "Erro ao buscar reviews do livro", error: error.message });
        }
    },

    getAvgReviewsByBookId: async (req, res) =>  {
        try {
            const { bookId } = req.params;
            const avgRating = await ReviewService.getAvgReviewsByBookId(req.context.models, bookId);
            if (avgRating === null){
                return res.status(404).json({ 
                    message: "Nenhuma review encontrada para este livro" 
                });
            }

            res.status(200).json({
                message: 'Média das reviews do livro encontrada com sucesso',
                data: { avg: avgRating }
            });
        } catch(error) {
            res.status(500).json({ message: "Erro ao buscar média das reviews do livro", error: error.message });
        }
    }
};

export default ReviewController;