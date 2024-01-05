const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config ZZ");
const bycrypt = require("bcrypt");

class User extends Model {
    checkPassword(loginPw) {
        return bycrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
            unique: true,
        },
        passwrod: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [5] },
        },
    },

    {
        hooks:{
            async beforeCreate(newUserData) {
                newUserData.password = await bycrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bycrypt.hash(
                    updatedUserData.password,
                    10
                );
                return updatedUserData;
            },
        },
        sequelize,

        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
);

module.exports = User;