import express from "express"
import ReviewController from "../controller/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import ownershipMiddleware from "../middleware/ownershipMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, ReviewController.getAllReviews);
router.get("/:id", authMiddleware, ReviewController.getReviewById);
router.get("/average/book/:bookId", authMiddleware, ReviewController.getAvgReviewsByBookId);
router.get("/book/:bookId", authMiddleware, ReviewController.getReviewsByBookId);
router.get("/user/:userId", authMiddleware, ReviewController.getReviewsByUserId);

router.post("/", authMiddleware, ReviewController.createReview);
router.put("/:id", authMiddleware, ownershipMiddleware('review'), ReviewController.updateReviewById);
router.delete("/:id", authMiddleware, ownershipMiddleware('review'), ReviewController.deleteReviewById);

export default router