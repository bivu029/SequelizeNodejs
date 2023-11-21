const Book_user=(sequelize,DataTypes,UserdetailModel,contact)=>{
    const Book_user = sequelize.define('book_contact', {
        bookId: {
          type: DataTypes.INTEGER,
          references: {
            model: UserdetailModel, // 'Movies' would also work
            key: 'id'
          }
        },
        UserdetailModelId: {
          type: DataTypes.INTEGER,
          references: {
            model: contact, // 'Actors' would also work
            key: 'id'
          }
        }
      },{
        timestamps:false,
      }
      );
      return Book_user;
}
module.exports=Book_user;