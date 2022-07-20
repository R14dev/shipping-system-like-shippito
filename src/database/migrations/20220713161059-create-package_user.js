'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.createTable('packages',{
     id:{
       type: Sequelize.INTEGER,
       primaryKey:true,
       autoIncrement:true
     },
     id_user:{
       type:Sequelize.INTEGER,
       references: { model:'users' , key: 'id' },
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE'
     },
     price_package:{type:Sequelize.FLOAT,allowNull:false},
     status:{
       type: Sequelize.STRING,
       allowNull: false
     },
     created_at:{ type:Sequelize.DATE,allowNull:false},
     updated_at:{ type:Sequelize.DATE,allowNull:false}
   })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('packages')
  }
};
