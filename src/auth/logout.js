import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import models from "../models/index.js";

const router = Router();

router.post("/logout", async (req, res) => {

});

export default router;