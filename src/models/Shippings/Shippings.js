const { Model, DataTypes } = require("sequelize");

class Shippings extends Model {
    static init(sequelize){
        super.init({
            size: DataTypes.FLOAT,
            status: DataTypes.STRING,
            tracker:DataTypes.STRING,
            pg_id:DataTypes.STRING,
            price_total: DataTypes.FLOAT
        },{sequelize})
    }
    static association (model){
        this.hasMany(model.Users,{foreignKey: 'user_id', as:'users'})
        this.belongsTo(model.method,{foreignKey:'id_method',as:"method_shipping"})
        this.belongsTo(model.Adress,{foreignKey: 'adress_id', as:'adresses'})
    }
}
module.exports = Shippings