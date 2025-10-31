import jwt from "jsonwebtoken";
import "dotenv/config";
import models from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
      return res.status(401).json({ message: "Erro no formato do token" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Token mal formatado" });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const tokenId = payload.tokenId;

    const tokenInDb = await models.token.findByPk(tokenId);
    if (!tokenInDb) {
      return res.status(401).json({ message: "Token inválido (logout)" });
    }

    req.user = payload; 

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
};

export default authMiddleware;