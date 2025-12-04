import UserService from "../services/userService.js";

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserService.getAllUsers(req.context.models);
            if(!users || users.length == 0){
                return res.status(204).json({message: "Nenhum usuário encontrado"});
            }

            res.status(200).json({
                message: "Usuários encontrados com sucesso", 
                data: users
            });
        } catch(error) {
            res.status(500).json({
                message: "Erro ao buscar usuários", 
                error: error.message
            });
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(req.context.models, id);
            if(!user){
                return res.status(404).json({message: "Usuário não encontrado"});
            }

            res.status(200).json({
                message: "Usuario encontrado com sucesso", 
                data: user
            });
        }catch(error) {
            res.status(500).json({
                message: "Erro ao encontrar o usuário", 
                error: error.message
            });
        }
    },

    createUser: async (req, res) => {
        try{
            const result = await UserService.createUser(req.context.models, req.body);
            
            if (!result.success) {
                return res.status(result.status).json({ message: result.message });
            }

            res.status(201).json({
                message: "Usuário criado com sucesso", 
                data: result.data
            });
        }catch (error){
            res.status(500).json({
                message: "Erro ao criar um usuário", 
                error: error.message
            });
        }
    },

    updateUserById: async (req, res) => {
        try {
            const {id} = req.params;
            const user = await UserService.updateUserById(req.context.models, id, req.body);
            if(!user){
                return res.status(404).json({message: "Usuário não encontrado"});
            }

            res.status(200).json({
                message: "Usuário atualizado com sucesso", 
                data: user
            });
        }catch(error) {
            res.status(500).json({
                message: "Error ao atualizar o usuário", 
                error:error.message
            });
        }
    },

    deleteUserById: async (req, res) => {
        try{
            const { id } = req.params;
            const user = await UserService.deleteUserById(req.context.models, id);
            if(!user){
                return res.status(404).json({message: "Usuário não encontrado"});
            }
            
            res.status(200).json({message: "Usuário deletado com sucesso"});
        } catch(error){
            res.status(500).json({
                message: "Erro ao deletar usuário", 
                error: error.message
            });
        }
    }
};

export default UserController;