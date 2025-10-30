import models from "../models/index.js"

const Gender = models.gender

const getAllGenders = async (req, res) => {
    try{
        const gender = await Review.findAll();
        if(!gender || gender.lengh == 0){
            return res.status(404).jason({message: "Nenhum genero encontrado"});
        }

        res.status(200).json({
            message: "Gênero encontrado com sucesso", 
            data: gender
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar gênero", 
            error: error.message
        });
    }
}

const getGenderById = async (req, res) => {
    try { 
        const {id} = req.params;
        const gender = await Gender.findByPk(id);
        if(!gender){
            return res.status(404).json({message: "Gênero não encontrado"})
        }

        res.status(200).json({
            message: "Gênero encontrado com sucesso", 
            data: gender
        });
    } catch(error) {
        res.status(500).json({
            message: "Erro ao encontrar gênero", 
            error: error.message
        });
    }
}

const createGender = async (req, res) => {
    try {
        const {name} = req.body;
        const gender = await Gender.findOne({
            where: {name}
        });
        if (gender){
            return res.status(409).json({message: "Gênero já existe"});
        }

        const newGender = await Gender.create({name});

        res.status(201).json({
            message: "Gênero criado com sucesso",
            data: newGender
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao criar gênero",
            error: error.message
        });
    }
}

const updateGenderById = async (req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        const gender = await Gender.findByPk(id);
        if(!gender){
            return res.status(404).json({message: "Gênero não encontrado"})
        }

        gender.name = name || gender.name;
        await gender.save();

        res.status(200).json({
            message: "Gênero atualizado com sucesso",
            data: gender
        });
    } catch(error) {
        res.status(500).json({
            message: "Erro ao atualizar gênero",
            error: error.message
        });
    }
}

const deleteGenderById = async (req, res) => {
    try {
        const {id} = req.params;
        const gender = await Gender.findByPk(id);
        if(!gender){
            return res.status(404).json({message: "Gênero não encontrado"})
        }

        await gender.destroy();

        res.status(200).json({
            message: "Gênero deletado com sucesso"
        });
    } catch(error) {
        res.status(500).json({
            message: "Erro ao deletar gênero",
            error: error.message
        });
    }
}

export {
    getAllGenders,
    getGenderById,
    createGender,
    updateGenderById,
    deleteGenderById
}