const { Sequelize,DataTypes,Model,Op , QueryTypes  } = require('sequelize');
const usermodel= require('../models/user.model');
const contactModel=require('../models/contact.model');
const bookModel= require('../models/books.model');
const Book_user= require('../models/bookandUser');
const Employee= require('../models/employee.model');
const Car= require('../models/car.model');
const CarModel = require('../models/car.model');

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
  db.book=bookModel(sequelize,DataTypes);
  db.Book_user=Book_user(sequelize,DataTypes,db.userdetails,db.contact);
  db.employee=Employee(sequelize,DataTypes,Model);
  db.car= CarModel(sequelize,DataTypes)
  //create relation between two table  
  //this mean that each user can have many contact details  
  db.userdetails.hasMany(db.contact, 
    {
    foreignKey: 'user_id'
  }
  ); // A HasOne B
  db.contact.belongsTo( db.userdetails, {
    foreignKey: 'user_id',
    as:"userDetails"  //we want it as show in json
  },
  ); // A BelongsTo B
  ///many to many
  db.book.belongsToMany(db.userdetails, { through: db.Book_user , as:"userDetails"});
  db.userdetails.belongsToMany(db.book, { through: db.Book_user });
  //this function sync all database and recrete it
  db.employee.hasMany(db.car); //EmployeeId automatically created in car table
  db.car.belongsTo(db.employee);
  db.employee.hasMany(db.contact);
  db.contact.belongsTo(db.employee)
  ///direct asso save /// this for nothing but eployee controller
  db.carEmployee= db.employee.hasMany(db.car);//employee can have many car
  db.contactEmployee=db.employee.hasMany(db.contact); //emplye can have many contacts
  db.sequelize.sync({force:true
  });

  module.exports= db;