const CarModel= (sequelize,DataTypes)=>{
    const Car= sequelize.define('car',{
        carName:{
            type:DataTypes.STRING
        },

    },{
        // Other model options go here
      tableName:'car',
       timestamps:false,
    //    createdAt:false,
    //    updatedAt:'updateTime'
    
    });
    return Car;
}
module.exports= CarModel;