
const contactModel= (sequelize,DataTypes)=>{
    const ContactModel= sequelize.define('contact',{

        paramanent_address:{
            type:DataTypes.STRING
        },
        current_address:{
            type:DataTypes.STRING
        },
        user_id:{   //we dont need it when using many to many
            type:DataTypes.INTEGER
        },
    },{
        // Other model options go here
      tableName:'contact',
       timestamps:false,
    //    createdAt:false,
    //    updatedAt:'updateTime'
    
    });
    //console.log(Contact === sequelize.models.contact);
    return ContactModel;
}
module.exports= contactModel;