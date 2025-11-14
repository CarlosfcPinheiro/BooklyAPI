import express from "express"
import BookController from "../controller/book.js";

const router = express.Router();

router.get("/", BookController.getAllBooks);
router.get("/:id", BookController.getBookById);
router.get("/author/:authorId", BookController.getAllBooksByAuthorId);
router.get("/gender/:genderId", BookController.getAllBooksByGenderId);

router.post("/", BookController.createBook);
router.put("/:id", BookController.updateBookById);
router.delete("/:id", BookController.deleteBookById);

export default router