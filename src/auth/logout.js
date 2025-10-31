import models from "../models/index.js";

export const logout = async (req, res) => {
  try {
    const tokenId = req.user.tokenId;

    const deletedCount = await models.token.destroy({
      where: {
        id: tokenId
      }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Sessão não encontrada. Logout falhou." });
    }

    return res.status(200).json({ message: "Logout realizado com sucesso." });

  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export default logout;