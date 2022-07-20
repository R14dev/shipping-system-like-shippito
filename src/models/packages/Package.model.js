const { Model,DataTypes } = require("sequelize");
class Packages extends Model{
  static init(sequelize){
     super.init({
        price_package: DataTypes.FLOAT,
        status:DataTypes.STRING
     },{sequelize})
    }
   static association(models){
        this.belongsTo(models.Users,{foreignKey: 'id_user' ,as:'users'});
    }
}

module.exports = Packages