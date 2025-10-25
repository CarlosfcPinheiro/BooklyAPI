import express from "express"
import { review } from "../controller/index.js";

const router = express.Router();

router.get("/", review.getAllReviews);
router.get("/:id", review.getReviewById);
router.get("/average/book/:bookId", review.getAvgReviewsByBookId);
router.get("/book/:bookId", review.getReviewsByBookId);
router.get("/user/:userId", review.getReviewsByUserId);

router.post("/", review.createReview);
router.put("/:id", review.updateReviewById);
router.delete("/:id", review.deleteReviewById);

export default router