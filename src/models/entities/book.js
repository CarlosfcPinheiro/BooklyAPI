const getBookModel = (sequelize, {DataTypes}) => {
    const book = sequelize.define ("Book", {
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
        title: {
            type: DataTypes.STRING(122),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        year: {
            type:DataTypes.SMALLINT,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        genderId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    book.associate = (models) =>{
        book.belongsTo (models.author, {foreignKey: "authorId"});
    };

    book.associate = (models) =>{
        book.belongsTo (models.gender, {foreignKey: "genderId"});
    };
    return book;
};

export default getBookModel;