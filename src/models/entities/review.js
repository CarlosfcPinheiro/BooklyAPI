/* 
atributos para essa entidade
id, userId, bookId, rate, comment, date

seguir padrão semelhante as entidades author, book, gender.

*/
const getReviewModel = (sequelize, {DataTypes}) => {
    const review = sequelize.define ("Review", {
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
        rate: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },
    });
    
    review.associate = (models) => {
        review.belongsTo(models.user);
        review.belongsTo(models.book);
    }

    return review;
}

export default getReviewModel;