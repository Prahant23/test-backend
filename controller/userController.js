const Users=require('../model/userModel');
const jwt=require('jsonwebtoken');

//1 st ma controller then / model / then routes/ then index
// making all the required functions
const createUser = async (req, res) => {
    //Step 1: Check if data is coming or not
    console.log(req.body);
   
    //Step 2 : Destructure the data
    const { firstName, lastName, email, password } = req.body;
   
    //Step 3 : validate the incoming data
    if (!firstName || !lastName || !email || !password) {
      return res.json({
        success : false,
        message : "Please enter all fields."
      });
    }

    //step 4 : try catch block
    try {
      //Step 5 : check exisiting user
      const exisitingUser = await Users.findOne({ email: email });
      if (exisitingUser) {
        return res.json({
          success : false,
          message: "User already exixts"
        });
      }
   
     
      //Step 6 : Create new user
      const newUser = new Users({
        //Fieldname : incoming data name
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      //Step 7 : Save user and response
      await newUser.save();
      res.status(200).json(
        {
          success : true,
          message: "User created successfully."
        }
      );
    } catch (error) {
      res.status(500).json("Server Error");
    }
  };
  const loginUser = async (req, res) => {
    //Step 1 : Check if data is coming or not
    console.log(req.body);
   
    //Step 2 : Destructure the data
    const { email, password } = req.body;
   
    //Step 3 : validate the incoming data
    if (!email || !password) {
      return res.json({
        success : false,
        message : "Please enter all fields."
      });
    }
   
    //Step 4 : try catch block
    try {
      //Step 5 : check exisiting user
      const exisitingUser = await Users.findOne({ email: email });
      if (!exisitingUser) {
        return res.json({
          success : false,
          message: "User does not exixts"
        });
      }
      if (!password) {
        return res.json({
          success : false,
          message: "Invalid credentials"
        });
      }

      //  Step 7 : Create token
      const token = await jwt.sign(
        { id: exisitingUser._id },
        process.env.JWT_SECRET
      );
      //Step 8 : Response
      res.status(200).json({
        success : true,
        message: "User logged in successfully.",
        token: token,
        userData: exisitingUser,
      });
    } catch (error) {
      res.json({
        success : false,
        message: "Server Error",
      });
      }
    };

  module.exports = {
    createUser,
    loginUser
  };