
const bookModel= (sequelize,DataTypes)=>{
    const BookModel= sequelize.define('book',{
        bookName:{
            type:DataTypes.STRING
        }
    },{
        tableName:'book',
        timestamps:false,
    });
    return BookModel;
}
module.exports=bookModel;