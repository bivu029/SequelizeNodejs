const db = require("../config/config");
const Userdetail = db.userdetails;
const Contact = db.contact;
const sequelize = db.sequelize;
const QueryTypes = db.QueryTypes;

const addUserdetailcontroller = async (req, res) => {
  try {
    var istrue = false;
    const data = req.body;
    //check data is array format or not
    //if data is not array format  then we check if data exist or not
    // if data is in array format then we just pass istrue = false
    // and implement later
    //Array.isArray(data) this method check if data array or not
    if (!Array.isArray(data)) {
      istrue = await isUserexist(data.firstName);
    } else {
      istrue = false;
    }
    if (istrue) {
      res.status(409).send(Error("ERROR").message);
      console.log("user already exist");
    } else {
      if (Array.isArray(data)) {
        //this method use for add multiple data as array format

        const adduser = await Userdetail.bulkCreate(data);
        console.log(`${data.length} user  created`);
        res.status(200).send(adduser);
      } else {
        //this method only insert data as obj map format not array
        const adduser = await Userdetail.create(data);
        console.log("user  created");
        res.status(200).send(adduser.toJSON());
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
const getuserHandler = async (req, res) => {
  try {
    const data = await Userdetail.findAll({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const getuserIdHandler = async (req, res) => {
  try {
    const data = await Userdetail.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const deletAllHandler = async (req, res) => {
  try {
    const data = await Userdetail.destroy({
      where: {},
      // truncate: true
    });
    console.log("all user deleted");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const deletByIdHandler = async (req, res) => {
  var isuseridexist = await isUserByIdExist(req.params.id);
  try {
    if (isuseridexist) {
      const data = await Userdetail.destroy({
        where: {
          id: req.params.id,
        },
        // truncate: true
      });
      console.log("user deleted");
      res.status(200).json(data);
    } else {
      console.log("no such exist");
      res.status(200).json("no such user exist");
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUserbyId = async (req, res) => {
  let updataData = req.body;
  const data = await Userdetail.update(updataData, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data });
};

const queryuserInserHandler = async (req, res) => {
  const data = req.body;
  //only insert in firstname field and all other field will be null
  //allownull should be false
  const result = await Userdetail.create(data, { fields: ["firstName"] });
  res.status(200).json(result);
};
const queryuserHandler = async (req, res) => {
  //only get in firstname and lastName field and all other field will not return
  const result = await Userdetail.findAll({
    attributes: [
      "id",
      "firstName",
      "lastName",
      //this function check  total no of id in table and return as id:no
      //note : this fucntion only return one value
      [sequelize.fn("COUNT", sequelize.col("id")), "count"],
    ],
  });
  //if we want change table name in response
  //firsName=>first_name
  //const result = await Userdetail.findAll({ attributes: [['firstName','first_name'],'lastName'] });
  res.status(200).json(result);
};
const queryuserInserHandlerSecond = async (req, res) => {
  // brfore funtion we saw only get in firstname and lastName field and all other field will not return
  //we can do it by include fucntion for extra field
  const result = await Userdetail.findAll({
    attributes: {
      //this function exclude last name
      //note : this fucntion only return one value
      exclude: ["lastName"],
      //this function include any thing in response
      include: [[sequelize.fn("COUNT", sequelize.col("id")), "count"]],
    },
  });
  //if we want change table name in response
  //firsName=>first_name
  //const result = await Userdetail.findAll({ attributes: [['firstName','first_name'],'lastName'] });
  res.status(200).json(result);
};

const rawQueryHandler = async (req, res) => {
  const result = await sequelize.query("SELECT * FROM `Userdetail`", {
    type: QueryTypes.SELECT,
    //if you want output as model in userdetail controller
    //write this
    model: Userdetail,
    mapToModel: true, // pass true here if you have any mapped fields
  });
  res.status(200).json(result);
};

const rawqueruserHander = async (req, res) => {
  const result = await sequelize.query(
    "SELECT * FROM Userdetail where id =:id",
    {
      replacements: { id: "13" },
      type: QueryTypes.SELECT,
    }
  );
  res.status(200).json(result);
};

////one to one
//create two  table link two table
const assoCreatHandler = async (req, res) => {
  const { userdetail, address } = req.body;

  const data = await Userdetail.create(userdetail);
  if (data && data.id) {
    address["user_id"] = data.id
    console.log(address);
    await Contact.create(address);
    res.status(200).send("data successfully iserted");
  }
};

//get data from two table
//user and contact
const assoGetHandler = async (req, res) => {
  const data = await Userdetail.findAll({
    attributes: {
      exclude: ["fullName"],
    },
    //we can also get data  from contact table and search query
    include: [
      {
        model: Contact,
        attributes: {
          exclude: ["UserdetailModelId", "user_id"],
        },
        // where:{
        //   current_address:"abc"
        // }
      },
    ],
    //u can also use where
    // where:{
    //   id:2
    // }
  });
  res.status(200).send(data);
};
//reverse order
const assoGetReHandler = async (req, res) => {
  const data = await Contact.findAll({
    attributes: {
      exclude: ["UserdetailModelId", "user_id"],
    },
    //we can also get data  from contact table and search query
    include: [
      {
        model: Userdetail,
        as:"userDetails", //just like in config.js file we need to write here 
        attributes: {
          exclude:["fullName"],
        },
        // where:{
        //   current_address:"abc"
        // }
      },
    ],
    //u can also use where
    // where:{
    //   id:2
    // }
  });
  res.status(200).send(data);
};
///////////////one to many//////////////////
const assoGetManyHandler = async (req, res) => {
  const data = await Userdetail.findAll({
    attributes: {
      exclude: ["fullName"],
    },
    //we can also get data  from contact table and search query
    include: [
      {
        model: Contact,
        attributes: {
          exclude: ["UserdetailModelId", "user_id"],
        },
        // where:{
        //   current_address:"abc"
        // }
      },
    ],
    //u can also use where
    // where:{
    //   id:2
    // }
  });
  res.status(200).send(data);
};


const isUserexist = async (firstName) => {
  var istrue = false;
  const data = await Userdetail.findOne({
    where: {
      firstName: firstName,
    },
  });
  if (data != null) {
    return (istrue = true);
  }
  return istrue;
};

const isUserByIdExist = async (id) => {
  var istrue = false;
  const data = await Userdetail.findOne({
    where: {
      id: id,
    },
  });
  if (data != null) {
    return (istrue = true);
  }
  return istrue;
};
module.exports = {
  addUserdetailcontroller,
  getuserHandler,
  getuserIdHandler,
  deletAllHandler,
  deletByIdHandler,
  updateUserbyId,
  queryuserInserHandler,
  queryuserHandler,
  queryuserInserHandlerSecond,
  rawQueryHandler,
  rawqueruserHander,
  assoCreatHandler,
  assoGetHandler,
  assoGetReHandler,
  assoGetManyHandler
};
