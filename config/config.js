const { Sequelize,DataTypes,Model,Op , QueryTypes  } = require('sequelize');
const usermodel= require('../models/user.model');
const contactModel=require('../models/contact.model');

const sequelize = new Sequelize('nodetut2', 'root', 'root', {
    host: 'localhost',
    logging:false,
    dialect:'mariadb' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });
  try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  //create a object map and assign value to it and use any where in app
 const  db={};
 db.Sequelize=Sequelize;
 db.sequelize=sequelize
 db.Op=Op;
 db.QueryTypes= QueryTypes ; 
  //sync database 
  //since we import it as function we can use parameter like this and then assign it in a db obj map 
  //because we want to access it from index.js
 // db.userdetails=require('../models/user.model')(sequelize,DataTypes,Model)
  db.userdetails= usermodel(sequelize,DataTypes,Model);
  db.contact= contactModel(sequelize,DataTypes);
  //create relation between two table  
  //this mean that each user can have one contact details 
  db.userdetails.hasOne(db.contact, 
    {
    foreignKey: 'user_id'
  }
  ); // A HasOne B
  db.contact.belongsTo( db.userdetails, {
    foreignKey: 'user_id',
    as:"userDetails"  //we want it as show in json
  },
  ); // A BelongsTo B
  //this function sync all database and recrete it
  db.sequelize.sync({force:false});

  module.exports= db;