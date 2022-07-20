const { Model, DataTypes } = require("sequelize");


class method extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING
        },{sequelize})
    }
}

module.exports = method