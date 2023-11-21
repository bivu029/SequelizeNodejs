const express = require('express')
const app = express()
require('./config/config')
var bodyParser = require('body-parser')
const userdetailcontroller= require('./controller/userdetail.controller');



//const {Userdetail,Userdetail2} = require('./models/user.model')
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(bodyParser.json());
app.get('/user' ,userdetailcontroller.getuserHandler );
app.get('/user/:id' , userdetailcontroller.getuserIdHandler);
app.post('/' ,userdetailcontroller.addUserdetailcontroller);
app.delete('/',userdetailcontroller.deletAllHandler);
app.delete('/:id',userdetailcontroller.deletByIdHandler);
app.patch('/:id',userdetailcontroller.updateUserbyId);
app.post('/query' ,userdetailcontroller.queryuserInserHandler );
app.get('/querybyname' ,userdetailcontroller.queryuserHandler );
app.get('/querybyname2' ,userdetailcontroller.queryuserInserHandlerSecond );
app.get('/rawquery' ,userdetailcontroller.rawQueryHandler);
app.get('/rawqueryuser' ,userdetailcontroller.rawqueruserHander);
app.post('/asso',userdetailcontroller.assoCreatHandler);
app.get('/asso',userdetailcontroller.assoGetHandler);
app.get('/assoRev',userdetailcontroller.assoGetReHandler);
app.get('/assoMany',userdetailcontroller.assoGetManyHandler);
app.get('/assoManytoMany',userdetailcontroller.assoGetManytomanyHandler);
app.get('/assoRevManytoMany',userdetailcontroller.assoGetReManytoManyHandler);


// app.get('/getset' ,userdetailcontroller.queryuserHandler );
//this function will create table if not exist
// Userdetail.sync();
//this function will create table if not exist and delet previous same name table
//  Userdetail.sync({ force: true });
//  Userdetail2.sync({force:true});
 //Userdetail.drop();
console.log("The table for the User model was just (re)created!");


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))