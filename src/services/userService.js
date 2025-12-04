import bcrypt from "bcryptjs";

const UserService = {
    getAllUsers: async (models) => {
        const User = models.user;
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        return users;
    },

    getUserById: async (models, id) => {
        const User = models.user;
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        return user;
    },

    createUser: async (models, userData) => {
        const User = models.user;
        const { name, email, password, description, profilePhotorl } = userData;
        
        const existingUser = await User.scope('withPassword').findOne({ where: { email } });
        if (existingUser) {
            return { success: false, status: 409, message: 'Usuário já existe com este email' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            description: description,
            profilePhotorl: profilePhotorl
        });
        
        return { success: true, status: 201, data: user };
    },

    updateUserById: async (models, id, userData) => {
        const User = models.user;
        const user = await User.scope('withPassword').findByPk(id);
        if (!user) {
            return null;
        }

        const { name, email, password, description, profilePhotorl } = userData;
        user.name = name || user.name;
        user.email = email || user.email;
        user.description = description || user.description;
        user.profilePhotorl = profilePhotorl || user.profilePhotorl;
        
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        
        await user.save();
        
        // Retornar sem o password
        const updatedUser = await User.findByPk(id);
        return updatedUser;
    },

    deleteUserById: async (models, id) => {
        const User = models.user;
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }

        await user.destroy();
        return user;
    }
}

export default UserService;