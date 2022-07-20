const { Model, DataTypes } = require("sequelize");

class Users extends Model {
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            adress: DataTypes.STRING,
            token: DataTypes.STRING,
            phone_number: DataTypes.STRING
        },
        {sequelize}
        )
    }
}
module.exports = Users;