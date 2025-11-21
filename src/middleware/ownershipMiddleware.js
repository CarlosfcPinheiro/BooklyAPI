const ownershipMiddleware = (resourceType) => {
    return async (req, res, next) => {
        try {
            // Recupera o id do usuário através do payload to token JWT, fornecido pelo authMiddleware
            // Recupera também o id do recurso (user, review ou favorite)
            const authenticatedUserId = req.user.userId;
            const { id } = req.params;

            // Para rotas de usuário (/users/:id)
            if (resourceType === 'user') {
                if (String(id) !== String(authenticatedUserId)) {
                    return res.status(403).json({ 
                        message: "Você não tem permissão para modificar este usuário" 
                    });
                }
            }

            // Para recursos que pertencem a um usuário (reviews, favorites)
            if (resourceType === 'review' || resourceType === 'favorite') {
                const Model = req.context.models[resourceType];
                const resource = await Model.findByPk(id);
                
                if (!resource) {
                    return res.status(404).json({ 
                        message: `${resourceType} não encontrado` 
                    });
                }

                if (String(resource.UserId) !== String(authenticatedUserId)) {
                    return res.status(403).json({ 
                        message: `Você não tem permissão para modificar este ${resourceType}` 
                    });
                }
            }
            next();
            } catch (error) {
                return res.status(500).json({ 
                    message: "Erro ao verificar permissões", 
                    error: error.message 
                });
            }
    };
};

export default ownershipMiddleware;
