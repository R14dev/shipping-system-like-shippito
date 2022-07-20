'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('shippings',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
       },
       size: {type:Sequelize.FLOAT,allowNull:false},
       price_total: {type:Sequelize.FLOAT,allowNull:false},
       status: {type:Sequelize.STRING,allowNull:false},
       user_id:{
         type:Sequelize.INTEGER,
         references:{
           model: 'users', key:'id'
         },
         onDelete:'CASCADE',
         onUpdate:'CASCADE',
       },
       id_method:{
        type:Sequelize.INTEGER,
        references:{
          model: 'method_shipping', key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
       },
       pg_id:{
        type:Sequelize.STRING,
      },
      adress_id:{
          type:Sequelize.INTEGER,
          references:{
            model: 'adresses', key:'id'
          },
          onDelete:'CASCADE',
          onUpdate:'CASCADE',
        },
        tracker:{
          type:Sequelize.STRING
        },
       created_at:{ type:Sequelize.DATE,allowNull:false},
       updated_at:{ type:Sequelize.DATE,allowNull:false}
    })
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.dropTable('shippings')
  }
};
