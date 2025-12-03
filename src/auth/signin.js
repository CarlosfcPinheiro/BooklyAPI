import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import models from "../models/index.js";

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await models.user.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Senha ou email inválidos" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Senha ou email inválidos" });
        }

        let tokenId = uuidv4();
        
        let token = jwt.sign({ userId: user.id, tokenId: tokenId }, process.env.SECRET_KEY, { expiresIn: "1h" });
        
        await models.token.create({ id: tokenId });
        
        res.status(200).json({
            message: "Login efetuado com sucesso",
            data: {
                token: token,
                user: user
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor ao efetuar login do usuário" });
    }
}

export default signIn;