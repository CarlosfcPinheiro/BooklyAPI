import express from "express"
import AuthorController from "../controller/authorController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, AuthorController.getAllAuthor);
router.get("/:id", authMiddleware, AuthorController.getAuthorById);

router.post("/", authMiddleware, AuthorController.createAuthor);
router.put("/:id", authMiddleware, AuthorController.updateAuthorById);
router.delete("/:id", authMiddleware, AuthorController.deleteAuthorById);

export default router