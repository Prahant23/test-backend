const Users = require("../model/userModel.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const create = async (req, res) => {
  console.log(req.body);

  const { firstName, email, password, lastName } = req.body;

  if (!firstName || !email || !password || !lastName) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new Users({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password, // Note: This is not secure, use a secure way to store passwords
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide email and password" });
  }

  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (password !== user.password) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// const forgotpassword = async (req, res) => {

//   // Destructuring
//   const { email } = req.body;

//   // Validation
//   if (!email) {
//     return res.status(400).json({ msg: "Please enter all fields" });
//   }

//   try {
//     // Check existing user
//     const user = await Users.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: "User does not exist" });
//     }

//     // Create a token
//     const secret = process.env.JWT_SECRET + user.password;
//     const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "15m" });

    

//     // Send the link to the user's email (You need to implement this part)
//     const link = `http://localhost:5000/api/user/forgetpassword/${user._id}/${token}`;
//     console.log(link);

//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: "Something went wrong" });
//   }
// };




module.exports = {
  create,
  login,
  
};
