const getGenderModel = (sequelize, {DataTypes}) => {
    const gender = sequelize.define ("Gender", {
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
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });

    gender.associate = (models) =>{
        gender.hasMany (models.book, {onDelete: "CASCADE"});
    };
    return gender;
};

export default getGenderModel;