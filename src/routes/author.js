import express from "express"
import AuthorController from "../controller/author.js";

const router = express.Router();

router.get("/", AuthorController.getAllAuthor);
router.get("/:id", AuthorController.getAuthorById);

router.post("/", AuthorController.createAuthor);
router.put("/:id", AuthorController.updateAuthorById);
router.delete("/:id", AuthorController.deleteAuthorById);

export default router