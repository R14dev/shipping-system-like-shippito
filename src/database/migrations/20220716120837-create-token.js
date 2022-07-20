'use strict';

const SqlString = require("mysql/lib/protocol/SqlString");

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.createTable('tokens',{
     id:{
       type:Sequelize.INTEGER,
       primaryKey:true,
       autoIncrement:true,
       allowNull: false
      },
      user_id:{
        type:Sequelize.INTEGER,
        references:{
          model: 'users', key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      },
      token:{
        type:Sequelize.DATE,
        allowNull:false
      },
      refreshtoken:{type:Sequelize.STRING,allowNull:false},
      device:{ type:Sequelize.STRING},
      created_at:{ type:Sequelize.DATE,allowNull:false},
      updated_at:{ type:Sequelize.DATE,allowNull:false}
   })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('tokens')
  }
};
