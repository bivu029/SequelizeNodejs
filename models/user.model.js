const bcrypt = require('bcrypt');
const usermodel= (sequelize,DataTypes,Model)=>{
  //ist way
class UserdetailModel extends Model {}

UserdetailModel.init({
// Model attributes are defined here
firstName: {
  type: DataTypes.STRING,
 // allowNull: false,
 // defaultValue:"bkpk"
 //use getter for extra functionality like uppercase
 get() {
  const rawValue = this.getDataValue('firstName');
  return rawValue ? rawValue.toUpperCase() : null;
}
  
},
lastName: {
  type: DataTypes.STRING
  // allowNull defaults to true
},
//this virtual not store in data base but proccess in real time and show in response
fullName: {
  type: DataTypes.VIRTUAL,
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(value) {
    throw new Error('Do not try to set the `fullName` value!');
  }
},
password: {
  type: DataTypes.STRING,
  set(value) {
    // Storing passwords in plaintext in the database is terrible.
    // Hashing the value with an appropriate cryptographic hash function is better.
    const hashedPassword = bcrypt.hashSync(value, 10);
    this.setDataValue('password', hashedPassword);
  }
}
}, {
// Other model options go here
sequelize, // We need to pass the connection instance
//   modelName: 'Userdetail234' // We need to choose the model name
tableName:'userdetail',
timestamps:false,
paranoid:true,
deletedAt: 'destroyTime'
});
return UserdetailModel;
}

module.exports=usermodel;


