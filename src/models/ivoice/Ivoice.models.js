const { Model,DataTypes } = require("sequelize");
class Ivoice extends Model {
  static  init(sequelize){
        super.init({
            method: DataTypes.STRING,
            amount:DataTypes.FLOAT,
            status:DataTypes.STRING
        },{sequelize})
    }
    static association (models){
        this.belongsTo(models.Packages ,{foreignKey: 'package_id', as:'packages'})
        this.belongsTo(models.Users, {foreignKey:'user_id', as: 'Users'})
    }
}
module.exports = Ivoice;