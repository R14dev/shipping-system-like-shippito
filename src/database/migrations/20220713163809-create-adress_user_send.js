'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('adresses',{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_user:{
        type:Sequelize.INTEGER,
        references: {model:'users' , key:'id'},
        onUpdate:'CASCADE',
        onDelete: 'CASCADE'
      },
      country:{ type:Sequelize.STRING,allowNull:false},
      aptsuite: {type:Sequelize.STRING,allowNull:false},
      alternative:{type:Sequelize.STRING,allowNull:false},
      zip: {type:Sequelize.STRING,allowNull:false},
      phonenumber:{ type:Sequelize.STRING,allowNull: false},
      created_at:{ type:Sequelize.DATE,allowNull:false},
      updated_at:{ type:Sequelize.DATE,allowNull:false}

    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('adresses')
  }
};
