// atributos para essa entidade
/*
id, name, email, password

seguir padrão semelhante as entidades author, book, gender.
*/
//TODO adicionar campo de descricao e foto de perfil
const getUserModel = (sequelize, {DataTypes}) => {
    const user = sequelize.define ("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true,
            },
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        profilePhotoUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });
    
    user.associate = (models) => {
        user.hasMany(models.review, { onDelete: "CASCADE" });
        user.hasMany(models.favorite, { onDelete: "CASCADE" });
    }

    return user;
}

export default getUserModel;