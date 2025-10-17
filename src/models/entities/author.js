const getAuthorModel = (sequelize, {DataTypes}) => {
    const author = sequelize.define("Author",{
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
        nationality: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });

    author.associate = (models) => {
        author.hasMany (models.book, {onDelete:"CASCADE"});
    };
    return author;
};

export default getAuthorModel;