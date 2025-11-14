import bcrypt from "bcryptjs";

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const User = req.context.models.user;
            const users = await User.findAll();
            if(!users || users.lenght == 0){
                return res.status(404).json({message: "Nenhum usurário encontrado"});
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
            const User = req.context.models.user;
            const { id } = req.params;
            const user = await User.findByPk(id);
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
            const User = req.context.models.user;
            const {name, email, password, description, profilePhotorl} = req.body;
            const user = await User.create({
                name: name,
                email: email,
                password: bcrypt.hash(password, 10),
                description: description,
                profilePhotorl: profilePhotorl
            });

            res.status(201).json({
                message: "Usuário criado com sucesso", 
                data: user
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
            const User = req.context.models.user;
            const {id} = req.params;
            const {name, email, password} = req.body;

            const user = await User.findByPk(id);
            if(!user){
                return res.status(404).json({message: "Usuário não encontrado"});
            }

            user.name = name || user.name;
            user.email = email || user.email;
            user.password = password || user.password;

            await user.save();

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
            const User = req.context.models.user;
            const { id } = req.params;

            const user = await User.findByPk(id);
            if(!user){
                return res.status(404).json({message: "Usuário não encontrado"});
            }

            await user.destroy();
            
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