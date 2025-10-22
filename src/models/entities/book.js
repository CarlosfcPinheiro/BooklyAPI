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
        }
    });

    book.associate = (models) =>{
        book.belongsTo(models.author);
        book.belongsTo(models.gender);

        book.hasMany(models.review, {onDelete: "CASCADE"});
    };

    return book;
};

export default getBookModel;