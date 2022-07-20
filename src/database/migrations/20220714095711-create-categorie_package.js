
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('categories',{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      categorie_name:{type:Sequelize.STRING,allowNull:false},
      created_at:{ type:Sequelize.DATE,allowNull:false},
      updated_at:{ type:Sequelize.DATE,allowNull:false}

    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('categories')
  }
};
