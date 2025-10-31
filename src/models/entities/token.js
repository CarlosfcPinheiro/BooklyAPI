const getTokenModel = (sequelize, {DataTypes}) => {
    const token = sequelize.define ("Token", {
        id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true,
            },
        },
    });
    return token;
};

export default getTokenModel;