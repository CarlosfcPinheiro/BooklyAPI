import express from "express"
import { user } from "../controller/index.js";

const router = express.Router();

router.get("/", user.getAllUser);
router.get("/:id", user.getUserById);

router.post("/", user.createUser);
router.put("/:id", user.updadeUserById);
router.delete("/:id", user.deleteUserById);

export default router