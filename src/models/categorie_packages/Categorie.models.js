const { Model , DataTypes} = require("sequelize");

class Categorie extends Model {
  static init(sequelize){
        super.init({
            categorie_name: DataTypes.STRING 
        },{sequelize})
    }
}
module.exports = Categorie