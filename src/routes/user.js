import express from "express"
import UserController from "../controller/user.js";
import authMiddleware from "../middleware/authMiddleware.js";
import ownershipMiddleware from "../middleware/ownershipMiddleware.js";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);

router.post("/", UserController.createUser);
router.put("/:id", authMiddleware, ownershipMiddleware('user'), UserController.updateUserById);
router.delete("/:id", authMiddleware, ownershipMiddleware('user'), UserController.deleteUserById);

export default router