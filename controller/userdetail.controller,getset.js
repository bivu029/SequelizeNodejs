const db = require("../config/config");
const Userdetail = db.userdetails;
const sequelize=db.sequelize;

const getterUserHandler=async (req, res) => {
    try {
      const data = await Userdetail.findAll({});
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      
    }
  };
