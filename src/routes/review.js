import express from "express"
import ReviewController from "../controller/review.js";

const router = express.Router();

router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getReviewById);
router.get("/average/book/:bookId", ReviewController.getAvgReviewsByBookId);
router.get("/book/:bookId", ReviewController.getReviewsByBookId);
router.get("/user/:userId", ReviewController.getReviewsByUserId);

router.post("/", ReviewController.createReview);
router.put("/:id", ReviewController.updateReviewById);
router.delete("/:id", ReviewController.deleteReviewById);

export default router