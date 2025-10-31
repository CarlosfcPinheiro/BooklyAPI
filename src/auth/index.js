import signIn from "./signin.js";
import signUp from "./signup.js";
import logout from "./logout.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", signIn);
router.post("/register", signUp);
router.post("/logout",authMiddleware, logout);

export default router;