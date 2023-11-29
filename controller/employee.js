const db = require("../config/config");
const Employee= require('../models/employee.model');
const employee = db.employee;
const car = db.car;
const contact=db.contact

const sequelize = db.sequelize;

const emplpyeecreateHandler = async (req, res) => {
  try {
    const data = await employee.create(req.body);
    res.status(200).json(data);
    console.log("successfully inserted");
  } catch (error) {
    console.log(error);
  }
};
const emplpyeefindHandler = async (req, res) => {
  try {
    const data = await employee.findAll({
      attributes: {
        exclude: ["destroyTime"],
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const emplpyeeDeletHandler = async (req, res) => {
  try {
    const data = await employee.destroy({
      where: {
        id: 1,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const emplpyeRestoreHandler = async (req, res) => {
  try {
    const data = await employee.restore({
      id: 1,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

///lazy loading///
//save data with regular method
const lazyLoding = async (req, res) => {
  const { employees, cars ,contacts} = req.body;
  try {
    const data = await employee.create(employees);
    if (data && data.id) {
      cars["EmployeeId"] = data.id; //this employee id autometically create as foregn key in car table when using association
      await car.create(cars);
      if (Array.isArray(contacts)) {
         contacts.forEach(element => {
          element["EmployeeId"]=data.id
        
          
        });
        await  contact.bulkCreate(contacts);
        
      } else {
        contacts["EmployeeId"]=data.id;
        await contact.create(contacts);
        
      }
      console.log("employye and car created");

      res.status(200).json({ data: "employye and car created" });
    } else {
      console.log("no emplyee created");
      res.status(200).json({ data: " cant crete employee" });
    }
  } catch (error) {
    console.log(error);
  }
};
//ssave data with association method
const createAsso = async (req, res) =>{
  const { employees, cars ,contacts} = req.body;
  try {
    
    const data= await employee.create(req.body,{
      include:[car,contact]  //include:[db.carEmployee, db.contactEmployee] this is also work
    });
    console.log("employye and car created");

    res.status(200).json({ data: data });

  } catch (error) {
    console.log(error);
  }

}

//get lazy loading
const getlazyLoding = async (req, res) => {
  try {
    const data = await employee.findOne({
      attributes: {
        exclude: ["destroyTime"],
      },
    //  include:car, //if we include this in model then it is egar loading 
     where:{
      id:1
     }
    });
    console.log(data instanceof employee); 
    const cardata= await data.getCars(); //this getcars method only work for findone
    res.status(200).json({"data":data,"car":cardata});
  } catch (error) {
    console.log(error);
  }
};

//eagar loading //
const geteagrLoding = async (req, res) => {
  try {
    const data = await employee.findAll({
      attributes: {
        exclude: ["destroyTime"],
      },
      include:[
        {
          model:car,
        
          attributes: {
            exclude: ["EmployeeId"],
          },
        },
        {
          model:contact
        }
      ], //if we include this in model then it is egar loading 
    //  where:{
    //   id:1
    //  }
    });
   
  
    res.status(200).json({"data":data});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  emplpyeecreateHandler,
  emplpyeeDeletHandler,
  emplpyeefindHandler,
  emplpyeRestoreHandler,
  lazyLoding,
  getlazyLoding,
  geteagrLoding ,
  createAsso
};
