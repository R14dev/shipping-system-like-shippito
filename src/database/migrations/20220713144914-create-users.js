'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users',{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
        allowNull:false
      },
      nome:{
        type:Sequelize.STRING,
        allowNull:false
      },
      adress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      token:{ type: Sequelize.STRING,allowNull:false},
      email:{
        type: Sequelize.STRING,
        allowNull:false
      },
      password:{
        type:Sequelize.STRING,
        allowNull: false
      },
      phone_number:{
        type:Sequelize.STRING,
        allowNull:false
      },
      created_at:{ type:Sequelize.DATE,allowNull:false},
      updated_at:{ type:Sequelize.DATE,allowNull:false}

    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users')
  }
};
