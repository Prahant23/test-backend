// const bcrypt = require("bcrypt");
const Users = require("../model/userModel.js");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  // Step 1: Check the incoming data
  console.log(req.body);

  // Step 2: Destructure data
  const { firstName, email, password, lastName } = req.body;

  // Step 3: Validate data
  if (!firstName || !email || !password || !lastName)  {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    // Step 4: Check if user already exists
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Step 5: Hash the password
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Step 6: Create a new user
    const newUser = new Users({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    // Step 7: Save the user to the database
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
  // Step 1: Check the incoming data
  console.log(req.body);

  // Step 2: Destructure data
  const { email, password } = req.body;

  // Step 3: Validate data
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    // Step 4: Check if the user exists
    const user = await Users.findOne({ email: email  });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Step 5: Compare the passwords
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
    //   return res.json({
    //     success: false,
    //     message: "Incorrect password",
    //   });
    // }

    // Step 6: Generate a JWT token
    const token = jwt.sign({ userId: user._id,isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      message: "Login successful",
      token: token,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = {
  create,
  login,
};
