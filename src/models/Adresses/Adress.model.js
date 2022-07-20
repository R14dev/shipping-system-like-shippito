const { Model,DataTypes } = require("sequelize");
class Adress extends Model {
  static init(sequelize){
        super.init({
            country: DataTypes.STRING,
            zip: DataTypes.STRING,
            aptsuite: DataTypes.STRING,
            alternative: DataTypes.STRING,
            phonenumber: DataTypes.STRING,
        },{
            sequelize
        })
    }
    static association (models){
        this.belongsTo(models.Users,{ foreignKey: 'id_user' , as: 'users'})
    }

}

module.exports = Adress