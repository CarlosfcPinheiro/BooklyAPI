import GenderService from "../services/genderService.js";

const GenderController = {
    getAllGenders: async (req, res) => {
        try{
            const genders = await GenderService.getAllGenders(req.context.models);
            if(!genders || genders.length == 0){
                return res.status(204).json({message: "Nenhum gênero encontrado"});
            }

            res.status(200).json({
                message: "Gênero encontrado com sucesso", 
                data: genders
            });
        } catch (error) {
            res.status(500).json({
                message: "Erro ao buscar gênero", 
                error: error.message
            });
        }
    },

    getGenderById: async (req, res) => {
        try { 
            const {id} = req.params;
            const gender = await GenderService.getGenderById(req.context.models, id);
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
    },

    createGender: async (req, res) => {
        try {
            const result = await GenderService.createGender(req.context.models, req.body);
            
            if (!result.success) {
                return res.status(result.status).json({ message: result.message });
            }

            res.status(201).json({
                message: "Gênero criado com sucesso",
                data: result.data
            });
        } catch (error) {
            res.status(500).json({
                message: "Erro ao criar gênero",
                error: error.message
            });
        }
    },

    updateGenderById: async (req, res) => {
        try {
            const {id} = req.params;
            const gender = await GenderService.updateGenderById(req.context.models, id, req.body);
            if(!gender){
                return res.status(404).json({message: "Gênero não encontrado"})
            }

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
    },

    deleteGenderById: async (req, res) => {
        try {
            const {id} = req.params;
            const gender = await GenderService.deleteGenderById(req.context.models, id);
            if(!gender){
                return res.status(404).json({message: "Gênero não encontrado"})
            }

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
};

export default GenderController;