const emplyeeModel=(sequelize,DataTypes,Model)=>{
    //ist way
  class Employee extends Model {}
  
  Employee.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
 
    
  },
  job: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  //this virtual not store in data base but proccess in real time and show in response
  
  }, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  //   modelName: 'Userdetail234' // We need to choose the model name
  //tableName:'userdetail',
  paranoid: true,  ///it check before data deletd


  // If you want to give a custom name to the deletedAt column
  deletedAt: 'destroyTime',
 
  });
  return Employee;
  }
module.exports= emplyeeModel;