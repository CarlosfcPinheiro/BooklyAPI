const getFavoriteModel = (sequelize, {DataTypes}) => {
    const favorite = sequelize.define ("Favorite", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true,
            },
        }
    });

    favorite.associate = (models) =>{
        favorite.belongsTo(models.book);
        favorite.belongsTo(models.user);
    };

    favorite.findAllByUserId = async(userId) => {
        return await favorite.findAll({
            where: { UserId: userId },
            include: ["Book"]
        });
    }

    favorite.findByUserAndBook = async(userId, bookId) => {
        return await favorite.findOne({
            where: { UserId: userId, BookId: bookId }
        });
    }

    return favorite;
};

export default getFavoriteModel;