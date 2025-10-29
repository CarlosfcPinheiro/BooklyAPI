import express from "express"
import { book } from "../controller/index.js";

const router = express.Router();

router.get("/", book.getAllBooks);
router.get("/:id", book.getBookById);
router.get("/author/:authorId", book.getAllBooksByAuthorId);
router.get("/gender/:genderId", book.getAllBooksByGenderId);

router.post("/", book.createBook);
router.put("/:id", book.updateBookById);
router.delete("/:id", book.deleteBookById);

export default router