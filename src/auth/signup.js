import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import models from "../models/index.js";

const User = models.user;
const Token = models.token;

const signUp =  async (req, res) => {
    const { email, password, name, description, profilePhotoUrl } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email já está em uso" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            id: uuidv4(),
            email: email,
            password: hashedPassword,
            name: name,
            description: description,
            profilePhotoUrl: profilePhotoUrl
        });

        let tokenId = uuidv4();
        let token = jwt.sign({ userId: newUser.id, tokenId: tokenId }, process.env.SECRET_KEY, { expiresIn: "1h" });
        
        await Token.create({ id: tokenId });
        
        res.status(201).json({
            message: "Usuário registrado com sucesso",
            data: {
                token: token,
                user: newUser
            }
         });
    } catch (error) {
        res.status(500).json({ message: "Erro ao registrar novo usuário" });
    }
}

export default signUp;