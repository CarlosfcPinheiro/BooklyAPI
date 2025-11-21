import express from "express"
import ReviewController from "../controller/review.js";
import authMiddleware from "../middleware/authMiddleware.js";
import ownershipMiddleware from "../middleware/ownershipMiddleware.js";

const router = express.Router();

router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getReviewById);
router.get("/average/book/:bookId", ReviewController.getAvgReviewsByBookId);
router.get("/book/:bookId", ReviewController.getReviewsByBookId);
router.get("/user/:userId", ReviewController.getReviewsByUserId);

router.post("/", authMiddleware, ReviewController.createReview);
router.put("/:id", authMiddleware, ownershipMiddleware('review'), ReviewController.updateReviewById);
router.delete("/:id", authMiddleware, ownershipMiddleware('review'), ReviewController.deleteReviewById);

export default router