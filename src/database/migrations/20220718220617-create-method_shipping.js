'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('method_shipping',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
       },
        name:{
          type:Sequelize.STRING,
          allowNull: false
        },
       created_at:{ type:Sequelize.DATE,allowNull:false},
       updated_at:{ type:Sequelize.DATE,allowNull:false}
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('method_shipping')
  }
};
