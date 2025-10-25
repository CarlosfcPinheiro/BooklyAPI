import { 
    getAllReviews, 
    getReviewsByBookId, 
    getReviewById, 
    getAvgReviewsByBookId, 
    getReviewsByUserId, 
    createReview, 
    updateReviewById, 
    deleteReviewById 
} from "./review.js";

const review = {
    getAllReviews,
    getReviewById,
    getReviewsByBookId,
    getAvgReviewsByBookId,
    getReviewsByUserId,
    createReview,
    updateReviewById,
    deleteReviewById
};

export { review };