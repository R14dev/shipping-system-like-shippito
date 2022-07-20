const { Model,DataTypes } = require("sequelize");

class PackageDetalhes extends Model{
   static init(sequelize){
        super.init({
            description:DataTypes.STRING,
            size:DataTypes.FLOAT
        },{sequelize})
    }
    static association (models){
        this.belongsTo(models.Categorie ,{foreignKey: 'categorie_id', as:'categories'})
        this.belongsTo(models.Packages, {foreignKey:'package_id', as: 'packages'})
    }
}
module.exports = PackageDetalhes