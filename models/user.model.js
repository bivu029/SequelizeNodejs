
const usermodel= (sequelize,DataTypes,Model)=>{
  //ist way
class UserdetailModel extends Model {}

UserdetailModel.init({
// Model attributes are defined here
firstName: {
  type: DataTypes.STRING,
 // allowNull: false,
 // defaultValue:"bkpk"
  
},
lastName: {
  type: DataTypes.STRING
  // allowNull defaults to true
}
}, {
// Other model options go here
sequelize, // We need to pass the connection instance
//   modelName: 'Userdetail234' // We need to choose the model name
tableName:'userdetail'
});
return UserdetailModel;
}

module.exports=usermodel;


