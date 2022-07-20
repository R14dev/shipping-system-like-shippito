'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('package_detalhes',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
      },
      package_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'packages',
          key: 'id',
          onDelete:'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
      categorie_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:'categories' , 
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete: 'CASCADE',
      },
      description:{
        type: Sequelize.STRING,
        allowNull:false
      },
      size:{
        type:Sequelize.FLOAT,
        allowNull:false
      },
      created_at:{ type:Sequelize.DATE,allowNull:false},
      updated_at:{ type:Sequelize.DATE,allowNull:false}
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('package_detalhes')
  }
};