import express from "express"
import BookController from "../controller/book.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, BookController.getAllBooks);
router.get("/:id", authMiddleware, BookController.getBookById);
router.get("/author/:authorId", authMiddleware, BookController.getAllBooksByAuthorId);
router.get("/gender/:genderId", authMiddleware, BookController.getAllBooksByGenderId);

router.post("/", BookController.createBook);
router.put("/:id", BookController.updateBookById);
router.delete("/:id", BookController.deleteBookById);

export default router