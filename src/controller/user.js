import models from "../models/index.js"

const User = models.user;

const getAllUsers = async (req, res) => {
    try {
        const users = await Review.findAll();
        if(!users || users.lenght == 0){
            return res.status(404).json({message: "Nenhum usurário encontrado"});
        }

        res.status(200).json({message: "Usuários encontrados com sucesso", data: users});

    } catch(error) {
        res.status(500).json({message: "Erro ao buscar reviews", error: error.message});
    }
};

const getUserById = async (req, res) => {
    try {const { id } = req.params;
    const user = await User.findByPk(id);
    if(!user){
        return res.status(404).json({message: "Usuário não encontrado"});
    }

    res.status(200).json({message: "Usuario encontrado com sucesso", data: user});

    }catch(error) {
        res.status(500).json({message: "Erro ao encontrar o usuário", error: error.message});
    }

};

const createUser = async (req, res) => {
    try{
        const {id, name, email, password} = req.body;
        const user = await User.create({
            id,
            name,
            email,
            password
        })

        res.status(201).json({message: "Usuário criado com sucesso", data: user});
        
    }catch (error){
        res.status(500).json({message: "Erro ao criar um usuário", error: error.message});
    }
};

const updateUserById = async (req, res) => {
    try {
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

        res.status(200).json({message: "Usuário atualizado com sucesso", data: user});

    }catch(error) {
        res.status(500).json({message: "Error ao atualizar o usuário", error:error.message});
    }
};

const deleteUserById = async (req, res) => {
    try{
        const { id } = req.params;

        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({message: "Usuário não encontrado"});
        }

        await user.destroy();
        
        res.status(200).json({message: "Usuário deletado com sucesso"});

    } catch(error){
        res.status(500).json({message: "Erro ao deletar usuário", error: error.message});
    }

};

export {getAllUsers, getUserById, createUser, updateUserById, deleteUserById}