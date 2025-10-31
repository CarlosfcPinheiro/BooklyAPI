import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import models from "../models/index.js";

const signUp =  async (req, res) => {
    const { email, password, name, description } = req.body;
    try {
        const existingUser = await models.user.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await models.user.create({
            id: uuidv4(),
            email: email,
            password: hashedPassword,
            name: name,
            description: description
        });

        let tokenId = uuidv4();
        
        let token = jwt.sign({ userId: newUser.id, tokenId: tokenId }, process.env.SECRET_KEY, { expiresIn: "1h" });
        
        await models.token.create({ id: tokenId });
        
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export default signUp;