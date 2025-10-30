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
        imgUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
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

    book.findAllByAuthorId = async(authorId) => {
        return await book.findAll({
            where: {
                AuthorId: authorId
            }
        });
    }

    book.findAllByGenderId = async(genderId) => {
        return await book.findAll({
            where: {
                GenderId: genderId
            }
        });
    }

    return book;
};

export default getBookModel;