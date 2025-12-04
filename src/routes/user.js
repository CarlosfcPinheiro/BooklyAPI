import express from "express"
import UserController from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import ownershipMiddleware from "../middleware/ownershipMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, UserController.getAllUsers);
router.get("/:id", authMiddleware, UserController.getUserById);

router.post("/", authMiddleware, UserController.createUser);
router.put("/:id", authMiddleware, ownershipMiddleware('user'), UserController.updateUserById);
router.delete("/:id", authMiddleware, ownershipMiddleware('user'), UserController.deleteUserById);

export default router;