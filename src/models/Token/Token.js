const { Model, DataTypes } = require("sequelize");

class Token extends Model{
    static init(sequelize){
        super.init({
            token:DataTypes.INTEGER,
            refreshtoken:DataTypes.STRING,
            device:DataTypes.STRING
        },{sequelize})
    }
    static association (model){
        this.belongsTo(model.Users,{foreignKey:'user_id',as:'Users'})
    }
}
module.exports = Token;