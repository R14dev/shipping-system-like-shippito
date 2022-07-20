'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('ivoices',{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references: {model:'users' , key:'id'},
        onUpdate:'CASCADE',
        onDelete: 'CASCADE'
      },
      package_id:{
        allowNull: true,
        type:Sequelize.INTEGER,
        references: {model:'packages' , key:'id'},
        onUpdate:'CASCADE',
        onDelete: 'CASCADE'
      },
      assosiation:{type:Sequelize.STRING,allowNull:true},
      method:{type:Sequelize.STRING,allowNull: false},
      amount:{type:Sequelize.FLOAT,allowNull:false},
      status: {type:Sequelize.STRING,allowNull:false},
      created_at:{ type:Sequelize.DATE,allowNull:false},
      updated_at:{ type:Sequelize.DATE,allowNull:false}

    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('ivoices')
  }
};
