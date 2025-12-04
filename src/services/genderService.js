const GenderService = {
    getAllGenders: async (models) => {
        const Gender = models.gender;
        const genders = await Gender.findAll();
        return genders;
    },

    getGenderById: async (models, id) => {
        const Gender = models.gender;
        const gender = await Gender.findByPk(id);
        return gender;
    },

    createGender: async (models, genderData) => {
        const Gender = models.gender;
        const { name, description } = genderData;
        
        const existingGender = await Gender.findOne({ where: { name } });
        if (existingGender) {
            return { success: false, status: 409, message: 'Gênero já existe' };
        }

        const gender = await Gender.create({
            name: name,
            description: description
        });
        return { success: true, status: 201, data: gender };
    },

    updateGenderById: async (models, id, genderData) => {
        const Gender = models.gender;
        const gender = await Gender.findByPk(id);
        if (!gender) {
            return null;
        }

        const { name, description } = genderData;
        gender.name = name || gender.name;
        gender.description = description || gender.description;
        await gender.save();
        
        return gender;
    },

    deleteGenderById: async (models, id) => {
        const Gender = models.gender;
        const gender = await Gender.findByPk(id);
        if (!gender) {
            return null;
        }

        await gender.destroy();
        return gender;
    }
}

export default GenderService;